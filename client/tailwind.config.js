/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '340px',
      'sm': '540px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
    ,
    extend: {
      fontFamily: {
        inter: ["Inter"]
      },
      backgroundImage: {
        "chat-background": "url('/assets/chat-bg.png')",
      },
      gridTemplateColumns: {
        lg: "1.2fr 2.2fr",
        md: "1.4fr 2fr",
        xl: "1fr 2.4fr",
      },
      colors: {
        primary: "#202c33",
        secondary: "#0b141a",
        "teal-light": "#7ae3c3",
        "photopicker-overlay": "rgba(30,42,49,0.8)",
        "dropdown": "#233138",
        "dropdown-hover": "#182229",
        "input": " #2a3942",
        "primary-strong": "#e9edef",
        "panel-header-icon": "#aebac1",
        "icon-lighter": "#8696a0",
        "icon-green": "rgb(37, 211, 102)",
        "ui-components": "#111b21",
        "conversation-border": "rgba(134,150,160,0.15)",
        "conversation-panel": "#0b141a",
        "default-hover": "#202c33",
        "incoming": "#202c33",
        "outgoing": "#005c4b",
        "bubble-meta": "hsla(0,0%,100%,0.6)",
        "icon-ack": "#53bdeb",
      },
    },
  },
  plugins: [],
}

// colors: {
//   secondary: "#8696a0",
//     "teal-light": "#7ae3c3",
//       "photopicker-overlay-background": "rgba(30,42,49,0.8)",
//         "dropdown-background": "#233138",
//           "dropdown-background-hover": "#182229",
//             "input-background": " #2a3942",
//               "primary-strong": "#e9edef",
//                 "panel-header-background": "#202c33",
//                   "panel-header-icon": "#aebac1",
//                     "icon-lighter": "#8696a0",
//                       "icon-green": "#00a884",
//                         "search-input-container-background": "#111b21",
//                           "conversation-border": "rgba(134,150,160,0.15)",
//                             "conversation-panel-background": "#0b141a",
//                               "background-default-hover": "#202c33",
//                                 "incoming-background": "#202c33",
//                                   "outgoing-background": "#005c4b",
//                                     "bubble-meta": "hsla(0,0%,100%,0.6)",
//                                       "icon-ack": "#53bdeb",
//       },
