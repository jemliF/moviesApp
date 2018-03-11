import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from '../../services/movie.service';
import {ActorService} from '../../services/actor.service';
import {Actor} from '../../interfaces/Actor';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie: FormGroup = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('Movie title...', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('Movie description...', Validators.minLength(10)),
    releaseDate: new FormControl(Date.now()),
    actors: new FormControl([])
  });
  actors: Actor[] = [];
  constructor(private movieService: MovieService, private actorService: ActorService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.movieService.get(params['id'])
        .subscribe(result => {
          console.log(result);
          this.movie.patchValue(result);

          this.actorService.getAll()
          .subscribe(res => {
            this.actors = res.filter(actor => this.movie.get('actors').value.map(acteurr => acteurr._id).indexOf(actor._id) === -1);
          }, failure => {
            console.error(failure);
          });
        }, failure => {
          console.error(failure);
        });
      }
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
      console.log(this.movie.value);
      this.movieService.update({
        ...this.movie.value,
        actors: this.movie.get('actors').value.map(actor => actor._id) || []
      }).subscribe(result => {
        console.log(result);
        alert('Movie updated successfully');
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
