export interface CardWrapper {
  cards: Card[];
}

export interface Card {
  id: number;
  name: string;
  kind: string;
  duration: number;
}
