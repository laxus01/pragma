import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Image } from '../interfaces/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string = '';
  detail: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const paramMap = this.route.snapshot.paramMap;
    this.id = paramMap.get('id') ?? '';
    if (this.id !== '') {
      this.getImageBreedById();
    }
  }

  async getImageBreedById() {
    try {
      const response = (await firstValueFrom(
        this.api.getImageBreedById(this.id)
      )) as Image[];
      this.detail = response;
      console.log('response', this.detail);
    } catch (error) {
      console.log('error', error);
    }
  }

  goBack() {
    this.router.navigate(['/breeds']);
  }
}
