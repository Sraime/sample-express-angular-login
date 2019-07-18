import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  idInvalidAuth: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService : AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required]],
      password: ['', [
        Validators.required]],
    });
  }

  onSubmit() {
    this.authService.singin(this.form.value.email, this.form.value.password)
      .subscribe((result) => {
        localStorage.setItem('pseudo', result.pseudo.toString());
        localStorage.setItem('token', result.token.toString());
        localStorage.setItem('tokenExpiration', result.expiresIn.valueOf() + Date.now() + "");
        this.router.navigate(['/banque']);
      },() =>{
        this.idInvalidAuth = true;
        this.form.controls['password'].setValue("");
      });
  }

}
