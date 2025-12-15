import React, { useState, useEffect } from 'react';
import { CVData } from '../types';
import { Terminal, Shield, Cpu, ChevronRight } from 'lucide-react';

interface Props {
  data: CVData;
  aiPitch: string | null;
  onGeneratePitch: () => void;
  isLoadingAi: boolean;
}

const JsonKey = ({ children }: { children?: React.ReactNode }) => <span className="text-blue-400">"{children}"</span>;
const JsonString = ({ children }: { children?: React.ReactNode }) => <span className="text-yellow-300">"{children}"</span>;

const TerminalView: React.FC<Props> = ({ data, aiPitch, onGeneratePitch, isLoadingAi }) => {
  const [commandText, setCommandText] = useState('');
  const fullCommand = `./display_cv.sh --target="${data.personal.name}" --mode=full`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCommandText(fullCommand.slice(0, i + 1));
      i++;
      if (i > fullCommand.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullCommand]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono p-4 md:p-8 terminal-scroll overflow-y-auto">
      <div className="max-w-5xl mx-auto border border-terminal-dim rounded bg-black/50 shadow-2xl backdrop-blur-sm">
        
        {/* Terminal Header */}
        <div className="bg-gray-900 border-b border-terminal-dim p-2 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-500">matous@kali-linux:~</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-6">
          
          {/* Command Entry */}
          <div className="flex items-center gap-2 text-lg">
            <span className="text-green-500 font-bold">➜</span>
            <span className="text-blue-400 font-bold">~</span>
            <span className="text-gray-300">{commandText}</span>
            <span className="animate-pulse bg-gray-300 w-2.5 h-5 inline-block ml-1"></span>
          </div>

          <div className="border-t border-dashed border-terminal-dim my-4 opacity-50"></div>

          {/* ASCII Artish Header */}
          <div className="mb-8 hidden md:block text-xs md:text-sm text-terminal-dim whitespace-pre leading-none">
            {`
  __  __       _              š   _  _  _       _       _     
 |  \\/  | __ _| |_ ___  _   _ ___| || || | ___ | |_ __ | |__  
 | |\\/| |/ _\` | __/ _ \\| | | / __| || || |/ _ \\| | '_ \\| '_ \\ 
 | |  | | (_| | || (_) | |_| \\__ \\__   _| (_) | | | | | | | |
 |_|  |_|\\__,_|\\__\\___/ \\__,_|___/  |_|  \\___/|_|_| |_|_| |_|
            `}
          </div>

          {/* JSON-like structured data display */}
          <div className="space-y-4 text-sm md:text-base">
            <div>
              <span className="text-purple-400">const</span> <span className="text-yellow-200">CANDIDATE</span> = <span className="text-white">{'{'}</span>
            </div>

            <div className="pl-4 md:pl-8 space-y-2 border-l border-terminal-dim ml-2">
              <div><JsonKey>name</JsonKey>: <JsonString>{data.personal.name}</JsonString>,</div>
              <div><JsonKey>role</JsonKey>: <JsonString>{data.personal.title}</JsonString>,</div>
              <div><JsonKey>status</JsonKey>: <span className="text-green-400">"OPEN_TO_WORK"</span>,</div>
              
              {/* Skills Array */}
              <div className="mt-4">
                <JsonKey>skills</JsonKey>: [
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pl-4 mt-2">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="bg-terminal-dim/20 px-2 py-1 rounded text-center border border-terminal-dim hover:bg-terminal-dim/40 transition-colors cursor-default">
                      {skill.name}
                    </div>
                  ))}
                </div>
                ],
              </div>

              {/* AI Analysis Command */}
               <div className="mt-6 border border-terminal-text/30 p-4 rounded bg-terminal-text/5 relative group">
                <div className="absolute -top-3 left-4 bg-terminal-bg px-2 text-xs text-terminal-text border border-terminal-text/30">AI_ANALYSIS_TOOL_V2.0</div>
                <div className="flex flex-col gap-2">
                   {!aiPitch ? (
                    <div className="flex items-center gap-2">
                      <span className="text-terminal-dim">$</span>
                      <button 
                        onClick={onGeneratePitch}
                        disabled={isLoadingAi}
                        className="hover:underline hover:text-white text-left"
                      >
                        {isLoadingAi ? "EXECUTING GEMINI PROTOCOL..." : "./run_gemini_analysis.py --target=self"}
                      </button>
                    </div>
                   ) : (
                    <div className="space-y-2">
                      <div className="text-terminal-dim">$ ./run_gemini_analysis.py --target=self</div>
                      <div className="text-white border-l-2 border-green-500 pl-3 py-1 font-sans">
                        {aiPitch}
                      </div>
                      <div className="text-xs text-terminal-dim mt-2">[PROCESS COMPLETED SUCCESSFULLY]</div>
                    </div>
                   )}
                </div>
              </div>

              {/* Projects Object */}
               <div className="mt-4">
                <JsonKey>projects</JsonKey>: [
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="pl-4 border-l border-terminal-dim ml-2 mb-2">
                     <span className="text-white">{'{'}</span>
                     <div className="pl-4">
                      <div><JsonKey>name</JsonKey>: <JsonString>{proj.name}</JsonString>,</div>
                      <div><JsonKey>link</JsonKey>: <span className="text-blue-500 underline decoration-dotted">{proj.link}</span></div>
                     </div>
                     <span className="text-white">{'}'},</span>
                  </div>
                ))}
                ],
              </div>


              {/* Experience Object */}
              <div className="mt-4">
                <JsonKey>experience</JsonKey>: [
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="pl-4 border-l border-terminal-dim ml-2 mb-4 hover:border-green-400 transition-colors">
                    <span className="text-white">{'{'}</span>
                    <div className="pl-4">
                      <div><JsonKey>company</JsonKey>: <JsonString>{exp.company}</JsonString>,</div>
                      <div><JsonKey>role</JsonKey>: <JsonString>{exp.role}</JsonString>,</div>
                      <div><JsonKey>time</JsonKey>: <JsonString>{exp.duration}</JsonString>,</div>
                    </div>
                    <span className="text-white">{'}'},</span>
                  </div>
                ))}
                ],
              </div>

               {/* Education Object */}
               <div className="mt-4">
                <JsonKey>education</JsonKey>: [
                {data.education.map((edu, idx) => (
                  <div key={idx} className="pl-4 border-l border-terminal-dim ml-2 mb-2">
                    <span className="text-white">{'{'}</span>
                    <div className="pl-4">
                      <JsonKey>inst</JsonKey>: <JsonString>{edu.school}</JsonString>, 
                      <JsonKey>deg</JsonKey>: <JsonString>{edu.degree}</JsonString>
                    </div>
                    <span className="text-white">{'}'},</span>
                  </div>
                ))}
                ],
              </div>

            </div>
            <div><span className="text-white">{'}'}</span>;</div>
          </div>
          
          <div className="mt-8 text-center text-terminal-dim text-xs animate-pulse">
            _ EOF _
          </div>

        </div>
      </div>
    </div>
  );
};

export default TerminalView;