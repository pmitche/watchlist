import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Movie } from '../../interfaces/movie'
import { MediaService } from '../../services/media/media.service';
import { Auth } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service'

@Component({
  selector: 'app-movie-master',
  templateUrl: './movie-master.component.html',
  styleUrls: ['./movie-master.component.css'],
  providers: [ MediaService, MdSnackBar, Auth, UserService ]
})
export class MovieMasterComponent implements OnInit {

	movies: Movie[] = []
	p: number = 1
	total: number
	loading: boolean
	endpoints = [
		{ num: 0, val: "popular", text: "Popular" },
		{ num: 1, val: "now_playing", text: "Now playing" },
		{ num: 2, val: "top_rated", text: "Top rated" },
		{ num: 3, val: "upcoming", text: "Upcoming" }
	]
	selectedEndpoint = this.endpoints[0]

	constructor(
		private mediaService: MediaService,
		private userService: UserService,
		private auth: Auth, 
		private router: Router, 
		public snackBar: MdSnackBar
	) { }

	ngOnInit() {
		this.getMoviesWithPage(1, this.endpoints[1].val)
		if (this.auth.authenticated()) {
			console.log(this.auth.userProfile)
		}
	}

	getMoviesWithPage(page: number, endpoint) {
		this.loading = true;
		this.mediaService.getMovies(page, endpoint)
			.then(movies => {
				this.p = page
				this.loading = false
				return this.movies = movies
			})
	}

	gotoDetail(movie: Movie) { 
		let link = ['/lists/movies', movie.id];
  		this.router.navigate(link);
	}

	onChange(event) {
		this.selectedEndpoint = this.endpoints[event.index]
		this.getMoviesWithPage(1, this.endpoints[event.index].val)
	}

	showAddedToWatchlist(movie) {
		this.userService.addMovieToWatchlist(movie, this.auth.userProfile)
	  	let snackBarRef = this.snackBar.open('Added ' + movie.title + ' to your watchlist.')
	  	setTimeout(snackBarRef.dismiss.bind(snackBarRef), 2000);
	}

}
