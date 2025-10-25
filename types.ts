export enum Ingredient {
  TopBun = 'Top Bun',
  BottomBun = 'Bottom Bun',
  Patty = 'Patty',
  Lettuce = 'Lettuce',
  Tomato = 'Tomato',
  Cheese = 'Cheese',
}

export interface Order {
  id: number;
  ingredients: Ingredient[];
}

export enum GameState {
  IntroVideo,
  Welcome,
  Playing,
  GameOver,
}