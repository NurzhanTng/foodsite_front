import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { setStatusOpen } from "../../../store/slices/managerSlice.ts";
import ManagerHeader from "../../../features/Headers";
import OrderCategory from "../../../widget/OrderCategory.tsx";
import useManager from "../../../hooks/useManager.ts";

const ManagerMainPage = () => {
  const manager = useAppSelector((state) => state.manager);
  const dispatch = useAppDispatch();
  const { statuses, statusesTitles } = useManager();

  return (
    <div className="px-5 pt-[80px]">
      <ManagerHeader />

      {statuses.map((status) => (
        <OrderCategory
          orders={manager.orders.filter((order) => order.status === status)}
          key={status}
          open={manager.statusOpen[status]}
          setOpen={(isOpen) =>
            dispatch(setStatusOpen({ ...manager.statusOpen, [status]: isOpen }))
          }
          name={statusesTitles[status]}
        />
      ))}
    </div>
  );
};

export default ManagerMainPage;
