import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Adicione esta linha

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Inclua CommonModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  onLogin(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginError = false;
      alert('Login realizado com sucesso!');
    } else {
      this.loginError = true;
    }
  }
}
