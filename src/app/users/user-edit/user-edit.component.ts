import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { User } from '../../shared/user';
import { UsersService } from '../../shared/users.service';
import { Router } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  private user: User;

  public editForm: FormGroup;
  public img: any;

  constructor(public fb: FormBuilder, private UsersService: UsersService, private router: Router, private NotificationsService: NotificationsService) {
    this.editForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      description: ["", Validators.required],
      phone: ["", Validators.required],
      gender: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      photo: "",
    });
  }

  ngOnInit() {
    this.UsersService.show()
      .subscribe(data => {
        this.user = new User(data);
        if(this.user.photo != null && this.user.photo != ""){
          this.img = this.user.photo.url;
        }

        this.editForm = this.fb.group({
          name: [this.user.name, Validators.required],
          email: [this.user.email, Validators.required],
          description: [this.user.description, Validators.required],
          phone: [this.user.phone, Validators.required],
          gender: [this.user.gender, Validators.required],
          country: [this.user.address.country, Validators.required],
          state: [this.user.address.state, Validators.required],
          city: [this.user.address.city, Validators.required],
          photo: "",
        });
      }
    );
  }


  readThis(inputValue: any) : void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      this.img = myReader.result;
    };
     myReader.readAsDataURL(file);
  }

  fileChange(event) {
    this.readThis(event.target);
  }

  save(){
    this.UsersService.update(this.editForm.value, this.img)
      .subscribe(res => {
        this.NotificationsService.success(
          'Dados atualizados',
          'Sucesso \\o/',
          {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 30,
              lastOnBottom: true
          }
        );
        this.router.navigate(['/user/show']);
      }, error => {
        this.NotificationsService.error(
          'Falha ao atualizar',
          'Tente novamente',
          {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 30,
              lastOnBottom: true
          }
        );
      }
    );
  }
}
