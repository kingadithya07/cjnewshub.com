import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ad-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-serif font-bold mb-8 text-purple-900">Ad Management Console</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Ad List -->
        <div>
          <h2 class="text-lg font-bold mb-4 border-b border-purple-200 pb-2">Active Campaigns</h2>
          <div class="space-y-4">
            @for (ad of state.ads(); track ad.id) {
              <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 items-start">
                <img [src]="ad.image" class="w-24 h-24 object-cover rounded bg-gray-200 flex-shrink-0">
                <div class="flex-grow">
                  <h3 class="font-bold text-gray-800">{{ ad.title }}</h3>
                  <a [href]="ad.link" class="text-xs text-blue-500 hover:underline truncate block max-w-[200px]">{{ ad.link }}</a>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="inline-block w-2 h-2 rounded-full" [class.bg-green-500]="ad.active" [class.bg-red-500]="!ad.active"></span>
                    <span class="text-xs text-gray-500 uppercase font-bold">{{ ad.active ? 'Active' : 'Paused' }}</span>
                  </div>
                </div>
                <button (click)="state.toggleAd(ad.id)" class="px-3 py-1 text-xs font-bold border rounded" [class.bg-red-50]="ad.active" [class.text-red-600]="ad.active" [class.border-red-200]="ad.active" [class.bg-green-50]="!ad.active" [class.text-green-600]="!ad.active" [class.border-green-200]="!ad.active">
                  {{ ad.active ? 'Pause' : 'Activate' }}
                </button>
              </div>
            }
          </div>
        </div>

        <!-- Create Ad Form -->
        <div class="bg-purple-50 p-6 rounded-xl border border-purple-100 h-fit">
          <h2 class="text-lg font-bold mb-4 text-purple-900">Create New Ad Unit</h2>
          <form (submit)="createAd()" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-purple-800 uppercase mb-1">Campaign Title</label>
              <input [(ngModel)]="newAd.title" name="title" type="text" class="w-full px-3 py-2 rounded border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="e.g. Summer Sale">
            </div>
            <div>
              <label class="block text-xs font-bold text-purple-800 uppercase mb-1">Image URL</label>
              <input [(ngModel)]="newAd.image" name="image" type="text" class="w-full px-3 py-2 rounded border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="https://...">
            </div>
            <div>
              <label class="block text-xs font-bold text-purple-800 uppercase mb-1">Target URL</label>
              <input [(ngModel)]="newAd.link" name="link" type="text" class="w-full px-3 py-2 rounded border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="https://mysite.com">
            </div>
            <button type="submit" class="w-full py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors">Launch Campaign</button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AdManagerComponent {
  state = inject(StateService);

  newAd = {
    title: '',
    image: 'https://picsum.photos/300/250?random=' + Math.floor(Math.random() * 1000),
    link: '#'
  };

  createAd() {
    if (!this.newAd.title) return;
    
    this.state.addAd({
      id: Date.now().toString(),
      title: this.newAd.title,
      image: this.newAd.image,
      link: this.newAd.link,
      active: true
    });

    this.newAd = {
      title: '',
      image: 'https://picsum.photos/300/250?random=' + Math.floor(Math.random() * 1000),
      link: '#'
    };
  }
}