import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events : any = [];
  // console.log(events);
  constructor(private _eventService: EventService) {
    this._eventService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      )
    console.log(this.events)
  }
  ngOnInit() {



  }

  // onSubmit() {
  // }

}
