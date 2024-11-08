import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Breeds, Image } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.page.html',
  styleUrls: ['./breeds.page.scss'],
})
export class BreedsPage implements OnInit {
  keyword: string = '';
  imagesWithBread: Array<Image> = [];
  breeds: Array<Breeds> = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  originalImagesWithBread: Array<Image> = [];
  stateFilter: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getListBreeds();
    this.getImagesWithBread(this.currentPage);
  }

  async getListBreeds() {
    try {
      const response = (await firstValueFrom(
        this.api.getListBreeds()
      )) as Breeds[];
      this.breeds = response;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getImagesWithBread(currentPage: number) {
    try {
      this.isLoading = true;
      const response = (await firstValueFrom(
        this.api.getImagesWithBread(currentPage)
      )) as Image[];
      this.imagesWithBread = [...this.imagesWithBread, ...response];
      this.isLoading = false;
      console.log('imagesWithBread', this.imagesWithBread);

      if (response.length > 0) {
        this.currentPage++;
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  onClear() {
    this.stateFilter = false;
    this.keyword = '';
    this.imagesWithBread = [...this.originalImagesWithBread];
    console.log('imagesWithBread', this.imagesWithBread);
  }

  onSearch() {
    this.stateFilter = true;
    if (this.keyword === '') {
      return;
    }
    if (this.originalImagesWithBread.length === 0) {
      this.originalImagesWithBread = [...this.imagesWithBread];
    }
    this.imagesWithBread = this.originalImagesWithBread.filter((breed) =>
      breed.breeds[0].name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  loadData(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;
    setTimeout(() => {
      this.getImagesWithBread(this.currentPage).then(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete(); // Completa el evento de infinite scroll
        }
      });
    }, 1000);
  }

  goToDetail(id: string) {
    this.router.navigate(['/detail', { id }]);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
