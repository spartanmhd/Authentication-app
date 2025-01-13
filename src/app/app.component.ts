import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <h1>Bienvenue dans l'application d'authentification</h1>
    <router-outlet></router-outlet> <!-- Utilisation du composant Auth -->
  `,
  standalone: true,
  imports: [RouterOutlet] // Assurez-vous d'importer AuthComponent ici
})
export class AppComponent {}
