import { Component, OnInit } from '@angular/core';
import { TalksService } from '../../shared/talks.service';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-talks-list',
  templateUrl: './talks-list.component.html',
  styleUrls: ['./talks-list.component.scss']
})
export class TalksListComponent implements OnInit {
  private talks: any = [];
  private quantity: number;
  private page: number;

  constructor(private TalksService: TalksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if(params["page"] != null)
          this.page = params["page"];
        else
          this.page = 1;
        this.TalksService.getTalks(this.page)
          .subscribe(data => {
            this.talks = data;
          }
        );
      });
  }
}
