import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.scss'
})
export class QrcodeComponent implements OnInit {
  // REMOVIDO: secondsLeft = signal(20);

  isLoading = true;
  errorMessage: string | null = null;
  eventId: number= 1;
  qrCodeValue: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
     this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.eventId  = Number(id) ;
    });

    // REMOVIDO: Lógica do setInterval
  }

  ngOnInit() {
    this.apiService.getEvent(this.eventId).subscribe({
      next: data => {
        this.qrCodeValue = `${data.id};${data.qr_code_token}`;
        this.isLoading = false;
      },
      error: err => {
        console.error("Erro ao buscar evento", err);
        this.errorMessage = "Não foi possível carregar o QR code do evento.";
        this.isLoading = false;
      }
    });
  }
}
