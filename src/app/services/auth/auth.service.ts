import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Response, Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TMDB_API_KEY, TMDB_API_URL, API_URL } from '../../../config';
import { Movie } from '../../interfaces/movie';

let options = {
    allowedConnections: ['google', 'facebook']
}
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('4pA71iuKE6lwgKCynuzmYhkDDq0FJflZ', 'paulpm.eu.auth0.com', options);
  userProfile: Object;

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) console.error(err);
        localStorage.setItem('profile', JSON.stringify(profile))
        this.userProfile = profile;
        this.addUser(this.userProfile)
      })
    });
  }

  addUser(userProfile) {
    return this.http
      .post(`${API_URL}/users/`, userProfile, this.options)
      .toPromise()
      .then(r => { console.log(r.json()) })
      .catch(this.handleError)
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.json().error || 'Server error')
  }
}