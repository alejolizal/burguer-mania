import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

interface IntroVideoProps {
  onIntroFinished: () => void;
}

const LOADING_MESSAGES = [
    "Calentando la parrilla...",
    "Afilando los cuchillos de la IA...",
    "Enseñando al chef a no quemar las cosas...",
    "Renderizando pixeles sabrosos...",
    "Coreografiando el caos en la cocina...",
];

const IntroVideo: React.FC<IntroVideoProps> = ({ onIntroFinished }) => {
    const [hasApiKey, setHasApiKey] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

    const checkApiKey = useCallback(async () => {
        const keyStatus = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(keyStatus);
    }, []);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = LOADING_MESSAGES.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                    return LOADING_MESSAGES[nextIndex];
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isGenerating]);
    
    const handleSelectKey = async () => {
        await (window as any).aistudio.openSelectKey();
        await checkApiKey();
    };

    const handleGenerateVideo = async () => {
        setIsGenerating(true);
        setError(null);
        setVideoUrl(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let operation = await ai.models.generateVideos({
              model: 'veo-3.1-fast-generate-preview',
              prompt: 'A funny, clumsy cartoon chef is in a kitchen making burgers. The chef keeps dropping ingredients and making a mess. The scene is lighthearted and comedic. Short 5-second video.',
              config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
              }
            });

            while (!operation.done) {
              await new Promise(resolve => setTimeout(resolve, 5000));
              operation = await ai.operations.getVideosOperation({operation: operation});
            }

            if (operation.response?.generatedVideos?.length) {
                const downloadLink = operation.response.generatedVideos[0].video?.uri;
                if(downloadLink) {
                    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setVideoUrl(url);
                } else {
                     throw new Error("El video se generó pero no se encontró un enlace de descarga.");
                }
            } else {
                throw new Error("La IA no pudo generar el video esta vez. Inténtalo de nuevo.");
            }

        } catch (e: any) {
            console.error(e);
            if (e.message.includes("Requested entity was not found")) {
                setError("La clave de API no es válida. Por favor, selecciona una clave diferente.");
                setHasApiKey(false);
            } else {
                setError(`Ocurrió un error al generar el video: ${e.message}`);
            }
        } finally {
            setIsGenerating(false);
        }
    };
    
    const renderContent = () => {
        if (isGenerating) {
            return (
                 <div className="text-center">
                    <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-red-500 mx-auto mb-4"></div>
                    <p className="text-2xl font-bold text-amber-800">{loadingMessage}</p>
                    <p className="text-sm text-gray-600 mt-2">(La generación de video puede tardar unos minutos)</p>
                </div>
            )
        }
        
        if (error) {
             return (
                <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
                    <p className="font-bold">¡Oh no!</p>
                    <p>{error}</p>
                    {!hasApiKey && <button onClick={handleSelectKey} className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600">Seleccionar Clave de API</button>}
                </div>
            )
        }

        if (videoUrl) {
            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-amber-700">¡Aquí tienes tu intro!</h3>
                    <video src={videoUrl} controls autoPlay muted loop className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-4"></video>
                     <button
                        onClick={onIntroFinished}
                        className="px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-xl shadow-md hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
                      >
                        Empezar a Jugar
                      </button>
                </div>
            )
        }
        
        if (!hasApiKey) {
            return (
                 <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-amber-700">Se necesita una clave de API</h3>
                    <p className="mb-4">Para generar el video de introducción, por favor selecciona tu clave de API de Google AI Studio.</p>
                    <p className="text-sm mb-4 text-gray-600">La generación de videos en Veo puede incurrir en costos. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Revisa los precios aquí</a>.</p>
                    <button onClick={handleSelectKey} className="px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-lg shadow-md hover:bg-blue-600">
                        Seleccionar Clave de API
                    </button>
                </div>
            )
        }

        return (
             <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-amber-700">¡Creemos una Intro!</h2>
                <p className="text-lg mb-6">¿Quieres generar un video corto y divertido de nuestro chef para empezar?</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleGenerateVideo}
                        className="px-8 py-4 bg-red-500 text-white font-bold text-2xl rounded-xl shadow-md hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
                    >
                        ¡Generar Video!
                    </button>
                    <button
                        onClick={onIntroFinished}
                        className="px-6 py-3 bg-gray-400 text-white font-bold text-lg rounded-xl shadow-md hover:bg-gray-500 transition-all duration-200"
                    >
                        Omitir
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-4 border-red-500 max-w-3xl mx-auto min-h-[400px] flex items-center justify-center">
            {renderContent()}
        </div>
    );
};

export default IntroVideo;
