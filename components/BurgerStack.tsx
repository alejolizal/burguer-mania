import React from 'react';
import { INGREDIENT_DATA } from '../constants';
import type { Ingredient } from '../types';

interface BurgerStackProps {
  burger: Ingredient[];
}

const BurgerStack: React.FC<BurgerStackProps> = ({ burger }) => {
  let accumulatedHeight = 0;

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      {burger.map((ingredient, index) => {
        const data = INGREDIENT_DATA[ingredient];
        const bottom = accumulatedHeight;
        accumulatedHeight += data.height * 0.7; // Overlap ingredients slightly

        return (
          <div
            key={`${ingredient}-${index}`}
            className="absolute flex justify-center transition-all duration-300 ease-out"
            style={{ bottom: `${bottom}px`, zIndex: index }}
          >
            {data.icon}
          </div>
        );
      })}
    </div>
  );
};

export default BurgerStack;