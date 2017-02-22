import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { Ng2PaginationModule } from 'ng2-pagination'; //

import { AppComponent } from './app.component';
import { MovieMasterComponent } from './components/movie-master/movie-master.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MediaSearchComponent } from './components/media-search/media-search.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule }     from './app-routing.module';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieMasterComponent,
    MovieDetailComponent,
    MediaSearchComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    WatchlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    Ng2PaginationModule
  ],
  providers: [ AUTH_PROVIDERS ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
