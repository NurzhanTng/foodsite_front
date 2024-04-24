import { useNavigate } from "react-router-dom";
import mastercard from "../../../data/img/mastercard.jpg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-[90px] flex flex-row gap-[30px] px-[30px] pt-[50px]">
      <img alt={"Mastercard"} src={mastercard} className="w-[150px]" />
      <div className={"flex flex-col gap-[5px]"}>
        <p
          className="text-fontSecondary underline"
          onClick={() => navigate("/privacy")}
        >
          Политика конфиденциальности
        </p>
        <p
          className="text-fontSecondary underline"
          onClick={() => navigate("/offer")}
        >
          Договор оферты
        </p>
      </div>
    </div>
  );
};

export default Footer;
