import { useNavigate } from "react-router-dom";
import mastercard from "../../../data/img/mastercard.png";
import visa from "../../../data/img/visa.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-[30px] border-t border-secondary bg-bgColor2 px-[30px] pb-[90px] pt-[30px]">
      <div className="flex w-[150px] flex-col justify-between">
        <p className="mb-[20px] text-fontSecondary">Поддержка карт</p>
        <img
          alt={"Mastercard"}
          src={mastercard}
          className="mb-[10px] w-[80px]"
        />
        <img alt={"Mastercard"} src={visa} className="w-[80px]" />
      </div>
      <div className={"flex flex-col gap-[30px]"}>
        <p className="text-fontSecondary">Основное</p>
        <p
          className="text-button underline"
          onClick={() => navigate("/privacy")}
        >
          Политика конфиденциальности
        </p>
        <p className="text-button underline" onClick={() => navigate("/offer")}>
          Договор оферты
        </p>
      </div>
    </div>
  );
};

export default Footer;
