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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.PropertiesService.getProperty(params['id'])
        .subscribe(
          data => {this.property = data;},
          err => {this.router.navigateByUrl('/');}
        );
    });
  }
}
