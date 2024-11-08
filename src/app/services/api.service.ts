import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getListBreeds() {
    return this.http.get(`${environment.apiBaseUrl}/breeds`);
  }

  getImagesWithBread(currentPage: number) {
    return this.http.get(
      `${environment.apiBaseUrl}/images/search?has_breeds=1&page=${currentPage}&limit=10&api_key=${environment.apiKey}`
    );
  }

  getImageBreedById(id: string) {
    return this.http.get(`${environment.apiBaseUrl}/images/${id}`);
  }
}
