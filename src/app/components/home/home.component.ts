import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../interfaces/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getAll()
      .subscribe(result => {
        console.log(result);
        this.movies = result;
      }, failure => {
        console.error(failure);
      });
  }

  supprimer (e) {
    console.log(e);
    this.movieService.delete(e)
    .subscribe(res => {
      this.movies = this.movies.filter(movie => movie._id !== e);
      alert('Movie deleted successfully');
    }, err => {
      console.error(err);
    });
  }

}
