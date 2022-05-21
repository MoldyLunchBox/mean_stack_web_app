import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import {UserService} from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers : [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage : boolean = false;
  serverErrorMessages : string = '';

  constructor(public userService: UserService) {  }
  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      },
      err => {
        if (err.status === 422){
          this.serverErrorMessages = err.error.join('<br/>')
        }
      }
    );
  }
}
