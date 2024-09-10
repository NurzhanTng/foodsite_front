import { useAppSelector } from "../../../store/hooks/hooks.ts";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../shared/Button.tsx";

const ActionPage = () => {
  const { actionId } = useParams();
  const navigate = useNavigate();

  const action = useAppSelector((state) =>
    state.loyalty.actions.find((action) => action.id == (actionId || -1)),
  );

  console.log(actionId);

  if (action === undefined) return <div></div>;
  return (
    <div>
      {/* Картинка */}
      <div
        style={{ backgroundImage: `url(${action.image})` }}
        className="h-[250px] rounded-[10px] bg-white bg-cover bg-center "
      />

      {/* Данные блюда */}
      <div className="mx-4 mt-3 flex min-h-[calc(100vh-270px)] flex-col justify-between pt-2">
        <div>
          <h4 className="mb-3 text-base text-white">{action.name}</h4>
          <p className="mb-4 text-sm text-fontSecondary">
            {action.description}
          </p>
        </div>
      </div>

      <Button
        onClick={() => navigate("/menu")}
        className="absolute bottom-0 mt-auto w-full rounded-[0] p-3 text-base"
        text={"Вернуться на главную"}
      />
    </div>
  );
};

export default ActionPage;
