import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private apiUrl = 'https://flask-mistral.vercel.app/generate';

  constructor(private http: HttpClient) { }
  generateText(prompt: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl, { prompt }, { headers });
  }
}
