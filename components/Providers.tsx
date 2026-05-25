"use client";

import { ThemeProvider } from "next-themes";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="apidark"
      themes={["apilight", "apidark"]}
      enableSystem={false}
    >
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
