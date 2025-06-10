// frontend/src/app/components/profile/profile.component.ts

import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  menuAberto = false;
  larguraTela = window.innerWidth;

  // Propriedades para os dados reais
  usuario: any = { nome: 'Carregando...' }; // Inicia com valor padrão
  eventosCriados: any[] = [];
  eventosParticipados: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {
    this.verificarLarguraTela();
  }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.usuario = JSON.parse(userDataString);
      this.carregarEventos();
    } else {
      // Caso não encontre dados do usuário, exibe erro
      this.isLoading = false;
      this.errorMessage = "Não foi possível carregar os dados do usuário. Faça o login novamente.";
    }
  }

  carregarEventos(): void {
    this.isLoading = true;
    this.errorMessage = null;
    const userId = this.usuario.id;

    if (!userId) {
      this.errorMessage = "ID do usuário não encontrado.";
      this.isLoading = false;
      return;
    }

    // Busca os eventos criados
    this.apiService.getCreatedEvents(userId).subscribe({
      next: data => {
        this.eventosCriados = data;
        this.isLoading = false;
      },
      error: err => {
        console.error("Erro ao buscar eventos criados", err);
        this.errorMessage = "Não foi possível carregar seus eventos criados.";
        this.isLoading = false;
      }
    });

    // Busca os eventos participados
    this.apiService.getParticipatedEvents(userId).subscribe({
      next: data => {
        this.eventosParticipados = data;
      },
      error: err => {
        console.error("Erro ao buscar eventos participados", err);
        // Pode adicionar uma mensagem de erro específica se desejar
      }
    });
  }

  // Métodos do menu (sem alteração)
  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    if (this.menuAberto) {
      this.menuAberto = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    this.verificarLarguraTela();
  }

  private verificarLarguraTela(): void {
    this.larguraTela = window.innerWidth;
  }

  pararPropagacao(event: MouseEvent): void {
    event.stopPropagation();
  }
}