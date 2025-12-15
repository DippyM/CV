import React, { useState } from 'react';
import StandardView from './components/StandardView';
import TerminalView from './components/TerminalView';
import { CV_DATA } from './constants';
import { generateElevatorPitch } from './services/geminiService';
import { Terminal, FileText, Moon, Sun } from 'lucide-react';

type Mode = 'standard' | 'terminal';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('standard');
  const [aiPitch, setAiPitch] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleGeneratePitch = async () => {
    setIsLoadingAi(true);
    const pitch = await generateElevatorPitch(CV_DATA);
    setAiPitch(pitch);
    setIsLoadingAi(false);
  };

  return (
    <div className="relative min-h-screen">
      
      {/* Floating Toggle Switch */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setMode('standard')}
          className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-105 ${
            mode === 'standard' 
              ? 'bg-white text-black border-2 border-black' 
              : 'bg-gray-800 text-gray-400 border border-transparent'
          }`}
          title="Standardní zobrazení"
        >
          <FileText className="w-5 h-5" />
        </button>
        <button
          onClick={() => setMode('terminal')}
          className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-105 ${
            mode === 'terminal' 
              ? 'bg-black text-green-500 border-2 border-green-500' 
              : 'bg-white text-gray-400 border border-transparent'
          }`}
          title="Terminál zobrazení"
        >
          <Terminal className="w-5 h-5" />
        </button>
      </div>

      {/* View Rendering */}
      {mode === 'standard' ? (
        <StandardView 
          data={CV_DATA} 
          aiPitch={aiPitch} 
          onGeneratePitch={handleGeneratePitch} 
          isLoadingAi={isLoadingAi}
        />
      ) : (
        <TerminalView 
          data={CV_DATA} 
          aiPitch={aiPitch} 
          onGeneratePitch={handleGeneratePitch} 
          isLoadingAi={isLoadingAi}
        />
      )}
    </div>
  );
};

export default App;