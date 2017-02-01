import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../shared/properties.service';
import { Property } from '../../shared/property';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  constructor(private PropertiesService: PropertiesService, private route: ActivatedRoute, private router: Router) { }

  private property: Property;
  private photos: any = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.PropertiesService.getProperty(params['id'])
        .subscribe(
          data => {
            this.property = data;
            this.photos = data.property.photos;
          },
          err => {this.router.navigateByUrl('/');}
        );
    });
  }
}
