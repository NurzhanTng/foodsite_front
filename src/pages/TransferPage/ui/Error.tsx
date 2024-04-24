import { twMerge } from "tailwind-merge";
import Button from "../../../shared/Button.tsx";

type ErrorProps = {
  fetchData: () => void;
  errorType: "internet" | "unauthorised" | "server" | "bad request" | null;
  className?: string;
};

const ServerError = ({ fetchData }: { fetchData: () => void }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-base font-medium text-white">
        Сервер на данный момент не работает. Поробуйте свою попытку снова
      </p>
      <Button
        styleType="primary"
        onClick={fetchData}
        text="Попробовать снова"
        showText={true}
      />
    </div>
  );
};

const UnauthorisedError = () => {
  return (
    <div>
      <p className="w-[200px] text-center text-xl font-medium text-white">
        Не получилось авторизовать пользователя. Попробуйте перезайти с телеграм
        бота
      </p>
    </div>
  );
};

const UnknownError = () => {
  return (
    <div>
      <p className="text-base font-medium text-white">
        Непредвиденная ошибка. Попробуйте перезайти на сайт или свяжитесь с нами
      </p>
    </div>
  );
};

const Error = ({ errorType, className, fetchData }: ErrorProps) => {
  return (
    <div
      className={twMerge(
        errorType === null
          ? "fixed left-[calc(50%-25px)] top-[calc(50%-25px)] h-[50px] w-[50px]"
          : "fixed" + " left-[calc(50%-100px)] top-[calc(50%-100px)] w-[200px]",
        className,
      )}
    >
      {errorType === "server" && <ServerError fetchData={fetchData} />}
      {errorType === "unauthorised" && <UnauthorisedError />}
      {errorType === "bad request" && <UnknownError />}
    </div>
  );
};

export default Error;
