import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private firebaseService: FirebaseService,
     private router : Router,
     private analyticsService: AnalyticsService
    ) {}

  // Méthode pour l'inscription
  signUp() {
    this.firebaseService.signUp(this.email, this.password)
      .then(() => {
        this.analyticsService.logSignUp();
        console.log('Utilisateur inscrit avec succès!');
        this.successMessage = 'Inscription réussie !';
        this.errorMessage = '';
      })
      .catch((error) => {
        console.log('Erreur Firebase:', error)  
        this.errorMessage = this.handleError(error.code);;
        this.successMessage = '';
      });
  }

  // Méthode pour la connexion
  signIn() {
    this.firebaseService.signIn(this.email, this.password)
      .then(async () => {
        console.log('Début de la tentative de navigation');
        try {
          this.analyticsService.logLogin();
          const result = await this.router.navigate(['/dashboard']);
          console.log('Résultat de la navigation:', result);
          this.successMessage = 'Connexion réussie !';
        } catch (error) {
          console.error('Erreur lors de la navigation:', error);
        }
      })
      .catch((error) => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = this.handleError(error.code);
      });
  }

  private handleError(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé.';
      case 'auth/invalid-email':
        return 'L\'email est invalide.';
      case 'auth/operation-not-allowed':
        return 'L\'opération n\'est pas autorisée.';
      case 'auth/weak-password':
        return 'Le mot de passe est trop faible.';
      case 'auth/user-disabled':
        return 'Cet utilisateur a été désactivé.';
      case 'auth/user-not-found':
        return 'Aucun utilisateur trouvé avec cet email.';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect.';
      default:
        return 'Une erreur est survenue. Veuillez réessayer.';
    }
  }
}


