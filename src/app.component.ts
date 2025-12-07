import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-white selection:bg-orange-100 selection:text-orange-900">
      <app-navbar></app-navbar>
      
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-[#1a202c] text-gray-300 pt-16 pb-8 border-t-4 border-[#f58220]">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <!-- Brand Column -->
            <div class="space-y-4">
              <div class="flex items-center gap-3 mb-4">
                 <!-- Footer Logo Icon (Simplified Vector) -->
                 <div class="w-10 h-10 flex-shrink-0">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- Compass -->
                        <path d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z" fill="#64748b" />
                        <!-- Globe -->
                        <circle cx="50" cy="50" r="26" fill="#0f4c81" />
                        <!-- Tech Lines -->
                        <path d="M20 52 Q 45 65 75 48" stroke="#f58220" stroke-width="2" fill="none" stroke-linecap="round" />
                        <path d="M18 45 Q 45 58 78 40" stroke="#f58220" stroke-width="2" fill="none" stroke-linecap="round" />
                    </svg>
                 </div>
                 <div class="leading-none">
                    <span class="block text-xl font-black text-white tracking-tight font-serif">CJ<span class="font-sans font-bold">News</span><span class="text-[#f58220] font-sans font-extrabold">HUB</span></span>
                    <span class="block text-[8px] uppercase tracking-widest text-gray-400 mt-1">Connecting the World</span>
                 </div>
              </div>
              <p class="text-gray-400 text-sm leading-relaxed">
                Trusted by millions. We deliver the truth with speed and perspective.
              </p>
              <div class="flex gap-4 mt-4">
                <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors">X</a>
                <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors">in</a>
                <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f58220] hover:text-white transition-colors">f</a>
              </div>
            </div>

            <!-- Links Column -->
            <div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-white mb-6">Sections</h3>
              <ul class="space-y-3 text-sm text-gray-400">
                <li><a href="#" class="hover:text-[#f58220] transition-colors">World News</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">U.S. Politics</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Technology & AI</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Business Markets</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Opinion</a></li>
              </ul>
            </div>

            <!-- Links Column -->
            <div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-white mb-6">Company</h3>
              <ul class="space-y-3 text-sm text-gray-400">
                <li><a href="#" class="hover:text-[#f58220] transition-colors">About Us</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Careers</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Code of Ethics</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Terms of Service</a></li>
                <li><a href="#" class="hover:text-[#f58220] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <!-- Newsletter -->
            <div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-white mb-6">Subscribe</h3>
              <p class="text-sm text-gray-400 mb-4">Daily headlines delivered to you.</p>
              <form class="flex flex-col gap-2">
                <input type="email" placeholder="Email address" class="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#f58220] transition-colors text-white placeholder-gray-500">
                <button class="bg-[#f58220] text-white font-bold text-sm px-4 py-2 rounded hover:bg-orange-600 transition-colors">Subscribe</button>
              </form>
            </div>

          </div>

          <div class="border-t border-gray-800 pt-8 text-center text-xs text-gray-500 font-sans">
            <p>&copy; {{ year }} CJNewsHub Media Group. All rights reserved.</p>
            <p class="mt-2">Powered by Angular & Google Gemini.</p>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  year = new Date().getFullYear();
}