import { Component, inject, signal } from '@angular/core';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-none shadow-xl border-t-4 border-black">
        <div class="text-center">
          <h2 class="text-4xl font-serif font-black text-gray-900 tracking-tight">CJNewsHub.</h2>
          <p class="mt-2 text-sm text-gray-500 uppercase tracking-widest">Internal Access Only</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input id="username" formControlName="username" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm" placeholder="Username">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" formControlName="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>

          @if (error()) {
            <div class="text-red-600 text-xs font-bold text-center bg-red-50 p-3 border border-red-100">
              {{ error() }}
            </div>
          }

          <div>
            <button type="submit" [disabled]="loginForm.invalid" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-colors">
              Sign in
            </button>
          </div>
        </form>

        <div class="mt-6 text-xs text-gray-500 bg-gray-50 p-4 border border-gray-100">
          <p class="font-bold mb-2 uppercase tracking-wide">Demo Credentials:</p>
          <ul class="space-y-1 font-mono text-gray-600">
            <li>Admin: <span class="bg-gray-200 px-1">admin</span> / <span class="bg-gray-200 px-1">admin</span></li>
            <li>Publisher: <span class="bg-gray-200 px-1">pub</span> / <span class="bg-gray-200 px-1">pub</span></li>
            <li>Ad Manager: <span class="bg-gray-200 px-1">ad</span> / <span class="bg-gray-200 px-1">ad</span></li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  fb = inject(FormBuilder);
  state = inject(StateService);
  router = inject(Router);
  
  error = signal('');

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin') {
      this.state.login('Admin User', 'admin');
      this.router.navigate(['/admin']);
    } else if (username === 'pub' && password === 'pub') {
      this.state.login('Publisher One', 'publisher');
      this.router.navigate(['/publisher']);
    } else if (username === 'ad' && password === 'ad') {
      this.state.login('Ad Manager', 'ad_manager');
      this.router.navigate(['/ad-manager']);
    } else {
      this.error.set('Invalid credentials. Check the demo box.');
    }
  }
}