import { Component, OnInit } from '@angular/core';
import { Card, CardWrapper } from '@models/card.model';
import { ApiService } from '@services/api.service';


@Component({
  templateUrl: './card-index.component.html',
})
export class CardIndexComponent implements OnInit {
  cards: Card[];

  constructor(
    private apiService: ApiService,
  ) { }

  async ngOnInit() {
    const data = await this.apiService.get<CardWrapper>('cards.json');
    this.cards = data.cards;
  }
}
