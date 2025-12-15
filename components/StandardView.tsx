import React from 'react';
import { CVData } from '../types';
import { MapPin, Mail, Linkedin, Award, Code, Briefcase, GraduationCap, Folder, Github } from 'lucide-react';

interface Props {
  data: CVData;
  aiPitch: string | null;
  onGeneratePitch: () => void;
  isLoadingAi: boolean;
}

const StandardView: React.FC<Props> = ({ data, aiPitch, onGeneratePitch, isLoadingAi }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen p-8 md:p-12 shadow-sm font-sans text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-100 pb-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">{data.personal.name}</h1>
        <p className="text-xl text-gray-500 font-light mb-6">{data.personal.title}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{data.personal.location}</span>
          </div>
          <a href={`mailto:${data.personal.email}`} className="flex items-center gap-1 hover:text-black transition-colors">
            <Mail className="w-4 h-4" />
            <span>{data.personal.email}</span>
          </a>
          <a href={`https://${data.personal.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </header>

      {/* AI Section (Playful Function) */}
      <div className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">AI Recruiter Insight</h3>
          {!aiPitch && (
             <button 
             onClick={onGeneratePitch}
             disabled={isLoadingAi}
             className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
           >
             {isLoadingAi ? "Generování..." : "Zeptat se AI: Proč mě najmout?"}
           </button>
          )}
        </div>
        {aiPitch && (
          <p className="text-gray-700 italic border-l-2 border-black pl-4 py-1 animate-fade-in">
            "{aiPitch}"
          </p>
        )}
        {!aiPitch && !isLoadingAi && (
          <p className="text-gray-400 text-sm italic">Klikněte pro vygenerování shrnutí pomocí Google Gemini.</p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-black rounded-full block"></span> Souhrn
            </h2>
            <p className="leading-relaxed text-gray-600 text-lg">
              {data.summary}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Folder className="w-5 h-5" /> Vybrané Projekty
            </h2>
            <div className="grid gap-6">
              {data.projects.map((project, idx) => (
                <div key={idx} className="group p-4 rounded-lg border border-gray-100 hover:border-gray-300 transition-all hover:shadow-sm bg-gray-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                      <p className="text-gray-600 mt-1 text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <a 
                      href={`https://${project.link}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-gray-400 hover:text-black transition-colors p-1"
                      title="Zobrazit na GitHubu"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Pracovní zkušenosti
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-gray-200">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <div className="text-gray-500 mb-2">{exp.company} <span className="mx-2">·</span> <span className="text-sm">{exp.duration}</span></div>
                  {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Vzdělání
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-gray-700">{edu.degree}</p>
                  <p className="text-sm text-gray-500">{edu.duration}</p>
                  {edu.details && <p className="text-sm text-gray-400 mt-1">{edu.details}</p>}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b pb-2">Dovednosti</h2>
            <ul className="space-y-2">
              {data.skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <Code className="w-4 h-4 text-gray-400" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b pb-2">Jazyky</h2>
            <ul className="space-y-3">
              {data.languages.map((lang, idx) => (
                <li key={idx}>
                  <span className="block font-medium text-gray-800">{lang.name}</span>
                  <span className="text-sm text-gray-500">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b pb-2">Certifikace</h2>
            <ul className="space-y-3">
              {data.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <Award className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StandardView;