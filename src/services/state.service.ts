import { Injectable, signal, computed, inject } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

export interface User {
  username: string;
  role: 'admin' | 'publisher' | 'ad_manager' | 'guest';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  date: string;
  category: string;
  isPublished: boolean;
}

export interface Ad {
  id: string;
  title: string;
  image: string;
  link: string;
  active: boolean;
}

export interface HomeConfig {
  showTicker: boolean;
  showFeatured: boolean;
  showLatest: boolean;
  showSidebar: boolean;
  latestTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // --- Auth State ---
  readonly currentUser = signal<User>({ username: 'Guest', role: 'guest' });
  readonly isLoggedIn = computed(() => this.currentUser().role !== 'guest');

  // --- Data State ---
  readonly homeConfig = signal<HomeConfig>({
    showTicker: true,
    showFeatured: true,
    showLatest: true,
    showSidebar: true,
    latestTitle: 'Latest Reports'
  });

  readonly articles = signal<Article[]>([
    {
      id: '1',
      title: 'Global Markets Rally as Tech Sector Booms',
      excerpt: 'Major indices hit record highs today driven by semiconductor breakthroughs.',
      content: 'The global financial markets experienced a significant surge today, primarily driven by unexpected breakthroughs in the semiconductor industry. Analysts predict this trend to continue well into the next quarter, although caution is advised regarding inflation metrics. <br><br> "It is a golden era for tech," says leading economist Jane Doe. The rally was felt across all major exchanges, from New York to Tokyo.',
      author: 'Finance Desk',
      image: 'https://picsum.photos/800/400?random=1',
      date: new Date().toLocaleDateString(),
      category: 'Business',
      isPublished: true
    },
    {
      id: '2',
      title: 'New Sustainable Energy Source Discovered',
      excerpt: 'Scientists claim the new method could power cities for a fraction of current costs.',
      content: 'In a groundbreaking publication, researchers from the Institute of Future Energy have detailed a new method of harvesting ambient thermal energy. This discovery could potentially revolutionize how we power our cities, reducing carbon footprints by over 80%.',
      author: 'Science Weekly',
      image: 'https://picsum.photos/800/400?random=2',
      date: new Date().toLocaleDateString(),
      category: 'Science',
      isPublished: true
    },
    {
      id: '3',
      title: 'Local Cat Wins Mayor Election',
      excerpt: 'In a stunning turn of events, Mr. Whiskers has secured the mayoral seat.',
      content: 'The town of Oakhaven has elected a 7-year-old tabby cat named Mr. Whiskers as their honorary mayor. While his policies on nap times are popular, his stance on dog parks remains controversial.',
      author: 'Local News',
      image: 'https://picsum.photos/800/400?random=3',
      date: new Date().toLocaleDateString(),
      category: 'Lifestyle',
      isPublished: true
    }
  ]);

  readonly ads = signal<Ad[]>([
    {
      id: 'ad1',
      title: 'Super fast VPN',
      image: 'https://picsum.photos/300/250?random=10',
      link: '#',
      active: true
    },
    {
      id: 'ad2',
      title: 'Best Coffee Beans',
      image: 'https://picsum.photos/300/250?random=11',
      link: '#',
      active: true
    }
  ]);

  // --- Actions ---

  login(username: string, role: User['role']) {
    this.currentUser.set({ username, role });
  }

  logout() {
    this.currentUser.set({ username: 'Guest', role: 'guest' });
  }

  updateHomeConfig(changes: Partial<HomeConfig>) {
    this.homeConfig.update(current => ({ ...current, ...changes }));
  }

  addArticle(article: Article) {
    this.articles.update(prev => [article, ...prev]);
  }

  deleteArticle(id: string) {
    this.articles.update(prev => prev.filter(a => a.id !== id));
  }

  toggleAd(id: string) {
    this.ads.update(prev => prev.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));
  }

  addAd(ad: Ad) {
    this.ads.update(prev => [...prev, ad]);
  }

  // --- Gemini Integration ---
  async generateArticleContent(topic: string): Promise<{ title: string; content: string; excerpt: string } | null> {
    const apiKey = process.env['API_KEY'];
    if (!apiKey) {
      console.error('API Key not found');
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a news article about "${topic}". Return a JSON object with "title", "excerpt", and "content" (HTML format allowed for content).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ['title', 'excerpt', 'content']
          }
        }
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text);
      }
      return null;

    } catch (e) {
      console.error('Gemini API Error:', e);
      return null;
    }
  }
}