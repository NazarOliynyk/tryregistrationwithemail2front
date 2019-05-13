import { Component } from '@angular/core';
import {User} from './User';
import {NgForm} from '@angular/forms';
import {UserServiceService} from './user-service.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User = new User();
  userToLogin: User = new User();
  users: User [] = [];
  responseRegistration = '';
  showRegisterForm = false;
  responseLogination = '';
  showLoginForm = false;
  headersOption: HttpHeaders;
  showUsers = false;
  responseOnDelete = '';

  constructor(private userService: UserServiceService) {
  }

  signIn() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.showUsers = false;
    this.responseOnDelete = '';
    this.responseLogination = '';
    this.responseRegistration = '';
  }

  logIn() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showUsers = false;
    this.responseOnDelete = '';
    this.responseLogination = '';
    this.responseRegistration = '';
  }

  saveUser(registerForm: HTMLFormElement) {
    this.userService.saveUser(this.user)
      .subscribe(u => {
          this.responseRegistration = u.text;
          console.log(u.text); },
        error1 => { console.log(error1);
          this.responseRegistration = 'Registration Failed'; } );

  }

  logInto(loginForm: HTMLFormElement) {
    this.userService.login(this.userToLogin).
    subscribe(
      value => {
        const token = value.headers.get('Authorization');
        const userLogged = value.headers.get('UserLogged');
        const userClass = value.headers.get('UserClass');

        localStorage.setItem('_token', token);
        console.log('token: ' + token);

        this.user = JSON.parse(userLogged);
        this.responseLogination = 'Hello: ' + this.user.username;
      },
      error1 => {
        this.responseLogination = 'Access denied';
      }
    );
  }

  logOut() {
    this.user = new User();
    this.userToLogin = new User();
    localStorage.clear();
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showUsers = false;
    this.responseOnDelete = '';
    this.responseLogination = '';
    this.responseRegistration = '';
  }

  getUsers() {
    this.showUsers = true;
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.responseRegistration = '';
    this.responseLogination = '';
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.userService.getUsers(this.headersOption).
    subscribe( value => {
      this.users = value;
      for (const u of this.users) {
        console.log(u.username);
      }
    });
  }

  deleteUser(u: User) {
    this.userService.deleteUser(u.id, this.headersOption).
    subscribe(value => {this.responseOnDelete = value.text; },
      error1 => this.responseOnDelete = 'Failed to delete');
  }
}
