import { Component, OnInit } from '@angular/core';
import {Actor} from '../../interfaces/Actor';
import { ActorService } from '../../services/actor.service';
@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrls: ['./new-actor.component.css']
})
export class NewActorComponent implements OnInit {
  newActor: Actor = {
    firstName: '',
    lastName: '',
    bio: ''
  };
  constructor(private actorService: ActorService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.actorService.add(this.newActor)
    .subscribe(result => {
      console.log(result);
      window.alert('Actor saved successfully');
      this.newActor = {
        firstName: '',
        lastName: '',
        bio: ''
      };
    }, err => {
      console.error(err);
      window.alert('An error occured while saving actor');
    });
  }

  onReset () {
    this.newActor = {
      firstName: '',
      lastName: '',
      bio: ''
    };
  }

}
