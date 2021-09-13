import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private routerModule: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (localStorage.getItem('loginState') === 'true')
    {
      this.routerModule.navigate(['/info']);
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.get('userName')?.value === 'Admin' && this.validateForm.get('password')?.value === 'pa$$word')
    {
      localStorage.setItem('loginState', 'true');
      this.validateForm.clearValidators();
      this.routerModule.navigate(['/info']);
    }
    else
    {
      alert('Ошибка авторизации');
    }
  }
}
