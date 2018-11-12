import { Component } from '@stencil/core';
import '../cloudcite-bibliography';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <cloudcite-bibliography></cloudcite-bibliography>
        <ion-button href="/privacy" expand="block">Privacy Policy</ion-button>
        
      </ion-content>
    ];
  }
}
