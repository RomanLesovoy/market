import { Injectable } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public token: string = '';
  public user: any; // @todo

  constructor() {
    Hub.listen("auth", ({ payload: { event, data } }: any) => {
      if (event === "cognitoHostedUI" || event === "signedIn") {
        console.log(data, event);
        this.setUser(data);
      }
      // todo add logout effect
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setUser(user))
      .catch(() => console.log("Not signed in"));
  }

  setUser(data: any) {
    this.user = data; // todo check
    this.isAuthenticated.next(true);
    this.token = `Bearer ${data.signInUserSession.idToken.jwtToken}`;
    this.updateStorage();
  }

  onLogin() {
    Auth.federatedSignIn();
  }

  onLogout() {
    Auth.signOut();
    this.isAuthenticated.next(false);
  }

  updateStorage() {
    if (!this.token) {
      return localStorage.removeItem('token');
    }
    localStorage.setItem('token', this.token);
  }
}
