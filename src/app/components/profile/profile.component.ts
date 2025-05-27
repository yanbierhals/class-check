import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Evento {
  id: number;
  titulo: string;
  data: string;
  status: 'Presente' | 'Falta';
  detalhes?: {
    local: string;
    horario: string;
    professor: string;
    observacoes: string;
    arquivos: string[];
  };
  expandido?: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  menuAberto = false;
  larguraTela = window.innerWidth;

  // Dados mocados para o perfil e eventos
  usuario = {
    nome: 'Thiago Schiedeck',
    imagemUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkT58wOkeNrMy71OElhWUNq6AvV4koM8u4A&s'
  };

  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Aula de Angular Avançado',
      data: '25/05/2024',
      status: 'Presente',
      detalhes: {
        local: 'Sala 101',
        horario: '19:00 - 22:00',
        professor: 'Dr. Angular',
        observacoes: 'Trazer notebook e muita vontade de aprender.',
        arquivos: ['material_aula.pdf', 'exercicios.zip']
      },
      expandido: false
    },
    {
      id: 2,
      titulo: 'Workshop Microfrontends',
      data: '10/06/2024',
      status: 'Falta',
      detalhes: {
        local: 'Auditório Principal',
        horario: '09:00 - 17:00',
        professor: 'Maria Frontend',
        observacoes: 'Evento de dia inteiro, com coffee break.',
        arquivos: ['apresentacao.pptx']
      },
      expandido: false
    },
    {
      id: 3,
      titulo: 'Palestra sobre IA',
      data: '15/07/2024',
      status: 'Presente',
      detalhes: {
        local: 'Online',
        horario: '14:00 - 15:30',
        professor: 'IA Expert',
        observacoes: 'Link será enviado por e-mail.',
        arquivos: []
      },
      expandido: false
    }
  ];

  constructor() {
    this.verificarLarguraTela();
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    if (this.menuAberto) {
      this.menuAberto = false;
    }
  }

  toggleDetalhes(evento: Evento): void {
    evento.expandido = !evento.expandido;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    this.verificarLarguraTela();
  }

  private verificarLarguraTela(): void {
    this.larguraTela = window.innerWidth;
    // Se a tela for maior que o breakpoint do celular (ex: 768px),
    // e o menu estiver aberto como sidebar, forçamos ele a fechar.
    // Isso é para o caso de redimensionar a tela com o menu já aberto.
    if (this.larguraTela > 390 && this.menuAberto) {
      // this.menuAberto = false; // Ou manter aberto, dependendo do comportamento desejado
    }
  }

  // Previne que o clique dentro do menu feche o menu
  pararPropagacao(event: MouseEvent): void {
    event.stopPropagation();
  }
}