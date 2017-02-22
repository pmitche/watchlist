import { Injectable } from '@angular/core';
import { Response, Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TMDB_API_KEY, TMDB_API_URL, API_URL } from '../../../config';
import { Movie } from '../../interfaces/movie';


@Injectable()
export class UserService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getUser(id: string) {
		return this.http
			.get(`${API_URL}/users/${id}`)
			.toPromise()
			.then(r => r.json())
			.catch(this.handleError)
	}

	addUser(userProfile) {
		return this.http
			.post(`${API_URL}/users/`, userProfile, this.options)
			.toPromise()
			.then(r => r.json())
			.catch(this.handleError)
	}

	getWatchlistForUser(id: string): Promise<Movie[]> {
		return this.http
			.get(`${API_URL}/users/${id}/watchlist`)
			.toPromise()
			.then(r => r.json() as Movie[])
			.catch(this.handleError)
	}

	addMovieToWatchlist(movie: Movie, userProfile) {
		return this.http
			.post(`${API_URL}/users/${userProfile.user_id}/watchlist/${movie.id}`, movie, this.options)
			.toPromise()
			.then(r => r.json())
			.catch(this.handleError)
	}

	deleteMovieFromWatchlist(movie: Movie, userProfile) {
		return this.http
			.delete(`${API_URL}/users/${userProfile.user_id}/watchlist/${movie.id}`)
			.toPromise()
			.then(r => r.json())
			.catch(this.handleError)
	}

	private handleError(error: any) {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.json().error || 'Server error')
	}
}
