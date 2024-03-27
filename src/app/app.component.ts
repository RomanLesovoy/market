import { Component, ViewEncapsulation } from '@angular/core';
import { CognitoService } from './cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None, // explain: if not set - we can't affect any not inner selectors
})
export class AppComponent {
  title = 'market';

  constructor (public cognito: CognitoService) {
    console.log(this.cognito.isAuthenticated.value)
  }
}
