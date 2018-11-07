import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _router: Router,
    private _h: HelperService) { }

  ngOnInit() {
    this._h.cleanToken();
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this._h.login(this.username.value, this.password.value).subscribe(
        data => {
          localStorage.setItem(HelperService.TOKEN_KEY, 'Bearer ' + data.token);
          this._router.navigate(['sheep']);
        },
        error => this.loginForm.setErrors({ 'wrongIdentity': true })
      );
    }
  }
}
