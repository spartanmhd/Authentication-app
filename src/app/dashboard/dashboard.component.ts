import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';
import { Analytics } from '@angular/fire/analytics';
import { AnalyticsService } from '../services/analytics.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, 
  imports: [CommonModule]
})


export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    public firebaseService: FirebaseService,
    private analyticsService:AnalyticsService
  ) {
    console.log('DashboardComponent construit');
  }

  ngOnInit() {
    console.log('DashboardComponent initialisé');
    this.user = this.firebaseService.getUser();
    this.analyticsService.logPageView('dashboard'); 
  }
}
