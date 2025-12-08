import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Star, GitFork, Loader2 } from "lucide-react";

interface ProjectData {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  owner: string;
  repo: string;
}

const initialProjects: ProjectData[] = [
  {
    name: "WhatChatGPT",
    description:
      "WhatsApp chatbot in Go + Whatsmeow that uses OpenAI to respond — supports text ✅ (and even images if configured).",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0, // will be fetched
    url: "https://github.com/IndrajeethY/WhatChatGPT",
    owner: "IndrajeethY",
    repo: "WhatChatGPT",
  },
  {
    name: "CloudFlareBackuper",
    description:
      "A backup utility that automates snapshots and backups for Cloudflare-protected assets / metadata.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/CloudFlareBackuper",
    owner: "IndrajeethY",
    repo: "CloudFlareBackuper",
  },
  {
    name: "Linkedin-Poster",
    description:
      "Tool / script to automate posting to LinkedIn — helps schedule or batch-upload posts to LinkedIn programmatically.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/Linkedin-Poster",
    owner: "IndrajeethY",
    repo: "Linkedin-Poster",
  },
  {
    name: "TgStoryDl",
    description:
      "Downloader for Telegram stories / media — automates fetching and saving stories or media from Telegram channels/groups.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/TgStoryDl",
    owner: "IndrajeethY",
    repo: "TgStoryDl",
  },
  {
    name: "repo-cleaner",
    description:
      "Utility to clean / prune unused files or repos — helps tidy up GitHub repos, maybe bulk-cleanup or archival toolchain.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/repo-cleaner",
    owner: "IndrajeethY",
    repo: "repo-cleaner",
  },
  {
    name: "Todo-App",
    description:
      "A simple ToDo application — possibly a web or CLI app to manage tasks, for learning or demo purposes.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/Todo-App",
    owner: "IndrajeethY",
    repo: "Todo-App",
  },
  {
    name: "Nova",
    description:
      "Personal project/repo ‘Nova’ — placeholder name, adjust description to reflect what Nova does (tool, lib, website etc.).",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/Nova",
    owner: "IndrajeethY",
    repo: "Nova",
  },
  {
    name: "Go-Learning",
    description:
      "Collection of Go learning examples, experiments, or small tools — a playground to sharpen Go skills.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0,
    url: "https://github.com/IndrajeethY/Go-Learning",
    owner: "IndrajeethY",
    repo: "Go-Learning",
  },
];

// Language color mapping for GitHub languages
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Shell: "#89e051",
  Bash: "#89e051",
  Lua: "#000080",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
};

export const ProjectsContent = () => {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const updatedProjects = await Promise.all(
          initialProjects.map(async (project) => {
            try {
              const response = await fetch(
                `https://api.github.com/repos/${project.owner}/${project.repo}`,
              );

              if (!response.ok) {
                // API request failed (rate limit, network issue, or repo not found)
                // Return original project data as fallback
                return project;
              }

              const data = await response.json();
              return {
                ...project,
                name: data.name || project.name,
                description: data.description || project.description,
                language: data.language || project.language,
                languageColor:
                  languageColors[data.language] || project.languageColor,
                stars: data.stargazers_count || 0,
                forks: data.forks_count || 0,
                url: data.html_url || project.url,
              };
            } catch {
              // Network or parsing error - return original project data
              return project;
            }
          }),
        );

        setProjects(updatedProjects);
        setLoading(false);
      } catch {
        setError("Failed to fetch repository data");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <span className="text-terminal-green">$</span>
        <span>ls -la ~/projects/</span>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Fetching repository data...</span>
        </div>
      )}

      {error && <div className="text-destructive text-sm py-2">{error}</div>}

      <div className="space-y-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group border border-border rounded-lg p-4 hover:border-primary/50 transition-colors bg-card/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-primary" />
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  {project.name}
                </a>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {project.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.languageColor }}
                />
                <span>{project.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>{loading ? "..." : project.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                <span>{loading ? "..." : project.forks}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-xs text-muted-foreground"
      >
        <span className="text-terminal-green">$</span> Total: {projects.length}{" "}
        repositories
      </motion.div>
    </div>
  );
};
