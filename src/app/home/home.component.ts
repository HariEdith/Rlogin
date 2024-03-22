import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users: { name: string, email: string, password: string, age: number, mobileNumber: string }[] = [];

  onRegister(registerData: { name: string, email: string, password: string, age: number, mobileNumber: string }): void {
    this.users.push(registerData);
    console.log('User registered:', registerData);
  }
}
