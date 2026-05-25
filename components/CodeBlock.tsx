"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Check, Copy } from "lucide-react";
import { LANGUAGES, type Language } from "@/lib/codeGen";

const LANG_MAP: Record<Language, string> = {
  javascript: "javascript",
  python: "python",
  go: "go",
  ruby: "ruby",
  curl: "bash",
  php: "php",
};

interface Props {
  examples: Record<Language, string>;
  title?: string;
}

export function CodeBlock({ examples, title }: Props) {
  const [lang, setLang] = useState<Language>("javascript");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(examples[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-xl overflow-hidden border border-base-300 bg-[#1a1a1a]">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111111]">
        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {LANGUAGES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setLang(id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                lang === id
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors shrink-0 ml-4"
        >
          {copied ? (
            <>
              <Check size={13} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={LANG_MAP[lang]}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: "1.65",
          }}
        >
          {examples[lang]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
