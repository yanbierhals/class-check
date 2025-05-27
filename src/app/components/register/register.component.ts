import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Adicione esta linha

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // Inclua CommonModule aqui
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  loginError = false;

  onLogin(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginError = false;
      alert('Cadastro realizado com sucesso!');
    } else {
      this.loginError = true;
    }
  }
}
