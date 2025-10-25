
import React from 'react';
import type { Order, Ingredient } from '../types';
import StatusBar from './StatusBar';
import OrderBoard from './OrderBoard';
import Kitchen from './Kitchen';

interface GameUIProps {
  score: number;
  timeLeft: number;
  orders: Order[];
  activeOrder: Order | null;
  currentBurger: Ingredient[];
  onSelectOrder: (order: Order) => void;
  onAddIngredient: (ingredient: Ingredient) => void;
  onClearPlate: () => void;
  onServeBurger: () => void;
}

const GameUI: React.FC<GameUIProps> = (props) => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <StatusBar score={props.score} timeLeft={props.timeLeft} />
      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        <OrderBoard 
            orders={props.orders} 
            activeOrderId={props.activeOrder?.id ?? null}
            onSelectOrder={props.onSelectOrder}
        />
        <Kitchen 
            currentBurger={props.currentBurger}
            onAddIngredient={props.onAddIngredient}
            onClearPlate={props.onClearPlate}
            onServeBurger={props.onServeBurger}
            isOrderActive={!!props.activeOrder}
        />
      </div>
    </div>
  );
};

export default GameUI;
