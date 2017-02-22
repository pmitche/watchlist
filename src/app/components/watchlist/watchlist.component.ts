import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../interfaces/movie'
import { UserService } from '../../services/user/user.service'

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
	movies: Movie[] = []

  	constructor(private router: Router, private userService: UserService) { }

	ngOnInit() {
	}

  	gotoDetail(movie: Movie) { 
		let link = ['/lists/movies', movie.id];
		this.router.navigate(link);
	}
}
