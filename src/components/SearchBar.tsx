import { useState, useCallback } from "react";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SearchBarProps {
  large?: boolean;
  defaultValue?: string;
}

export function SearchBar({ large = false, defaultValue = "" }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, navigate]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center glass-card rounded-xl ${
          large ? "p-1.5" : "p-1"
        } glow-border transition-all focus-within:shadow-[0_0_30px_hsla(174,72%,46%,0.25)]`}
      >
        <Sparkles className={`${large ? "ml-4 h-5 w-5" : "ml-3 h-4 w-4"} text-primary animate-pulse-glow`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search datasets with AI... (e.g., 'B2B email contacts' or 'healthcare providers')"
          className={`flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground ${
            large ? "px-4 py-3 text-base" : "px-3 py-2 text-sm"
          }`}
        />
        <button
          type="submit"
          className={`flex items-center gap-1.5 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:opacity-90 ${
            large ? "px-6 py-3 text-sm" : "px-4 py-2 text-xs"
          }`}
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}
