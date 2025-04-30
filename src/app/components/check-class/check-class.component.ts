import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/browser';

@Component({
  selector: 'app-check-class',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './check-class.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./check-class.component.scss']
})
export class CheckClassComponent {
  isScanning = false;
  formats = [BarcodeFormat.QR_CODE];
  currentDevice: MediaDeviceInfo | undefined;

  constructor() {
    // Detectar dispositivos de câmera
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      if (videoDevices.length > 0) {
        this.currentDevice = videoDevices[0]; // Seleciona o primeiro dispositivo de câmera
      }
    });
  }

  onScanSuccess(qrCodeContent: string): void {
    console.log('QR Code lido:', qrCodeContent);
    this.isScanning = false;
    alert(`QR Code Content: ${qrCodeContent}`);
  }

  startScanning(): void {
    this.isScanning = true;
  }
}
