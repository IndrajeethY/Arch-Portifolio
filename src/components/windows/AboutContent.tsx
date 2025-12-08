import { motion } from "framer-motion";

const ArchLogo = () => (
  <pre className="text-primary text-xs leading-tight">
    {`                   -\`                    
                  .o+\`                   
                 \`ooo/                   
                \`+oooo:                  
               \`+oooooo:                 
               -+oooooo+:                
             \`/:-:++oooo+:               
            \`/++++/+++++++:              
           \`/++++++++++++++:             
          \`/+++ooooooooooooo/\`           
         ./ooosssso++osssssso+\`          
        .oossssso-\`\`\`\`/ossssss+\`         
       -osssssso.      :ssssssso.        
      :osssssss/        osssso+++.       
     /ossssssss/        +ssssooo/-       
   \`/ossssso+/:-        -:/+osssso+-     
  \`+sso+:-\`                 \`.-/+oso:    
 \`++:.                           \`-/+/   
 .\`                                 \`/   `}
  </pre>
);



export const AboutContent = () => {
  const info = [
    { label: "OS", value: "Arch Linux x86_64" },
    { label: "Host", value: "Portfolio v1.0" },
    { label: "Kernel", value: "6.6.8-arch1-1" },
    { label: "Shell", value: "bash 5.2.21" },
    { label: "DE", value: "Custom React Environment" },
    { label: "WM", value: "Framer Motion" },
    { label: "Terminal", value: "Web Terminal" },
    { label: "CPU", value: "Creative Mind @ 3.2GHz" },
    { label: "Memory", value: "∞ Ideas / ∞ Passion" },
  ];

  const colors = [
    "bg-background",
    "bg-destructive",
    "bg-terminal-green",
    "bg-terminal-yellow",
    "bg-primary",
    "bg-terminal-magenta",
    "bg-terminal-cyan",
    "bg-foreground",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ArchLogo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <div className="mb-4">
          <span className="text-primary font-bold">indrajeeth</span>
          <span className="text-foreground">@</span>
          <span className="text-terminal-cyan font-bold">
            indrajeeth-portfolio
          </span>
        </div>
        <div className="border-b border-border mb-4 pb-2">
          <span className="text-muted-foreground">
            ------------------------
          </span>
        </div>

        <div className="space-y-1">
          {info.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="flex gap-2 text-sm"
            >
              <span className="text-primary font-medium w-20">
                {item.label}:
              </span>
              <span className="text-foreground">{item.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <div className="flex gap-1">
            {colors.map((color, idx) => (
              <div key={idx} className={`w-6 h-6 ${color} rounded-sm`} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          <p className="mb-2">
            <span className="text-terminal-green">$</span> cat about.txt
          </p>
          <p className="text-foreground leading-relaxed">
            Hi! I'm a passionate developer who loves building beautiful,
            functional applications. I believe in clean code, minimalist design,
            and the Arch way - simple, user-centric, and powerful.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
