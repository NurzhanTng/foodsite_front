import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

const RedirectPage: React.FC = () => {
  useEffect(() => {
    window.location.href =
      "https://t.me/monopizza_bot?start=7pQk4Vx9Lm28NwsB3rZj";
    const tg = window.Telegram.WebApp;
    setTimeout(() => {
      tg.close();
    }, 1000);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Добавляем акцию</p>
      <div
        className={twMerge(
          "fixed left-[calc(50%-25px)] top-[calc(40%-25px)] h-[50px] w-[50px] animate-spin rounded-full border-4" +
            " border-t-4 border-button border-t-bgColor ease-linear",
        )}
      />
    </div>
  );
};

export default RedirectPage;
