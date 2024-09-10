import { Action } from "../../../store/slices/loyaltySlice.ts";
import Button from "../../../shared/Button.tsx";
import { useNavigate } from "react-router-dom";

const MenuAction = ({ action }: { action: Action }) => {
  const navigate = useNavigate();

  return (
    <div
      className="mr-[20px] w-[150px]"
      onClick={() => navigate(`/action/${action.id}`)}
    >
      {/* Картинка */}
      <div
        style={{ backgroundImage: `url(${action.image})` }}
        className="h-[150px] w-[150px] rounded-[10px] bg-white bg-cover bg-center sm:h-[200px]"
      />

      {/* Данные блюда */}
      <div className="flex flex-col justify-between pt-2">
        <div>
          <h4 className="mb-3 line-clamp-1 text-sm text-white">
            {action.name}
          </h4>
          <p className="mb-4 line-clamp-2 text-xs text-fontSecondary">
            {action.description}
          </p>
        </div>

        <Button className="p-2 text-sm" text={"Узнать больше"} />
      </div>
    </div>
  );
};

const MenuActions = ({ actions }: { actions: Action[] }) => {
  return (
    <div className="mb-[80px] mt-[90px]">
      {actions.length !== 0 && (
        <div className="">
          <h2 className="mb-5 w-fit px-3 text-xl font-semibold">Акции</h2>

          <div className="no-scrollbar mb-[20px] mr-3 w-full flex-row overflow-x-scroll pl-3">
            <div className="flex flex-row">
              {actions.map((action) => (
                <MenuAction key={action.id} action={action} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuActions;
