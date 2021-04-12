import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(  ) { 
  }

  goBack() {
    window.history.back();
    console.log( 'goBack()...' );
  }
  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}

