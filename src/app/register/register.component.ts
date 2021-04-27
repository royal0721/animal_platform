import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import {  takeUntil } from 'rxjs/operators';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TwoMatch } from '../_helpers/two-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  submitted = false;
  errorMessage = '';
  organizationError = '';
  loading = false;
  
  constructor(private registerService :RegisterService,private router: Router,private formBuilder: FormBuilder) { 

  }
  
  
  // 修改 FormGroup 的
  destroy$: Subject<boolean> = new Subject<boolean>();

  goBack() {
    window.history.back();
    console.log( 'goBack()...' );
  }
  get f() { return this.userForm.controls; }
  
  ngOnInit(): void {
    this.userForm =this.formBuilder.group({
      lastName: ['', Validators.nullValidator && Validators.required],
      firstName: ['', Validators.nullValidator && Validators.required],
      email: ['', Validators.nullValidator && Validators.required],
      organization: [''],
      owner: [''],
      phone_number: ['', Validators.nullValidator && Validators.required],
      id: ['', Validators.nullValidator && Validators.required],
      password: ['', Validators.nullValidator && Validators.required && Validators.minLength(6)],
      confirmed_password: ['', Validators.nullValidator && Validators.required && Validators.minLength(6)]
    }, {
      validator: TwoMatch('password', 'confirmed_password')
  });
  }
 
  redirect() {
    this.router.navigate(['']);
}

// validator message修改
  onSubmit(): void {
    this.submitted = true;
    var origin_value = this.userForm.getRawValue();
    console.log(origin_value);

    if (this.userForm.invalid) {
      return;
    }
    // if the password is not matched with each other.
    if(origin_value.confirmed_password!=origin_value.password){
      this.isSignUpFailed=true;
      console.log('not match.');

    }else{
      delete origin_value['confirmed_password'];
      console.log("matched.");
    }

    if(origin_value.organization==''&&origin_value.owner==''){
      origin_value['organization']=='無';
      origin_value['owner']=='無';
      origin_value['role']==1; //normal informer
    }else if(origin_value.organization!=''&&origin_value.owner==''){
      this.isSignUpFailed=true;
    }else{
      origin_value['role']==2;
    }

    this.loading=true;
    this.registerService.addUser(origin_value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message:', data);
      this.userForm.reset();
      this.redirect();
    },
    err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.loading = false;
    });

    console.log('Submit'+this.userForm.getRawValue());
  
  }

  ngOnDestroy() {
    
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

