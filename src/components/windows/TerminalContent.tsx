import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const commands: Record<string, string | ((args: string) => string)> = {
  help: `Available commands:
  help     - Show this help message
  whoami   - Display current user
  uname    - System information
  ls       - List files
  pwd      - Print working directory
  date     - Show current date/time
  clear    - Clear terminal
  pacman   - Arch package manager
  neofetch - System info with logo
  cowsay   - Cow says something
  fortune  - Random fortune`,
  whoami: "Indrajeeth",
  uname: "Linux Indrajeeth-portfolio 6.6.8-arch1-1 #1 SMP x86_64 GNU/Linux",
  ls: "about.txt  projects/  resume.md  .config/  Downloads/",
  pwd: "/home/Indrajeeth",
  date: () => new Date().toString(),
  pacman: (args: string) => {
    if (!args || args.trim() === "") {
      return `usage: pacman <operation> [...]
operations:
    pacman -S <package>   install package
    pacman -R <package>   remove package
    pacman -Syu           sync and update
    pacman -Ss <query>    search packages`;
    }
    if (args.includes("-Syu")) {
      return ":: Synchronizing package databases...\n[##############################] 100%\nThere is nothing to do.";
    }
    if (args.includes("-S ")) {
      const pkg = args.replace("-S ", "").trim();
      return `resolving dependencies...
looking for conflicting packages...

Packages (1) ${pkg}-1.0.0

Total Installed Size:  1.00 MiB

:: Proceed with installation? [Y/n] 
(1/1) installing ${pkg}                    [######################] 100%`;
    }
    return ":: Synchronizing package databases...\n[##############################] 100%\nThere is nothing to do.";
  },
  neofetch: `                   -\`                    indrajeeth@indrajeeth-portfolio
                  .o+\`                   -------------------
                 \`ooo/                   OS: Arch Linux x86_64
                \`+oooo:                  Host: Portfolio v1.0
               \`+oooooo:                 Kernel: 6.6.8-arch1-1
               -+oooooo+:                Shell: bash 5.2.21
             \`/:-:++oooo+:               DE: Custom React
            \`/++++/+++++++:              Terminal: Web
           \`/++++++++++++++:             CPU: Creative Mind
          \`/+++ooooooooooooo/\`           Memory: ∞ / ∞`,
  cowsay: (args: string) => {
    const text = args.trim() || "I use Arch btw";
    const line = "-".repeat(text.length + 2);
    return ` ${line}
< ${text} >
 ${line}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
  },
  fortune: () => {
    const fortunes = [
      "The best way to predict the future is to invent it. - Alan Kay",
      "Talk is cheap. Show me the code. - Linus Torvalds",
      "First, solve the problem. Then, write the code. - John Johnson",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
      "The only way to go fast, is to go well. - Robert C. Martin",
      "Simplicity is prerequisite for reliability. - Edsger W. Dijkstra",
      "I use Arch btw.",
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  },
};

interface HistoryItem {
  command: string;
  output: string;
}

export const TerminalContent = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output:
        "Welcome to Arch Linux Terminal\nType 'help' for available commands.\n",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const [command, ...argParts] = trimmedCmd.toLowerCase().split(" ");
    const args = argParts.join(" ");
    let output = "";

    if (command === "clear") {
      setHistory([]);
      return;
    } else if (command === "date") {
      output = new Date().toString();
    } else if (commands[command]) {
      const commandValue = commands[command];
      if (typeof commandValue === "function") {
        output = commandValue(args);
      } else {
        output = commandValue;
      }
    } else if (trimmedCmd === "") {
      output = "";
    } else {
      output = `bash: ${command}: command not found`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full overflow-auto font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, idx) => (
        <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {item.command && (
            <div className="flex gap-2">
              <span className="text-terminal-green">indrajeeth@indrajeeth-portfolio</span>
              <span className="text-foreground">:</span>
              <span className="text-primary">~</span>
              <span className="text-foreground">$</span>
              <span className="text-foreground">{item.command}</span>
            </div>
          )}
          {item.output && (
            <pre className="text-foreground/80 whitespace-pre-wrap mb-2">
              {item.output}
            </pre>
          )}
        </motion.div>
      ))}

      <div className="flex gap-2 items-center">
        <span className="text-terminal-green whitespace-nowrap">indrajeeth@indrajeeth-portfolio</span>
        <span className="text-foreground">:</span>
        <span className="text-primary">~</span>
        <span className="text-foreground">$</span>
        <div className="flex-1 flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none text-foreground caret-transparent"
            autoComplete="off"
            spellCheck={false}
          />
          <span
            className="absolute h-4 w-2 bg-foreground cursor-blink pointer-events-none"
            style={{ left: `${input.length}ch` }}
          />
        </div>
      </div>
    </div>
  );
};
