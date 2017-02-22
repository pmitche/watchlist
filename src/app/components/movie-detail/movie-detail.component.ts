import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Movie } from '../../interfaces/movie'
import { MediaService } from '../../services/media/media.service';

@Component({
  	selector: 'app-movie-detail',
  	templateUrl: 'movie-detail.component.html',
  	styleUrls: [ 'movie-detail.component.css' ],
  	providers: [ MediaService ]
})

export class MovieDetailComponent implements OnInit {
	movie: Movie

	constructor(private mediaService: MediaService, private route: ActivatedRoute, private location: Location) { }

	ngOnInit(): void {
	  this.route.params.forEach((params: Params) => {
	    let id = params['id'];
	    this.mediaService.getMovie(id)
	      .then(movie => this.movie = movie);
	  });
	}

	goBack() {
	  this.location.back();
	}
}

