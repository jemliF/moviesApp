import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie;
  @Output() delete: EventEmitter<String> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDelete () {
    if (window.confirm('Are you sure?')) {
      this.delete.emit(this.movie._id);
    }
  }

}
