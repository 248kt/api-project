"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

const SHORTCUTS = [
  { key: "/",      action: "Focus search"        },
  { key: "Escape", action: "Close / clear"        },
  { key: "?",      action: "Open shortcuts"       },
  { key: "t",      action: "Toggle theme"         },
  { key: "g h",    action: "Go home"              },
  { key: "g a",    action: "Go to AI Creator"     },
  { key: "g s",    action: "Submit an API"        },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ open, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 bg-base-100 border border-base-300 rounded-xl shadow-2xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-base-300">
          <span className="font-semibold text-sm tracking-wide">Keyboard Shortcuts</span>
          <button onClick={onClose} className="btn btn-ghost btn-xs btn-square">
            <X size={14} />
          </button>
        </div>

        <ul className="p-5 space-y-3">
          {SHORTCUTS.map(({ key, action }) => (
            <li key={key} className="flex items-center justify-between">
              <span className="text-sm text-base-content/70">{action}</span>
              <kbd className="kbd kbd-sm font-mono">{key}</kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
