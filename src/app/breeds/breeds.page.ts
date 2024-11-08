import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Breeds } from '../interfaces/interfaces';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.page.html',
  styleUrls: ['./breeds.page.scss'],
})
export class BreedsPage implements OnInit {
  keyword: string = '';
  breeds: Array<Breeds> = [];
  breedsInitial: Array<Breeds> = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getListBreeds();
    this.getBreedById();
  }

  async getListBreeds() {
    try {
      const response = await firstValueFrom(this.api.getListBreeds()) as Breeds[];
      this.breeds = response;
      this.breedsInitial = response;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getBreedById() {
    try {
      const response: any = await firstValueFrom(this.api.getBreedById());
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  }

  loadInformation() {
    this.breeds = this.breedsInitial;
  }

  onSearch(event: any) {    
    const keyword: string = event.detail.value.toLowerCase();
    if (keyword.trim() === '') {
      this.breeds = this.breedsInitial;
    } else {
      this.breeds = this.breedsInitial.filter((breed) =>
        breed.name.toLowerCase().includes(keyword)
      );
    }
  }

  
}
