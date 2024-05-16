import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks.ts";
import { City } from "../../../store/slices/AviataSlice.ts";
import Button from "../../../shared/Button.tsx";

const CityPage = () => {
  const { city_id } = useParams();
  const navigate = useNavigate();

  if (city_id === undefined) return <div />;
  const city: City | undefined = useAppSelector((state) =>
    state.aviata.cities.find((value) => value.city_id === parseInt(city_id)),
  );
  if (city === undefined) return <div />;

  return (
    <div className="relative mb-[70px] min-h-[calc(100vh-70px)]">
      <Button
        text={"Вернуться назад"}
        onClick={() => navigate("/main")}
        className="fixed bottom-0 left-0 w-full rounded-[0] bg-green2 px-[16px] py-[11px] text-xl backdrop-blur backdrop-filter"
      />

      <div
        style={{ backgroundImage: `url(${city.image_url})` }}
        className="mr-5 h-[350px] w-full bg-transparent bg-cover bg-center shadow-image"
      />

      <div className="px-3">
        <h4 className="my-3 text-base font-bold text-green1">{city.name}</h4>
        <p className="mb-6 text-xs text-fontSecondary">{city.description}</p>
      </div>
    </div>
  );
};

export default CityPage;
