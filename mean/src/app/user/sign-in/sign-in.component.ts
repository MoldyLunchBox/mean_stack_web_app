import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from '../../shared/user.service'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public userService: UserService , public router: Router) { }
  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages : string = "";
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res : any) =>{
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile')
      },
      err=>{
        console.log(err.message);
        console.log(err);

        this.serverErrorMessages = err.message;
      }

    )
  }
}
