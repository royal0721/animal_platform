import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: String[] = [];

  constructor(
    protected router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.reloadPage();
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser();
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    );
  }

  reloadPage(): void {
    this.router.navigate(['/home']);
    //篩選角色
  }
}
