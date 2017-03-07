import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../shared/properties.service';
import {ActivatedRoute, Params} from '@angular/router';
import { Property } from '../../shared/property';


@Component({
  selector: 'app-property-trips',
  templateUrl: './property-trips.component.html',
  styleUrls: ['./property-trips.component.scss']
})
export class PropertyTripsComponent implements OnInit {

  private next: any = [];
  private previous: any = [];
  private wishlist: any = [];
  private pending: any = [];


  constructor(private PropertiesService: PropertiesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.PropertiesService.myTrips()
      .subscribe(data => {
        this.next = data['trips']['next'];
        this.previous = data['trips']['previous'];
        this.wishlist = data['trips']['wishlist'];
        this.pending = data['trips']['pending'];
      }
    );
  }

  removeFromWishlist(property) {
    this.PropertiesService.removeToWishlist(property.id)
      .subscribe(data => {
        var index = this.wishlist.indexOf(property);
        this.wishlist.splice(index, 1);
      }
    );
  }
}
