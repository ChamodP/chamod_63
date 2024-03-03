import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  onLogin(loginForm: NgForm) {
    let username = loginForm.value.usernameInput;
    let password = loginForm.value.passwordInput;
    
    this.auth.login({username,password}).subscribe((data) => {
      console.log(data);
    });
  }
}
