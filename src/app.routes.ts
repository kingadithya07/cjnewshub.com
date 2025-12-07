import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { ArticleComponent } from './pages/article.component';
import { AdminComponent } from './pages/dashboards/admin.component';
import { PublisherComponent } from './pages/dashboards/publisher.component';
import { AdManagerComponent } from './pages/dashboards/ad-manager.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'publisher', component: PublisherComponent },
  { path: 'ad-manager', component: AdManagerComponent },
  { path: '**', redirectTo: '' }
];