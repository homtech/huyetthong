import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

declare var firebase: any;
declare var userId: any;
declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email bắt buộc.'},
      { type: 'pattern', message: 'Điền đúng Email.'}
    ],
    'password': [
      { type: 'required', message: 'Password bắt buộc.'},
      { type: 'minlength', message: 'Password phải có ít nhất 5 ký tự.'}
    ]
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value).then(res => {
      this.router.navigate(["/timeline"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

  tryLoginFb(){
    this.authService.doLoginFb().then( res => {
      this.router.navigate(["/timeline"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

  tryLoginGg(){
    this.authService.doLoginGg().then( res => {
      this.router.navigate(["/timeline"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

  goRegisterPage(){
    this.router.navigate(["/register"]);
  }

}
