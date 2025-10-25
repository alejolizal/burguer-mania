import React, { useState, useEffect, useCallback } from 'react';
import { GameState, type Order, Ingredient } from './types';
import { GAME_DURATION, MAX_ORDERS, RECIPES } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import GameOverScreen from './components/GameOverScreen';
import GameUI from './components/GameUI';
import IntroVideo from './components/IntroVideo';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IntroVideo);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [currentBurger, setCurrentBurger] = useState<Ingredient[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  const generateNewOrder = useCallback(() => {
    if (orders.length >= MAX_ORDERS) return;

    const newRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
    const newOrder: Order = {
      id: Date.now() + Math.random(),
      ingredients: newRecipe,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  }, [orders.length]);
  
  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveOrder(null);
    setCurrentBurger([]);
    setGameState(GameState.Playing);

    const initialOrders: Order[] = [];
    for (let i = 0; i < MAX_ORDERS; i++) {
        const newRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
        initialOrders.push({
          id: Date.now() + Math.random() + i,
          ingredients: newRecipe,
        });
    }
    setOrders(initialOrders);
  }, []);

  useEffect(() => {
    if (gameState !== GameState.Playing) return;

    if (timeLeft <= 0) {
      setGameState(GameState.GameOver);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleSelectOrder = (order: Order) => {
    if (activeOrder?.id === order.id) {
        setActiveOrder(null);
    } else {
        setActiveOrder(order);
    }
    setCurrentBurger([]);
  };

  const addIngredient = (ingredient: Ingredient) => {
    if (!activeOrder) {
        // Maybe add a little shake animation to the order board
        return;
    }
    setCurrentBurger(prev => [...prev, ingredient]);
  };

  const clearPlate = () => {
    setCurrentBurger([]);
  };

  const serveBurger = () => {
    if (!activeOrder || currentBurger.length === 0) return;

    const isCorrect = 
      activeOrder.ingredients.length === currentBurger.length &&
      [...activeOrder.ingredients].sort().join(',') === [...currentBurger].sort().join(',');

    if (isCorrect) {
      setScore(prev => prev + 100);
      setOrders(prev => prev.filter(o => o.id !== activeOrder.id));
      generateNewOrder();
    } else {
      setScore(prev => Math.max(0, prev - 25)); // Penalty for wrong order
    }

    setActiveOrder(null);
    setCurrentBurger([]);
  };
  
  const handleIntroFinished = () => {
    setGameState(GameState.Welcome);
  };


  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4 bg-amber-100 text-gray-800">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-red-600 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          Burger Chef Mania
        </h1>
        
        {gameState === GameState.IntroVideo && <IntroVideo onIntroFinished={handleIntroFinished} />}
        {gameState === GameState.Welcome && <WelcomeScreen onStart={startGame} />}
        {gameState === GameState.GameOver && <GameOverScreen score={score} onRestart={startGame} />}
        {gameState === GameState.Playing && (
          <GameUI
            score={score}
            timeLeft={timeLeft}
            orders={orders}
            activeOrder={activeOrder}
            currentBurger={currentBurger}
            onSelectOrder={handleSelectOrder}
            onAddIngredient={addIngredient}
            onClearPlate={clearPlate}
            onServeBurger={serveBurger}
          />
        )}
      </div>
    </div>
  );
};

export default App;