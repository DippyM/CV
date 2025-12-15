import { CVData } from './types';

export const CV_DATA: CVData = {
  personal: {
    name: "Matouš Wolný",
    title: "IT Student | Cybersecurity Enthusiast",
    email: "fazze49@gmail.com",
    linkedin: "www.linkedin.com/in/matous-wolny",
    location: "Hlavní město Praha, Česko"
  },
  summary: "Jsem student IT na ČZU a ve volném čase rozvíjím svou znalost ve vývoji software a v kybernetické bezpečnosti. Mám zkušenosti s programováním v C#, Pythonu, prací s Office 365 a správou sítí. Ve volném čase tvořím projekty jako webové aplikace a nástroje pro usnadnění každodenní práce. Během studia na střední škole jsem absolvoval stáž v IT firmě, kde jsem pracoval na implementaci informačního systému. Hledám příležitosti v oblasti kybernetické bezpečnosti jako Trainee.",
  skills: [
    { name: "Kybernetická bezpečnost" },
    { name: "C#" },
    { name: "Python" },
    { name: "Office 365" },
    { name: "Správa sítí" }
  ],
  languages: [
    { name: "Čeština", level: "Native" },
    { name: "Angličtina", level: "Professional Working" },
    { name: "Španělština", level: "Limited Working" }
  ],
  certifications: [
    "CompTIA Security+",
    "Play It Safe: Manage Security Risks",
    "Úvod do umělé inteligence",
    "Foundations of Cybersecurity"
  ],
  projects: [
    {
      name: "Network Vulnerability Scanner",
      description: "Skript v Pythonu pro automatizované skenování otevřených portů a základní detekci zranitelností v lokální síti.",
      link: "github.com/matous-wolny/net-scanner"
    },
    {
      name: "Secure File Manager",
      description: "Desktopová aplikace v C# (WPF) využívající AES šifrování pro bezpečné lokální ukládání citlivých dokumentů.",
      link: "github.com/matous-wolny/secure-files"
    },
    {
      name: "CV Web App",
      description: "Interaktivní React aplikace s dual-mode zobrazením (Standard/Terminal) a integrací Gemini AI.",
      link: "github.com/matous-wolny/cv-web"
    }
  ],
  experience: [
    {
      company: "Frumoš - ovoce do kanceláře",
      role: "Rozvoz a Chystání ovoce",
      duration: "října 2022 - Současnost",
      location: "Hlavní město Praha, Česko"
    },
    {
      company: "Autocont",
      role: "Technik IT",
      duration: "srpna 2021 - října 2021 (3 měsíce)",
      location: "Na Jarově 2424/2b"
    },
    {
      company: "MTJ service s.r.o.",
      role: "IT specialista (Stáž)",
      duration: "července 2020 - srpna 2020 (2 měsíce)",
      description: "14-denní stáž skrze střední školu, implementace IS pro malé podniky."
    }
  ],
  education: [
    {
      school: "Provozně ekonomická fakulta ČZU",
      degree: "Bakalář (Bc.), Informační technologie",
      duration: "září 2022 - 2026 (očekáváno)"
    },
    {
      school: "Střední průmyslová škola elektrotechnická, Praha 10",
      degree: "Maturita, Informační technologie",
      duration: "2017 - 2021",
      details: "V Úžlabině 320"
    }
  ]
};