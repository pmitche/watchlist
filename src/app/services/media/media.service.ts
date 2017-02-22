import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TMDB_API_KEY, TMDB_API_URL } from '../../../config';
import { Movie } from '../../interfaces/movie';


@Injectable()
export class MediaService {

	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }


	getMovies(page: number, endpoint: string): Promise<Movie[]> {
		return this.http
			.get(`${TMDB_API_URL}/movie/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`)
			.toPromise()
			.then(r => r.json().results as Movie[])
			.catch(this.handleError)
	}

	getMovie(id: string): Promise<Movie> {
		return this.http
			.get(`${TMDB_API_URL}/movie/${id}?api_key=${TMDB_API_KEY}`)
			.toPromise()
			.then(r => r.json() as Movie)
			.catch(this.handleError)
	}

	private handleError(error: any) {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.json().error || 'Server error')
	}
}
