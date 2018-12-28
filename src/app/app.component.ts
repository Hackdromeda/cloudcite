import { Component } from '@angular/core';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CloudCite';
}
