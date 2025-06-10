// frontend/src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; // Importe o serviço
import { HttpClientModule } from '@angular/common/http'; // Importe se standalone

@Component({
  selector: 'app-login',
  standalone: true,
  // Adicione HttpClientModule se não estiver usando provideHttpClient
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = ''; // Alterado de username para email
  password = '';
  loginError = false;

  // Injete o serviço no construtor
  constructor(private router: Router, private apiService: ApiService) {}

  onLogin(): void {
    const credentials = { email: this.email, senha: this.password };
    
    this.apiService.login(credentials).subscribe({
      next: (response) => {
        // Sucesso! Salve o token e os dados do usuário
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        this.loginError = false;
        this.router.navigate(['/profile']); // Navega para o perfil
      },
      error: (err) => {
        // Erro no login
        console.error('Erro no login:', err);
        this.loginError = true;
      }
    });
  }
}
