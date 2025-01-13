import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.auth = getAuth(app);
  }

  // Méthode pour créer un utilisateur
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Méthode pour connecter un utilisateur
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

   // Méthode pour vérifier si l'utilisateur est connecté
  isUserLoggedIn() {
    return this.auth.currentUser !== null;
  }

  // Méthode pour obtenir les informations de l'utilisateur connecté
  getUser() {
    console.log('Current user:', this.auth.currentUser);
    return this.auth.currentUser;
  }
}
