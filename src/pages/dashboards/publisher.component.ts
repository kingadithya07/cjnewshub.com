import { Component, inject, signal } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-serif font-bold">Publisher Studio</h1>
        <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">AI Enabled</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Editor Column -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- AI Generator Panel -->
          <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 class="flex items-center gap-2 font-bold text-indigo-900 mb-4">
              <span class="text-xl">✨</span> Generate with Gemini AI
            </h3>
            <div class="flex gap-2">
              <input 
                #topicInput 
                type="text" 
                placeholder="Enter a topic (e.g., 'Mars Colonization', 'New Coffee Trends')..." 
                class="flex-grow px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                (keyup.enter)="generate(topicInput.value)"
              >
              <button 
                (click)="generate(topicInput.value)" 
                [disabled]="isGenerating()"
                class="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                @if (isGenerating()) {
                   <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   <span>Thinking...</span>
                } @else {
                  <span>Generate</span>
                }
              </button>
            </div>
            <p class="text-xs text-indigo-400 mt-2 ml-1">Powered by gemini-2.5-flash</p>
          </div>

          <!-- Manual Article Form -->
          <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 class="text-xl font-bold mb-6 text-gray-800 border-b pb-2">New Article Draft</h2>
            
            <form [formGroup]="articleForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                <input formControlName="title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select formControlName="category" class="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none">
                  <option value="General">General</option>
                  <option value="Business">Business</option>
                  <option value="Tech">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Excerpt (Summary)</label>
                <textarea formControlName="excerpt" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Content (HTML Supported)</label>
                <textarea formControlName="content" rows="10" class="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none font-mono text-sm"></textarea>
              </div>
              
              <div class="bg-gray-50 p-4 rounded border border-gray-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Feature Image (URL)</label>
                  <div class="flex gap-2">
                    <input formControlName="image" type="text" class="flex-grow px-4 py-2 border border-gray-300 rounded text-sm text-gray-600">
                    <button type="button" class="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-700 font-medium" (click)="dummyCrop()">✂️ Crop</button>
                  </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <button type="button" class="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" [disabled]="articleForm.invalid" class="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 shadow-md transition-all">Publish Now</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sidebar Helper -->
        <div class="space-y-6">
           <!-- Preview Card -->
           <div class="bg-white p-4 rounded-lg shadow border border-gray-100 sticky top-20">
             <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</h4>
             <div class="border rounded-lg overflow-hidden">
                <img [src]="articleForm.get('image')?.value" class="w-full h-40 object-cover bg-gray-200">
                <div class="p-4">
                  <span class="text-blue-600 text-xs font-bold uppercase mb-1 block">{{ articleForm.get('category')?.value }}</span>
                  <h3 class="font-serif font-bold text-lg leading-tight mb-2">{{ articleForm.get('title')?.value || 'Article Title' }}</h3>
                  <p class="text-xs text-gray-500 line-clamp-3">{{ articleForm.get('excerpt')?.value || 'Article summary will appear here...' }}</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  `
})
export class PublisherComponent {
  fb = inject(FormBuilder);
  state = inject(StateService);
  isGenerating = signal(false);

  articleForm = this.fb.group({
    title: ['', Validators.required],
    excerpt: ['', Validators.required],
    content: ['', Validators.required],
    category: ['General', Validators.required],
    image: ['https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100), Validators.required]
  });

  async generate(topic: string) {
    if (!topic.trim()) return;
    this.isGenerating.set(true);
    
    const result = await this.state.generateArticleContent(topic);
    
    if (result) {
      this.articleForm.patchValue({
        title: result.title,
        excerpt: result.excerpt,
        content: result.content
      });
    } else {
      alert('Failed to generate content. Check console or API key.');
    }
    this.isGenerating.set(false);
  }

  dummyCrop() {
    alert('Cropping Tool Simulation: Image cropped to 16:9 aspect ratio.');
  }

  onSubmit() {
    if (this.articleForm.invalid) return;
    
    const formVal = this.articleForm.value;
    
    this.state.addArticle({
      id: Date.now().toString(),
      title: formVal.title!,
      excerpt: formVal.excerpt!,
      content: formVal.content!,
      category: formVal.category!,
      image: formVal.image!,
      author: this.state.currentUser().username,
      date: new Date().toLocaleDateString(),
      isPublished: true
    });

    alert('Article Published Successfully!');
    this.articleForm.reset({
      category: 'General',
      image: 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100)
    });
  }
}