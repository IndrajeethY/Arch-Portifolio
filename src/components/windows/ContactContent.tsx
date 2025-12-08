import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export const ContactContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Sanitize inputs
      const sanitizedName = name.trim().slice(0, 100);
      const sanitizedEmail = email.trim().slice(0, 100);
      const sanitizedMessage = message.trim().slice(0, 1000);

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        setStatus("error");
        setErrorMessage("Please enter a valid email address");
        setSending(false);
        return;
      }

      // Send to custom API endpoint
      const response = await fetch("https://p.indrajeeth.in/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/IndrajeethY",
      username: "IndrajeethY",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/indrajeethy",
      username: "Indrajeethy",
    },
    {
      icon: Twitter,
      label: "Twitter",
      url: "https://twitter.com/tamilvip007",
      username: "tamilvip007",
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:mail@indrajeeth.in",
      username: "mail@indrajeeth.in",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <span className="text-terminal-green">$</span>
        <span>mail -s "Hello" indrajeeth@indrajeeth-portfolio</span>
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 gap-2 mb-6"
      >
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded border border-border hover:border-primary/50 hover:bg-card transition-colors group"
          >
            <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="text-xs">
              <div className="text-foreground">{social.label}</div>
              <div className="text-muted-foreground">{social.username}</div>
            </div>
          </a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            <span className="text-primary">Name:</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            maxLength={100}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            <span className="text-primary">Mail:</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            maxLength={100}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            <span className="text-primary">Message:</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            required
            maxLength={1000}
            rows={4}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={sending || status === "success"}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {sending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {sending
            ? "Sending..."
            : status === "success"
              ? "Message sent!"
              : "Send message"}
        </button>
      </motion.form>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-terminal-green"
        >
          <CheckCircle className="w-3 h-3" />
          Mail queued for delivery
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-destructive"
        >
          <AlertCircle className="w-3 h-3" />
          {errorMessage}
        </motion.div>
      )}
    </div>
  );
};
