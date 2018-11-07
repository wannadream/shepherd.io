import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../user.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userForm: FormGroup;

  constructor(private _userSvc: UserService,
    private _helper: HelperService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    });
  }

  get currentPassword() { return this.userForm.get('currentPassword'); }
  get newPassword() { return this.userForm.get('newPassword'); }

  onSubmit() {
    if (this.userForm.valid) {
      const currentUser = this._helper.currentUser;
      currentUser.currentPassword = this.currentPassword.value;
      currentUser.newPassword = this.newPassword.value;
      this._userSvc.updateUser(currentUser).subscribe(data => {
        this.currentPassword.setValue('');
        this.newPassword.setValue('');
        this._snackBar.open('User information saved.', null, { duration: 1300 });
      }, err => this.userForm.setErrors({ 'wrongPassword': true }));
    }
  }
}

