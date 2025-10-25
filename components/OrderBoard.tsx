import React from 'react';
import { INGREDIENT_DATA } from '../constants';
import type { Order } from '../types';

interface OrderBoardProps {
  orders: Order[];
  activeOrderId: number | null;
  onSelectOrder: (order: Order) => void;
}

const OrderCard: React.FC<{ order: Order; isActive: boolean; onClick: () => void; }> = ({ order, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-yellow-100 p-4 rounded-lg shadow-md border-4 cursor-pointer transition-all duration-200 ${isActive ? 'border-green-500 scale-105' : 'border-amber-700 hover:border-blue-500'}`}
    >
      <h3 className="font-bold text-lg mb-2 text-center border-b-2 border-amber-600 pb-1">Orden #{order.id.toString().slice(-4)}</h3>
      <ul className="space-y-1">
        {order.ingredients.map((ing, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 flex items-center justify-center scale-75">{INGREDIENT_DATA[ing].icon}</div>
            <span>{INGREDIENT_DATA[ing].name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const OrderBoard: React.FC<OrderBoardProps> = ({ orders, activeOrderId, onSelectOrder }) => {
  return (
    <div className="w-full md:w-1/3 bg-amber-600/50 p-4 rounded-xl shadow-inner">
      <h2 className="text-3xl font-bold text-center mb-4 text-white">Órdenes</h2>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {orders.map(order => (
          <OrderCard 
            key={order.id} 
            order={order} 
            isActive={order.id === activeOrderId}
            onClick={() => onSelectOrder(order)}
          />
        ))}
        {orders.length === 0 && <p className="text-center text-white col-span-2 md:col-span-1">No hay órdenes pendientes. ¡Qué rapidez!</p>}
      </div>
    </div>
  );
};

export default OrderBoard;