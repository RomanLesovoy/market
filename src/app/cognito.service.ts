import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Auth, Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  public isAuthenticated: boolean = false;
  public token: string = '';
  public user: any; // @todo

  constructor(private apollo: Apollo) {
    Hub.listen("auth", ({ payload: { event, data } }: any) => {
      if (event === "cognitoHostedUI" || event === "signedIn") {
        console.log(data, event);
        this.setUser(data);
      }
      // todo add logout effect
    });

    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('user', user)
        this.setUser(user);
      })
      .catch(() => console.log("Not signed in"));
  }

  setUser(data: any) {
    this.user = data; // todo check
    this.isAuthenticated = true;
    this.token = `Bearer ${data.signInUserSession.idToken.jwtToken}`;
    this.updateStorage();
  }

  onLogin() {
    Auth.federatedSignIn();
  }

  onLogout() {
    Auth.signOut();
  }

  updateStorage() {
    if (!this.token) {
      return localStorage.removeItem('token');
    }
    localStorage.setItem('token', this.token);
  }
}
