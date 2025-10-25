import React from 'react';

interface StatusBarProps {
  score: number;
  timeLeft: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ score, timeLeft }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full bg-red-600 text-white p-4 rounded-xl shadow-lg flex justify-between items-center text-2xl font-bold border-4 border-white">
      <div>Puntos: {score}</div>
      <div>Tiempo: {formatTime(timeLeft)}</div>
    </div>
  );
};

export default StatusBar;