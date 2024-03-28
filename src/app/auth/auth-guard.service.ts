import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor() { }

  async canActivate(): Promise<boolean> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false
    }
  }
}
