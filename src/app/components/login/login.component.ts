import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  onLogin(): void {
    // Exemplo de validação simples
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginError = false;
      alert('Login realizado com sucesso!');
      // Redirecionar ou executar outra ação aqui
    } else {
      this.loginError = true;
    }
  }
}
