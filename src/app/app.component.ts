import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  counter = signal(1);               // Valor do QR code
  secondsLeft = signal(20);          // Contador regressivo de segundos

  constructor() {
    setInterval(() => {
      this.counter.update((val) => val + 1);   // Atualiza QR
      this.secondsLeft.set(20);                // Reseta contador
    }, 20000);

    setInterval(() => {
      this.secondsLeft.update((val) => val > 0 ? val - 1 : 0); // Decrementa a cada segundo
    }, 1000);
  }
}
