import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../services/state.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, DatePipe],
  template: `
    <header class="flex flex-col font-sans">
      
      <!-- Top Utility Bar -->
      <div class="bg-slate-900 text-gray-300 text-xs py-2 px-4 border-b border-gray-800">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center gap-4">
            <span class="font-bold text-white">{{ currentDate | date:'fullDate' }}</span>
            <span class="hidden sm:inline opacity-50">|</span>
            <span class="hidden sm:inline">San Francisco 68°F</span>
          </div>
          
          <div class="flex items-center gap-4">
            @if (state.isLoggedIn()) {
              <span class="text-white">Welcome, <span class="font-bold text-white">{{ state.currentUser().username }}</span></span>
              
              <!-- Dashboard Quick Links -->
               @if (state.currentUser().role === 'admin') {
                <a routerLink="/admin" class="hover:text-white underline decoration-blue-500 underline-offset-4">Admin</a>
              }
              @if (state.currentUser().role === 'publisher' || state.currentUser().role === 'admin') {
                <a routerLink="/publisher" class="hover:text-white underline decoration-green-500 underline-offset-4">Publisher</a>
              }
              @if (state.currentUser().role === 'ad_manager' || state.currentUser().role === 'admin') {
                <a routerLink="/ad-manager" class="hover:text-white underline decoration-purple-500 underline-offset-4">Ads</a>
              }

              <button (click)="state.logout()" class="text-white font-bold hover:text-red-400 uppercase tracking-wider ml-2">Logout</button>
            } @else {
              <a routerLink="/login" class="font-bold text-white hover:text-gray-200 uppercase tracking-widest">Sign In</a>
              <span class="text-gray-600">|</span>
              <button class="font-bold text-white bg-[#0f4c81] px-3 py-1 rounded hover:bg-blue-600 transition-colors">Subscribe</button>
            }
          </div>
        </div>
      </div>

      <!-- Main Brand Header -->
      <div class="bg-white py-3 border-b border-gray-100 shadow-sm relative z-20">
        <div class="container mx-auto px-4 relative flex justify-center md:justify-start items-center">
          
          <!-- Mobile Menu Button -->
          <button class="absolute left-4 md:hidden text-2xl text-[#0f4c81]">☰</button>

          <!-- Logo Container -->
          <a routerLink="/" class="flex items-center gap-2 group hover:opacity-95 transition-opacity py-1">
            <!-- Precise Vector Recreation of the Provided Logo Image -->
            <div class="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 relative">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                 <!-- Drop Shadow Filter -->
                 <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                   <feDropShadow dx="1" dy="1" stdDeviation="1" flood-opacity="0.3"/>
                 </filter>

                 <!-- Compass Outer Ring -->
                 <circle cx="50" cy="50" r="46" stroke="#64748b" stroke-width="1.5" fill="none" opacity="0.8" />
                 <circle cx="50" cy="50" r="42" stroke="#94a3b8" stroke-width="0.5" fill="none" opacity="0.5" />
                 
                 <!-- Compass Star Points (Silver Gradient) -->
                 <path d="M50 2 L58 42 L98 50 L58 58 L50 98 L42 58 L2 50 L42 42 Z" fill="url(#silverGrad)" stroke="#475569" stroke-width="0.5" filter="url(#shadow)"/>
                 
                 <!-- Inner Globe (Blue Gradient) -->
                 <circle cx="50" cy="50" r="26" fill="url(#globeGrad)" />
                 
                 <!-- Continents (Subtle) -->
                 <path d="M35 45 Q 45 40 55 50 T 70 45" stroke="none" fill="white" fill-opacity="0.15"/>
                 <path d="M40 60 Q 50 65 60 55" stroke="none" fill="white" fill-opacity="0.15"/>
                 
                 <!-- Tech Lines (Cyan Swooshes with Dots) -->
                 <!-- Line 1 -->
                 <path d="M20 52 Q 45 65 75 48" stroke="#22d3ee" stroke-width="1.2" fill="none" stroke-linecap="round" />
                 <circle cx="20" cy="52" r="1.5" fill="#22d3ee" />
                 <circle cx="75" cy="48" r="1.5" fill="#22d3ee" />
                 
                 <!-- Line 2 -->
                 <path d="M18 45 Q 45 58 78 40" stroke="#22d3ee" stroke-width="1.2" fill="none" stroke-linecap="round" />
                 <circle cx="18" cy="45" r="1.5" fill="#22d3ee" />
                 <circle cx="78" cy="40" r="1.5" fill="#22d3ee" />
                 
                 <!-- Line 3 -->
                 <path d="M22 60 Q 45 72 70 58" stroke="#22d3ee" stroke-width="1.2" fill="none" stroke-linecap="round" />
                 <circle cx="22" cy="60" r="1.5" fill="#22d3ee" />

                 <!-- Gradients -->
                 <defs>
                   <linearGradient id="globeGrad" x1="20" y1="20" x2="80" y2="80">
                     <stop offset="0%" stop-color="#3b82f6" /> <!-- Lighter Blue top -->
                     <stop offset="100%" stop-color="#0f172a" /> <!-- Dark Blue bottom -->
                   </linearGradient>
                   <linearGradient id="silverGrad" x1="0" y1="0" x2="100" y2="100">
                     <stop offset="0%" stop-color="#f8fafc" />
                     <stop offset="50%" stop-color="#cbd5e1" />
                     <stop offset="100%" stop-color="#64748b" />
                   </linearGradient>
                 </defs>
               </svg>
            </div>

            <!-- Text Content -->
            <div class="flex flex-col justify-center h-full pt-1">
               <div class="flex items-baseline leading-none select-none">
                  <!-- "CJ": Serif, Dark Blue, Slight Overlap -->
                  <div class="relative flex items-baseline mr-1">
                    <span class="text-4xl md:text-6xl font-black text-[#0f4c81] tracking-tighter" style="font-family: 'Merriweather', serif;">C</span>
                    <span class="text-4xl md:text-6xl font-black text-[#0f4c81] tracking-tighter -ml-1" style="font-family: 'Merriweather', serif;">J</span>
                  </div>
                  
                  <!-- "News": Sans, Dark Blue -->
                  <span class="text-4xl md:text-6xl font-bold text-[#0f4c81] tracking-tight" style="font-family: 'Inter', sans-serif;">News</span>
                  
                  <!-- "HUB": Sans, Gradient Orange -->
                  <span class="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f58220] to-[#ea580c] tracking-tight" style="font-family: 'Inter', sans-serif;">HUB</span>
               </div>
               
               <!-- Tagline: Right Aligned under NewsHUB -->
               <div class="w-full flex justify-end pr-1 mt-0.5">
                 <span class="text-[9px] md:text-[11px] font-bold tracking-[0.15em] text-[#0f4c81] uppercase">Connecting the World</span>
               </div>
            </div>
          </a>

          <!-- Search Widget -->
          <div class="absolute right-4 hidden md:flex items-center">
            <div class="relative">
              <input type="text" placeholder="Search news..." class="pl-3 pr-8 py-1 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#0f4c81] w-48 transition-all shadow-inner bg-gray-50">
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Nav Links -->
      <nav class="bg-[#0f4c81] text-white sticky top-0 z-40 shadow-lg border-t border-blue-900">
        <div class="container mx-auto px-4">
          <ul class="flex justify-center md:justify-start overflow-x-auto no-scrollbar py-3 space-x-6 font-sans text-xs font-bold uppercase tracking-wider">
            <li><a routerLink="/" class="hover:text-[#f58220] transition-colors whitespace-nowrap">Home</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">World</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">U.S. Politics</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">Business</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">Tech</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">Science</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">Health</a></li>
            <li><a href="#" class="hover:text-[#f58220] transition-colors whitespace-nowrap">Opinion</a></li>
          </ul>
        </div>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  state = inject(StateService);
  currentDate = new Date();
}