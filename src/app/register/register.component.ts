import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() register: EventEmitter<{ name: string, email: string, password: string, age: number, mobileNumber: string }> = new EventEmitter<{ name: string, email: string, password: string, age: number, mobileNumber: string }>();

  registerForm: FormGroup;
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  ageError: string = '';
  mobileNumberError: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')]],
      age: ['', [Validators.required, Validators.min(18)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password, age, mobileNumber } = this.registerForm.value;
      this.register.emit({ name, email, password, age, mobileNumber });
      console.log('Registration success');
      console.log('Name:', name, 'Email:', email, 'Password:', password, 'Age:', age, 'Mobile Number:', mobileNumber);
      this.registerForm.reset();
    } else {
      this.nameError = this.registerForm.controls['name'].errors ? 'Name is required and must contain only letters.' : '';
      this.emailError = this.registerForm.controls['email'].errors ? 'Enter a valid email address.' : '';
      this.passwordError = this.registerForm.controls['password'].errors ? 'Password is required and must have minimum 8 characters with at least one special character.' : '';
      this.ageError = this.registerForm.controls['age'].errors ? 'Age is required and must be at least 18.' : '';
      this.mobileNumberError = this.registerForm.controls['mobileNumber'].errors ? 'Mobile number is required and must contain exactly 10 digits.' : '';
    }
  }
}
