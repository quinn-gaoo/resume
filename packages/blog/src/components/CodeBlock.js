import { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";

const languageNames = {
  javascript: "JavaScript",
  js: "JavaScript",
  python: "Python",
  py: "Python",
  typescript: "TypeScript",
  ts: "TypeScript",
  go: "Go",
  rust: "Rust",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
  md: "Markdown",
  java: "Java",
  cpp: "C++",
  c: "C",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  dart: "Dart",
  scala: "Scala",
  haskell: "Haskell",
  lua: "Lua",
  perl: "Perl",
  r: "R",
  matlab: "MATLAB",
  dockerfile: "Dockerfile",
  toml: "TOML",
  vue: "Vue",
  react: "React",
  jsx: "JSX",
  tsx: "TSX",
  sass: "Sass",
  scss: "SCSS",
};

export default function CodeBlock({ children, language }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  const displayLanguage =
    languageNames[language?.toLowerCase()] || language || "Code";

  const handleCopy = async () => {
    if (!codeRef.current) return;
    const code = codeRef.current.textContent;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const preElement = codeRef.current?.parentElement;
    if (preElement) {
      preElement.classList.add("code-block-wrapper");
    }
  }, []);

  return (
    <div className="code-block-container my-4 rounded-lg overflow-hidden shadow-sm border border-border bg-slate-900">
      <div className="flex items-center justify-between px-4 py-1 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {displayLanguage}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <code ref={codeRef} className={`language-${language || "plaintext"}`}>
          {children}
        </code>
      </div>
    </div>
  );
}
