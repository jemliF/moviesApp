import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NewMovieComponent} from './components/new-movie/new-movie.component';
import {HttpClientModule} from '@angular/common/http';
import {MovieService} from './services/movie.service';
import {MovieCardComponent} from './components/movie-card/movie-card.component';
import {EditMovieComponent} from './components/edit-movie/edit-movie.component';
import {ActorService} from './services/actor.service';
import { NewActorComponent } from './components/new-actor/new-actor.component';

const routes = [{
  path: '', component: HomeComponent
}, {
  path: 'new-movie', component: NewMovieComponent
}, {
  path: 'edit-movie/:id', component: EditMovieComponent
}, {
  path: 'new-actor', component: NewActorComponent
}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NewMovieComponent,
    MovieCardComponent,
    EditMovieComponent,
    NewActorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MovieService, ActorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
