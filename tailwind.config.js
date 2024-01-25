/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_color: "var(--tg-theme-bg-color)",
        text_color: "var(--tg-theme-text-color)",
        hint_color: "var(--tg-theme-hint-color)",
        link_color: "var(--tg-theme-link-color)",
        button_color: "var(--tg-theme-button-color)",
        button_text_color: "var(--tg-theme-button-text-color)",
        secondary_bg_color: "var(--tg-theme-secondary-bg-color)",
        header_bg_color: "var(--tg-theme-header-bg-color)",
        accent_text_color: "var(--tg-theme-accent-text-color)",
        section_bg_color: "var(--tg-theme-section-bg-color)",
        section_header_text_color: "var(--tg-theme-section-header-text-color)",
        subtitle_text_color: "var(--tg-theme-subtitle-text-color)",
        destructive_text_color: "var(--tg-theme-destructive-text-color)",
        bgColor: "#17212B",
        bgColor2: "#141C25",
        secondary: "#232E39",
        button: "#5288C1",
        buttonHover: "#4A7AAE",
        fontSecondary: "#708499",
      },
      boxShadow: {
        card: "0 0 40px 0 rgba(41, 59, 76, 0.5)",
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%'
      }
    },
  },
  plugins: [],
};
