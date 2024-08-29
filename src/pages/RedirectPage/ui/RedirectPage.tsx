import React, { useEffect } from "react";

const RedirectPage: React.FC = () => {
  useEffect(() => {
    // URL, на который нужно перенаправить
    // Перенаправление пользователя на указанный URL
    window.location.href =
      "https://t.me/monopizza_bot?start=7pQk4Vx9Lm28NwsB3rZj";
  }, []);

  return (
    <div>
      <p>Перенаправление...</p>
    </div>
  );
};

export default RedirectPage;
