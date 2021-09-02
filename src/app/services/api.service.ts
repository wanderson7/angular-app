import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DirectUpload } from '@rails/activestorage';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  async get<T = any>(url: string, params = {}): Promise<T> {
    return this.parseRequest<T>(this.httpClient.get<T>(`${environment.apiUrl}/${url}`, this.getOptions(params)));
  }

  async post<T = any>(url: string, params = {}): Promise<T> {
    return this.parseRequest<T>(this.httpClient.post<T>(`${environment.apiUrl}/${url}`, params, this.getOptions()));
  }

  async put<T = any>(url: string, params = {}): Promise<T> {
    return this.parseRequest<T>(this.httpClient.put<T>(`${environment.apiUrl}/${url}`, params, this.getOptions()));
  }

  async patch<T = any>(url: string, params = {}): Promise<T> {
    return this.parseRequest<T>(this.httpClient.patch<T>(`${environment.apiUrl}/${url}`, params, this.getOptions()));
  }

  async delete<T = any>(url: string, params = {}): Promise<T> {
    return this.parseRequest<T>(this.httpClient.delete<T>(`${environment.apiUrl}/${url}`, this.getOptions({}, params)));
  }

  upload(control: AbstractControl, file: Blob) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => control['url'] = event.target.result;

    const directUpload = new DirectUpload(file, `${environment.apiUrl}/rails/active_storage/direct_uploads`);

    control.markAsPending();

    directUpload.create((error, response) => {
      if (!error) {
        control.setValue(response.signed_id);
        control.setErrors(null);
      }
    });
  }

  private parseRequest<T>(request: any): T {
    return request
      .toPromise()
      .then((success: T) => success)
      .catch(this.errorResponse);
  }

  private getOptions(params = {}, body = {}) {
    const headers: any = { 'Content-Type': 'application/json', OS: 'web' };

    if (this.authService.token) {
      headers.Authorization = `Bearer ${this.authService.token}`;
    }

    return {
      headers,
      params,
      body,
    };
  }

  private errorResponse(response) {
    switch (response.status) {
      case 401: {
        this.authService.clear();
        this.router.navigate(['/entrar']);
        break;
      }
      case 404: {
        this.router.navigate(['/404']);
        break;
      }
      case 422: {
        throw response.error;
      }
      default: {
        this.router.navigate(['/500']);
        break;
      }
    }

    throw {};
  }
}
