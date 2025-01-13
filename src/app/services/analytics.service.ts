import { Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analytics: Analytics = inject(Analytics);

  logLogin() {
    logEvent(this.analytics, 'login', {
      method: 'email'
    });
  }

  logSignUp() {
    logEvent(this.analytics, 'sign_up', {
      method: 'email'
    });
  }

  logPageView(pageName: string) {
    logEvent(this.analytics, 'page_view', {
      page_name: pageName
    });
  }
}