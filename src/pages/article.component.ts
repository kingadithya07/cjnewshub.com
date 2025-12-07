import { Component, inject, computed } from '@angular/core';
import { StateService } from '../services/state.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="bg-white pb-20">
      @if (article(); as post) {
        
        <!-- Article Header -->
        <header class="container mx-auto px-4 pt-12 pb-8 max-w-4xl text-center">
          <div class="mb-6 flex justify-center">
            <a routerLink="/" class="text-xs font-bold uppercase tracking-widest text-red-600 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition-colors">{{ post.category }}</a>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-serif font-black text-gray-900 mb-6 leading-tight tracking-tight">{{ post.title }}</h1>
          
          <p class="text-xl md:text-2xl text-gray-500 font-serif italic mb-8 max-w-2xl mx-auto leading-relaxed">{{ post.excerpt }}</p>

          <div class="flex items-center justify-center gap-4 border-y border-gray-100 py-4">
             <div class="flex items-center gap-3">
               <img [src]="'https://ui-avatars.com/api/?name=' + post.author + '&background=000000&color=ffffff'" class="w-10 h-10 rounded-full" alt="Author">
               <div class="text-left">
                 <p class="text-sm font-bold text-gray-900 uppercase tracking-wide">By {{ post.author }}</p>
                 <p class="text-xs text-gray-500">Published on {{ post.date }}</p>
               </div>
             </div>
          </div>
        </header>

        <!-- Main Image -->
        <div class="container mx-auto px-4 mb-12 max-w-5xl">
          <figure class="relative aspect-video bg-gray-100 overflow-hidden shadow-sm">
             <img [ngSrc]="post.image" fill priority class="object-cover" [alt]="post.title">
          </figure>
          <figcaption class="text-center text-xs text-gray-400 mt-2 italic">Image generated via Gemini / Placeholder</figcaption>
        </div>

        <!-- Content -->
        <article class="container mx-auto px-4 max-w-2xl">
          <div class="prose prose-lg prose-slate prose-headings:font-serif prose-headings:font-bold prose-p:font-serif prose-p:leading-8 text-gray-800 first-letter:text-5xl first-letter:font-black first-letter:text-gray-900 first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]">
             <div [innerHTML]="post.content"></div>
          </div>

          <!-- Tags / Actions -->
          <div class="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
             <div class="flex gap-2">
               <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">#news</span>
               <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">#{{ post.category.toLowerCase() }}</span>
             </div>
             <div class="flex gap-4">
               <button class="text-gray-400 hover:text-blue-600 transition-colors">
                  <span class="sr-only">Share on Twitter</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
               </button>
             </div>
          </div>
        </article>

      } @else {
        <div class="text-center py-32">
          <h2 class="text-4xl font-serif font-bold text-gray-200 mb-4">404</h2>
          <p class="text-gray-500 mb-8">This article has been moved or deleted.</p>
          <a routerLink="/" class="text-white bg-black px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">Back to Home</a>
        </div>
      }
    </div>
  `
})
export class ArticleComponent {
  private route = inject(ActivatedRoute);
  private state = inject(StateService);

  // Get ID from route params reactively
  private routeId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

  // Compute the current article based on ID
  article = computed(() => {
    const id = this.routeId();
    return this.state.articles().find(a => a.id === id);
  });
}