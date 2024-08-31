import React from "react";
import { twMerge } from "tailwind-merge";
import useMainHook from "../../TransferPage/hooks/useMainHook.ts";
import Error from "../../TransferPage/ui/Error.tsx";

const RedirectPage: React.FC = () => {
  const data = useMainHook("7pQk4Vx9Lm28NwsB3rZj");

  return data.errorType === null ? (
    <div className="flex h-screen items-center justify-center">
      <p>Добавляем акцию</p>
      <div
        className={twMerge(
          "fixed left-[calc(50%-25px)] top-[calc(40%-25px)] h-[50px] w-[50px] animate-spin rounded-full border-4" +
            " border-t-4 border-button border-t-bgColor ease-linear",
        )}
      />
    </div>
  ) : (
    <Error {...data} />
  );
};

export default RedirectPage;
