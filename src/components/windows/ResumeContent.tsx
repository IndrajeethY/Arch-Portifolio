import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";

export const ResumeContent = () => {
  const experience = [
    {
      title: "Fullstack Developer",
      company: "Simtestlabs",
      period: "Jan 2025 - Present",
      description:
        "Building scalable system engineering platform with simulation, version control, and team collaboration workflows.",
    },
    {
      title: "Data Annotator",
      company: "Labelbees",
      period: "Mar 2024 - Aug 2024",
      description:
        "Labeled and validated datasets with accuracy, improving ML training performance.",
    },
    {
      title: "IoT Intern",
      company: "Veerana Projects",
      period: "Mar 2023 - Feb 2024",
      description:
        "Built IoT solutions using Raspberry Pi and multiple sensors with optimized hardware-software integration.",
    },
  ];

  const skills = [
    { name: "JavaScript / TypeScript", level: 90 },
    { name: "Python", level: 85 },
    { name: "Golang", level: 90 },
    { name: "React", level: 88 },
    { name: "Node.js / Express.js", level: 80 },
    { name: "PostgreSQL / SQLite", level: 75 },
    { name: "HTML / CSS", level: 60 },
  ];

  const projects = [
    {
      name: "eSysflow",
      desc: "Web app for system engineering w/ simulation, version control, issue tracking & collaborative editor.",
    },
    {
      name: "WhatChatGPT",
      desc: "Open-source Go chatbot using OpenAI API for context-aware responses.",
    },
    {
      name: "LinkedIn-Poster",
      desc: "Go Telegram bot using Gemini AI & LinkedIn OAuth for automated posting.",
    },
    {
      name: "CloudFlareBackuper",
      desc: "Go cron-based backup automation to Cloudflare R2 w/ retention & webhook alerts.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <span className="text-terminal-green">$</span>
        <span>cat resume.md | less</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-border pb-4"
      >
        <h1 className="text-xl font-bold text-primary"># Resume</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Full Stack Developer | IoT Innovator | Open Source Contributor
        </p>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "https://files.indrajeeth.in/indrajeeth-resume.pdf";
            link.download = "Indrajeeth-Resume.pdf";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="mt-3 flex items-center gap-2 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          <Download className="w-3 h-3" />
          Download PDF
        </button>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="flex items-center gap-2 text-sm font-bold text-terminal-cyan mb-3">
          <Briefcase className="w-4 h-4" />
          ## Experience
        </h2>

        <div className="space-y-3">
          {experience.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-primary/30 pl-3 py-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{exp.title}</span>
                <span className="text-xs text-muted-foreground">
                  {exp.period}
                </span>
              </div>
              <div className="text-sm text-primary">{exp.company}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="flex items-center gap-2 text-sm font-bold text-terminal-cyan mb-3">
          <Award className="w-4 h-4" />
          ## Skills
        </h2>

        <div className="space-y-2">
          {skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="flex items-center gap-2 text-sm font-bold text-terminal-cyan mb-3">
          <GraduationCap className="w-4 h-4" />
          ## Education
        </h2>

        <div className="border-l-2 border-primary/30 pl-3 py-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">
              B.Tech Information Technology
            </span>
            <span className="text-xs text-muted-foreground">2020 - 2024</span>
          </div>
          <div className="text-sm text-primary">
            Sengunthar College of Engineering, Namakkal
          </div>
        </div>
      </motion.div>
    </div>
  );
};
