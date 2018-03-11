import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from '../../services/movie.service';
import {ActorService} from '../../services/actor.service';
import {Actor} from '../../interfaces/Actor';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  movie: FormGroup = new FormGroup({
    title: new FormControl('Movie title...',
     [Validators.required, Validators.minLength(4)]),
    description: new FormControl('Movie description...', 
    Validators.minLength(10)),
    releaseDate: new FormControl(Date.now()),
    actors: new FormControl([])
  });
  actors: Actor[] = [];
  constructor(private movieService: MovieService,
     private actorService: ActorService) {
  }

  ngOnInit() {
    this.actorService.getAll()
      .subscribe(result => {
        this.actors = result;
      }, failure => {
        console.error(failure);
      });
  }

  addActor(index) {
    let actors = this.movie.get('actors').value;
    actors.push(this.actors[index]);
    this.movie.patchValue({actors});
    this.actors.splice(index, 1);
  }

  removeActor(index) {
    this.actors.push(this.movie.get('actors').value[index]);
    let actors = this.movie.get('actors').value;
    actors.splice(index, 1);
    this.movie.patchValue({actors});
  }

  onSubmit() {
    if (this.movie.status === 'VALID') {
      this.movieService.add({
        ...this.movie.value,
        actors: this.movie.get('actors').value.map(actor => actor._id) || []
      }).subscribe(result => {
        console.log(result);
        alert('Movie saved successfully');
      }, err => {
        console.error(err);
      });
    } else {
      alert('Invalid data, please check validation errors');
    }
  }

  get title() {
    return this.movie.get('title');
  }

  onReset () {
    this.movie.reset();
  }

}
