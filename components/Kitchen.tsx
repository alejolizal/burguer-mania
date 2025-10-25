import React from 'react';
import type { Ingredient } from '../types';
import { INGREDIENT_DATA } from '../constants';
import BurgerStack from './BurgerStack';

interface KitchenProps {
    currentBurger: Ingredient[];
    onAddIngredient: (ingredient: Ingredient) => void;
    onClearPlate: () => void;
    onServeBurger: () => void;
    isOrderActive: boolean;
}

const IngredientButton: React.FC<{ingredient: Ingredient, onClick: () => void}> = ({ ingredient, onClick }) => {
    const data = INGREDIENT_DATA[ingredient];
    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-md hover:bg-yellow-100 transition-transform transform hover:scale-105 border-2 border-gray-200">
            <div className="h-10 flex items-center">{data.icon}</div>
            <span className="text-xs font-semibold mt-1">{data.name}</span>
        </button>
    )
}

const Kitchen: React.FC<KitchenProps> = ({ currentBurger, onAddIngredient, onClearPlate, onServeBurger, isOrderActive }) => {
  return (
    <div className="w-full md:w-2/3 bg-gray-200/50 p-4 rounded-xl shadow-inner flex flex-col">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Cocina</h2>
      <div className="flex-grow flex flex-col md:flex-row gap-4">
        {/* Ingredient Controls */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="grid grid-cols-3 gap-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                {(Object.keys(INGREDIENT_DATA) as Ingredient[]).map(ing => (
                    <IngredientButton key={ing} ingredient={ing} onClick={() => onAddIngredient(ing)} />
                ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <button onClick={onServeBurger} disabled={!isOrderActive || currentBurger.length === 0} className="w-full p-4 bg-green-500 text-white font-bold text-xl rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition">
                    Servir
                </button>
                 <button onClick={onClearPlate} disabled={currentBurger.length === 0} className="w-full p-4 bg-red-500 text-white font-bold text-xl rounded-lg shadow-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition">
                    Limpiar
                </button>
            </div>
        </div>

        {/* Plate / Assembly Area */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col justify-between bg-white rounded-lg p-4 min-h-[300px] shadow-sm">
            <div className="flex-grow w-full flex items-center justify-center">
                 {isOrderActive ? (
                    <BurgerStack burger={currentBurger} />
                ) : (
                    <div className="text-center text-gray-500 px-4">
                        <p className="text-lg font-semibold">¡Selecciona una orden para empezar a cocinar!</p>
                    </div>
                )}
            </div>
             {isOrderActive && (
                <div className="h-10 mt-2 text-center text-amber-700 font-semibold flex items-center justify-center">
                    {currentBurger.length === 0 && (
                        <p className="animate-pulse">Haz clic en los ingredientes para armar la hamburguesa.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;