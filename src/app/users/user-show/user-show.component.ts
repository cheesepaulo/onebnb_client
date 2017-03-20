import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/users.service';
import { User } from '../../shared/user';


@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {

  private user: User;

  constructor(private UsersService: UsersService) { }

  ngOnInit() {
    this.UsersService.show()
      .subscribe(data => {
        this.user = new User(data);
        console.log(this.user);
      }
    );
  }

}
