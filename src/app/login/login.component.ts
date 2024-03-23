import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() users: { name: string, email: string, password: string }[] = [];
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      const user = this.users.find(u => u.email === email && u.password === password);
      if (user) {
        console.log('Login success');
        
      } else {
        this.loginError = 'Invalid email or password';
        console.log('Login failed');
      }
    } else {
      this.loginError = this.getLoginErrorMessage();
      console.log('Login failed');
    }
  }

  getLoginErrorMessage(): string {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'Email is required';
    } else if (this.loginForm.controls['email'].hasError('email')) {
      return 'Invalid email format';
    } else if (this.loginForm.controls['password'].hasError('required')) {
      return 'Password is required';
    }
    return '';
  }
}
