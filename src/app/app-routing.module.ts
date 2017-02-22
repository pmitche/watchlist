import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieMasterComponent }  	 from './components/movie-master/movie-master.component';
import { MovieDetailComponent }  	 from './components/movie-detail/movie-detail.component';
import { HomeComponent } 			 from './components/home/home.component';
import { NotFoundComponent }  		 from './components/not-found/not-found.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
  	{ path: 'home',  component: HomeComponent },
  	{ path: 'lists',
   		children: [
   			{ path: '', redirectTo: 'movies', pathMatch: 'full' },
  			{ path: 'movies', component: MovieMasterComponent },
  			{ path: 'movies/:id', component: MovieDetailComponent }
		  ]
	  },
    { path: '*',    component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

