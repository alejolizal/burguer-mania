import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-4 border-red-500">
      <h2 className="text-4xl font-bold mb-2 text-red-600">¡Se acabó el tiempo!</h2>
      <p className="text-2xl mb-4">Tu turno ha terminado.</p>
      <p className="text-5xl font-bold mb-6 text-amber-700">Puntuación Final: {score}</p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-blue-500 text-white font-bold text-2xl rounded-xl shadow-md hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default GameOverScreen;