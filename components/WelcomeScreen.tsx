import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-4 border-red-500 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-amber-700">¡Bienvenido a la Cocina!</h2>
      
      <div className="text-left mb-6 bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
        <h3 className="text-xl font-bold mb-2 text-amber-800 text-center">Cómo Jugar</h3>
        <ul className="space-y-2 text-lg">
          <li className="flex items-start gap-3">
            <span className="font-bold text-green-600 text-2xl">1.</span>
            <div>
              <span className="font-semibold">Revisa las Órdenes:</span> Mira el tablero de la izquierda para ver qué quieren los clientes.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-green-600 text-2xl">2.</span>
            <div>
              <span className="font-semibold">Elige una Orden:</span> Haz clic en una orden para empezar a preparar esa hamburguesa. ¡Se resaltará!
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-green-600 text-2xl">3.</span>
            <div>
              <span className="font-semibold">Arma la Hamburguesa:</span> Usa los botones de ingredientes para añadirlos al plato. ¡La receta debe ser exacta!
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-green-600 text-2xl">4.</span>
            <div>
              <span className="font-semibold">¡A Servir!</span> Cuando la hamburguesa esté lista, presiona el botón verde "Servir".
            </div>
          </li>
        </ul>
        <p className="mt-4 text-center font-semibold text-red-600">
          ¡Sé rápido! Sirve tantas órdenes correctas como puedas antes de que se acabe el tiempo.
          <br/>
          ¡Las órdenes incorrectas te costarán puntos!
        </p>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-xl shadow-md hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
      >
        ¡A Cocinar!
      </button>
    </div>
  );
};

export default WelcomeScreen;
