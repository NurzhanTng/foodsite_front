// telegram.d.ts

declare global {
  interface Window {
    Telegram: {
      WebApp: any; // Замените any на реальный тип, если он известен
    };
  }
}

export {};
