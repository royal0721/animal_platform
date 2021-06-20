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
  isNotComplete = false; 
  phoneNotComplete = false; 

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
      last_name: ['', Validators.nullValidator && Validators.required],
      first_name: ['', Validators.nullValidator && Validators.required],
      email: ['', Validators.nullValidator && Validators.required],
      organization: [''],
      owner: [''],
      phone_number: ['', Validators.nullValidator && Validators.required],
      id: ['', Validators.nullValidator && Validators.required],
      password: ['', Validators.nullValidator && Validators.required ],
      confirmed_password: ['', Validators.nullValidator && Validators.required ]
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

    origin_value['organization'] = origin_value.organization.replace(/\s*/g,"");
    if(origin_value.organization!=''){
      console.log("YES");
      origin_value['role']=3;
      this.isNotComplete = false;
    }else if(origin_value.organization==''){
      origin_value['role']=1;
      console.log("YES");
      this.isNotComplete = false;
    }

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
    console.log(origin_value.organization);
    console.log(origin_value.owner);
    if(origin_value.phone_number.length!=10){
      this.phoneNotComplete=true;
    }
    // if(origin_value.organization===undefined&&origin_value.owner===undefined){
    //   origin_value['organization']=='無';
    //   origin_value['owner']=='無';
    //   origin_value['role']==1; //normal informer
    // }else if(origin_value.organization!==undefined&&origin_value.owner!==undefined){
    //   this.isSignUpFailed=true;
    // }else if(origin_value.organization&&origin_value.owner){
    //   origin_value['role']==2;
    // }


    // if(origin_value.organization!=''&&origin_value.owner!=''){
    //   console.log("YES");
    //   origin_value['role']=3;
    // }else if(origin_value.organization==''&&origin_value.owner==''){
    //   origin_value['role']=1;
    //   console.log("YES");
    // }else if(origin_value.organization==''&&origin_value.owner!=''){
    //   console.log("no");
    //   this.isSignUpFailed = true;
    //   this.loading = false;
    //   this.errorMessage = '動保團體資料請填寫完整';
    //   this.isNotComplete = true;
    //   throw this.errorMessage;
    // }else if(origin_value.organization!=''&&origin_value.owner==''){
    //   this.isSignUpFailed = true;
    //   this.loading = false;      
    //   this.errorMessage = '動保團體資料請填寫完整';
    //   this.isNotComplete = true;
    //   throw this.errorMessage;
    // }

    console.log(origin_value['role']);
    this.loading=true;
    this.registerService.addUser(origin_value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message:', data);
      window.alert("您已註冊成功! 歡迎為浪浪盡一份心力")
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

