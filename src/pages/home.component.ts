import { Component, inject, computed, signal } from '@angular/core';
import { StateService, HomeConfig } from '../services/state.service';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgOptimizedImage],
  template: `
    <div class="container mx-auto px-4 py-12 relative">
      
      <!-- Admin Customization Toolbar -->
      @if (state.currentUser().role === 'admin') {
        <div class="mb-6 flex justify-end">
           <button (click)="toggleCustomize()" class="bg-black text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg z-50 relative">
             {{ isCustomizing() ? 'Done Customizing' : 'Customize Layout' }}
           </button>
        </div>
        
        @if (isCustomizing()) {
          <div class="bg-white p-6 rounded-lg border border-gray-200 mb-8 shadow-xl animate-in fade-in slide-in-from-top-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-40">
            <div class="space-y-3">
               <h4 class="font-bold text-xs uppercase tracking-widest text-gray-500">Visibility</h4>
               <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                 <input type="checkbox" [checked]="state.homeConfig().showTicker" (change)="toggleConfig('showTicker')" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                 <span class="text-sm font-medium text-gray-900">Breaking News Ticker</span>
               </label>
               <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                 <input type="checkbox" [checked]="state.homeConfig().showFeatured" (change)="toggleConfig('showFeatured')" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                 <span class="text-sm font-medium text-gray-900">Featured Article</span>
               </label>
               <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                 <input type="checkbox" [checked]="state.homeConfig().showLatest" (change)="toggleConfig('showLatest')" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                 <span class="text-sm font-medium text-gray-900">Latest Stories</span>
               </label>
               <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                 <input type="checkbox" [checked]="state.homeConfig().showSidebar" (change)="toggleConfig('showSidebar')" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                 <span class="text-sm font-medium text-gray-900">Sidebar / Ads</span>
               </label>
            </div>
            
            <div class="col-span-1 md:col-span-2 space-y-3">
               <h4 class="font-bold text-xs uppercase tracking-widest text-gray-500">Content Labels</h4>
               <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Latest Section Title</label>
                  <input [value]="state.homeConfig().latestTitle" (input)="updateTitle($any($event.target).value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
               </div>
            </div>
          </div>
        }
      }

      <!-- Breaking News Ticker Simulation -->
      @if (state.homeConfig().showTicker) {
        <div class="mb-10 flex items-center gap-4 bg-red-50 p-3 rounded border border-red-100">
          <span class="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded animate-pulse">Breaking</span>
          <span class="text-sm font-medium text-red-900 truncate">Markets rally as inflation data comes in lower than expected...</span>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Main Content Area -->
        <div [class.lg:col-span-9]="state.homeConfig().showSidebar" [class.lg:col-span-12]="!state.homeConfig().showSidebar" class="transition-all duration-300 ease-in-out">
          
          <!-- Hero Section: Featured Article -->
          @if (state.homeConfig().showFeatured && featuredArticle()) {
            <section class="mb-16 border-b border-gray-200 pb-12">
              <article class="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-8 items-center" [routerLink]="['/article', featuredArticle()!.id]">
                <div class="order-2 md:order-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-red-700 font-bold text-xs uppercase tracking-widest">{{ featuredArticle()!.category }}</span>
                    <span class="text-gray-300 text-xs">|</span>
                    <span class="text-gray-500 text-xs uppercase">{{ featuredArticle()!.date }}</span>
                  </div>
                  <h2 class="text-3xl md:text-5xl font-serif font-black text-gray-900 mb-4 leading-tight group-hover:text-gray-700 transition-colors">
                    {{ featuredArticle()!.title }}
                  </h2>
                  <p class="text-gray-600 text-lg md:text-xl font-serif leading-relaxed mb-4 line-clamp-3">
                    {{ featuredArticle()!.excerpt }}
                  </p>
                  <div class="text-xs font-bold text-black uppercase tracking-widest flex items-center gap-2">
                    Read Full Story <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
                <div class="order-1 md:order-2 overflow-hidden rounded-lg shadow-sm">
                   <div class="relative aspect-[4/3] bg-gray-100">
                     <img [ngSrc]="featuredArticle()!.image" fill priority alt="Featured Image" class="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out">
                   </div>
                </div>
              </article>
            </section>
          }

          <!-- Latest Stories Grid -->
          @if (state.homeConfig().showLatest) {
            <div class="mb-8 flex items-center justify-between border-b-2 border-black pb-2">
              <h3 class="text-xl font-bold font-sans uppercase tracking-widest text-gray-900">{{ state.homeConfig().latestTitle }}</h3>
              <a href="#" class="text-xs font-bold text-gray-500 hover:text-black uppercase">View All</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2" [class.lg:grid-cols-3]="state.homeConfig().showSidebar" [class.lg:grid-cols-4]="!state.homeConfig().showSidebar" class="gap-x-8 gap-y-12">
              @for (article of latestArticles(); track article.id) {
                <article class="flex flex-col h-full group cursor-pointer" [routerLink]="['/article', article.id]">
                  <div class="aspect-[16/10] bg-gray-200 mb-4 overflow-hidden relative border border-gray-100">
                     <img [ngSrc]="article.image" fill class="object-cover group-hover:scale-105 transition-transform duration-500" [alt]="article.title">
                  </div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200 px-1 rounded">{{ article.category }}</span>
                    <span class="text-gray-400 text-[10px]">{{ article.date }}</span>
                  </div>
                  <h4 class="text-lg font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:underline decoration-2 underline-offset-4 decoration-gray-400">{{ article.title }}</h4>
                  <p class="text-gray-600 text-sm font-serif leading-relaxed line-clamp-3 flex-grow">{{ article.excerpt }}</p>
                  <div class="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                     <div class="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                       <img [src]="'https://ui-avatars.com/api/?name=' + article.author + '&background=random'" alt="Author">
                     </div>
                     <span class="text-xs font-bold text-gray-700">{{ article.author }}</span>
                  </div>
                </article>
              }
            </div>
          }
        </div>

        <!-- Sidebar / Ads -->
        @if (state.homeConfig().showSidebar) {
          <aside class="lg:col-span-3 space-y-12 border-l border-gray-200 lg:pl-8">
            
            <!-- Editor's Pick / Trending (Mock) -->
            <div>
              <h4 class="font-sans font-bold text-xs uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 text-red-700">Trending Now</h4>
              <ul class="space-y-6">
                <li class="group cursor-pointer">
                  <span class="text-4xl text-gray-200 font-black float-left mr-3 -mt-2 group-hover:text-red-100 transition-colors">1</span>
                  <h5 class="text-sm font-bold font-serif leading-tight group-hover:text-red-700">Why silicon valley is moving to Texas in droves.</h5>
                </li>
                <li class="group cursor-pointer">
                  <span class="text-4xl text-gray-200 font-black float-left mr-3 -mt-2 group-hover:text-red-100 transition-colors">2</span>
                  <h5 class="text-sm font-bold font-serif leading-tight group-hover:text-red-700">The 10 best coffee shops in Europe right now.</h5>
                </li>
                <li class="group cursor-pointer">
                  <span class="text-4xl text-gray-200 font-black float-left mr-3 -mt-2 group-hover:text-red-100 transition-colors">3</span>
                  <h5 class="text-sm font-bold font-serif leading-tight group-hover:text-red-700">Crypto regulation: What to expect in 2025.</h5>
                </li>
              </ul>
            </div>

            <!-- Ad Unit -->
            <div class="bg-gray-50 p-6 border border-gray-100 text-center sticky top-24">
              <span class="text-[9px] text-gray-400 uppercase tracking-widest block mb-4 border-b border-gray-200 pb-1 w-fit mx-auto">Advertisement</span>
              @for (ad of activeAds(); track ad.id) {
                <a [href]="ad.link" class="block mb-8 hover:opacity-90 transition-opacity group">
                  <div class="aspect-square bg-gray-200 mb-3 overflow-hidden">
                     <img [src]="ad.image" [alt]="ad.title" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500">
                  </div>
                  <p class="text-sm font-bold font-serif text-gray-900 group-hover:text-blue-600">{{ ad.title }} &rarr;</p>
                </a>
              }
              @if (activeAds().length === 0) {
                <div class="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-white text-gray-400 text-xs">
                  <span>Advertise Here</span>
                  <span class="text-[10px] mt-1 text-gray-300">300x250</span>
                </div>
              }
            </div>
          </aside>
        }

      </div>
    </div>
  `
})
export class HomeComponent {
  state = inject(StateService);
  isCustomizing = signal(false);

  featuredArticle = computed(() => this.state.articles().length > 0 ? this.state.articles()[0] : null);
  latestArticles = computed(() => this.state.articles().slice(1));
  activeAds = computed(() => this.state.ads().filter(a => a.active));

  toggleCustomize() {
    this.isCustomizing.update(v => !v);
  }

  toggleConfig(key: keyof HomeConfig) {
    const current = this.state.homeConfig();
    if (typeof current[key] === 'boolean') {
      this.state.updateHomeConfig({ [key]: !current[key] });
    }
  }

  updateTitle(title: string) {
    this.state.updateHomeConfig({ latestTitle: title });
  }
}