// frontend/src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    nome: '',
    email: '',
    senha: ''
  };
  registerError = false;

  constructor(private apiService: ApiService, private router: Router) {}

  onRegister(): void {
    this.registerError = false;
    this.apiService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registro bem-sucedido!', response);
        // Opcional: mostrar uma mensagem de sucesso
        alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
        // Redireciona para a página de login após o sucesso
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no registro:', err);
        this.registerError = true;
      }
    });
  }
}
