import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'https://class-check-api.onrender.com/api';

  constructor(private http: HttpClient) { }

  // --- Métodos de Autenticação ---
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  registerPresence(eventoId: string, qrToken: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` };
    return this.http.post(`${this.apiUrl}/eventos/${eventoId}/presenca/checkin/qr`, { qrToken }, { headers });
  }

  getCreatedEvents(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/usuarios/${userId}/eventos-criados`, { headers });
  }

  getParticipatedEvents(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/usuarios/${userId}/eventos-participados`, { headers });
  }

}