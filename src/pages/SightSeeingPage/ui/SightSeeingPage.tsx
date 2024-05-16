import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks.ts";
import { Sightseeing } from "../../../store/slices/AviataSlice.ts";
import Button from "../../../shared/Button.tsx";

const SightSeeingPage = () => {
  const { sightseeing_id } = useParams();
  const navigate = useNavigate();

  if (sightseeing_id === undefined) return <div />;
  const signtseeing: Sightseeing | undefined = useAppSelector((state) =>
    state.aviata.sightseeings.find(
      (value) => value.sightseeing_id === parseInt(sightseeing_id),
    ),
  );
  if (signtseeing === undefined) return <div />;

  return (
    <div className="relative mb-[70px] min-h-[calc(100vh-70px)]">
      <Button
        text={"Вернуться назад"}
        onClick={() => navigate("/main")}
        className="fixed bottom-0 left-0 w-full rounded-[0] bg-green2 px-[16px] py-[11px] text-xl backdrop-blur backdrop-filter"
      />

      <div
        style={{ backgroundImage: `url(${signtseeing.image_url})` }}
        className="mr-5 h-[350px] w-full bg-transparent bg-cover bg-center shadow-image"
      />

      <div className="px-3">
        <h4 className="my-3 text-base font-bold text-green1">
          {signtseeing.name}
        </h4>
        <p className="mb-6 text-xs text-fontSecondary">
          {signtseeing.description}
        </p>
      </div>
    </div>
  );
};

export default SightSeeingPage;
