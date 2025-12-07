import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 class="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Articles</h3>
          <p class="text-4xl font-bold mt-2 text-blue-600">{{ state.articles().length }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 class="text-gray-500 text-sm font-bold uppercase tracking-wider">Active Ads</h3>
          <p class="text-4xl font-bold mt-2 text-purple-600">{{ state.ads().length }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 class="text-gray-500 text-sm font-bold uppercase tracking-wider">System Status</h3>
          <p class="text-4xl font-bold mt-2 text-green-500">OK</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 class="font-bold text-gray-700">Manage Content</h2>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-600 text-xs uppercase">
              <th class="px-6 py-3 font-semibold">Title</th>
              <th class="px-6 py-3 font-semibold">Author</th>
              <th class="px-6 py-3 font-semibold">Date</th>
              <th class="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (article of state.articles(); track article.id) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-medium text-gray-900">{{ article.title }}</td>
                <td class="px-6 py-4 text-gray-500">{{ article.author }}</td>
                <td class="px-6 py-4 text-gray-500 text-sm">{{ article.date }}</td>
                <td class="px-6 py-4 text-right">
                  <button (click)="state.deleteArticle(article.id)" class="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AdminComponent {
  state = inject(StateService);
}