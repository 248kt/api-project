// eslint-disable-next-line @typescript-eslint/no-require-imports
const daisyui = require("daisyui");

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["apilight --default", "apidark"],
    logs: false,
  },
};

export default config;
