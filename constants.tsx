
import React from 'react';
import type { ReactElement } from 'react';
import { Ingredient } from './types';

export const GAME_DURATION = 90; // in seconds
export const MAX_ORDERS = 4;

type IngredientData = {
  [key in Ingredient]: {
    name: string;
    icon: ReactElement;
    height: number;
  };
};

export const INGREDIENT_DATA: IngredientData = {
  [Ingredient.TopBun]: {
    name: 'Top Bun',
    icon: <div className="w-24 h-8 bg-orange-300 rounded-t-full border-2 border-orange-400 flex items-center justify-center gap-1">{[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 bg-yellow-100 rounded-full"></div>)}</div>,
    height: 32,
  },
  [Ingredient.Lettuce]: {
    name: 'Lettuce',
    icon: <div className="w-28 h-4 bg-green-500 rounded-lg border-2 border-green-600"></div>,
    height: 16,
  },
  [Ingredient.Tomato]: {
    name: 'Tomato',
    icon: <div className="w-24 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>,
    height: 16,
  },
  [Ingredient.Cheese]: {
    name: 'Cheese',
    icon: <div className="w-24 h-2 bg-yellow-400 border-2 border-yellow-500"></div>,
    height: 8,
  },
  [Ingredient.Patty]: {
    name: 'Patty',
    icon: <div className="w-24 h-6 bg-amber-800 rounded-md border-2 border-amber-900"></div>,
    height: 24,
  },
  [Ingredient.BottomBun]: {
    name: 'Bottom Bun',
    icon: <div className="w-24 h-6 bg-orange-300 rounded-b-xl border-2 border-orange-400"></div>,
    height: 24,
  },
};

export const RECIPES: Ingredient[][] = [
  [Ingredient.BottomBun, Ingredient.Patty, Ingredient.TopBun],
  [Ingredient.BottomBun, Ingredient.Patty, Ingredient.Cheese, Ingredient.TopBun],
  [Ingredient.BottomBun, Ingredient.Patty, Ingredient.Lettuce, Ingredient.Tomato, Ingredient.TopBun],
  [Ingredient.BottomBun, Ingredient.Patty, Ingredient.Cheese, Ingredient.Lettuce, Ingredient.Tomato, Ingredient.TopBun],
  [Ingredient.BottomBun, Ingredient.Patty, Ingredient.Patty, Ingredient.Cheese, Ingredient.TopBun],
];
