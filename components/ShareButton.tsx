"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ToastProvider";

interface Props {
  name: string;
}

export function ShareButton({ name }: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  function share() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast("Link copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={share}
      className="btn btn-sm btn-ghost border border-base-300 gap-2"
      title="Copy link"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
      Share
    </button>
  );
}
