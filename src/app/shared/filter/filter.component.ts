import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public begindate: Date = new Date();
  public enddate: Date = new Date();
  public minPrice: number = 0;
  public maxPrice: number = 1000;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  filter(type, value){
	this.route.queryParams.subscribe(params => {
  	let parameters = new URLSearchParams();
  	for(var f in params) {
    	if(f != type)
      	parameters.set(f, params[f])
  	};
  	this.router.navigateByUrl('results?' + type + "=" + value + "&" + parameters.toString());
	});
  }
}
