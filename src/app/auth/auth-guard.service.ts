import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { CognitoService } from '../cognito.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public cognito: CognitoService, public router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false
    }
  }
}
