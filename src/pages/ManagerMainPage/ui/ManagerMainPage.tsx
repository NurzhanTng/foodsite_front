import { useState } from "react";
import { useAppSelector } from "../../../store/hooks.ts";
import {
  OrderStatuses,
} from "../../../store/slices/managerSlice.ts";
import ManagerHeader from "../../../features/Headers";
import OrderCategory from "../../../widget/OrderCategory.tsx";
import useManager from "../../../hooks/useManager.ts";

const ManagerMainPage = () => {
  const manager = useAppSelector((state) => state.manager);
  const { statuses, statusesTitles } = useManager();

  const [statusOpen, setStatusOpen] = useState<{
    [key in OrderStatuses]: boolean;
  }>({
    manager_await: false,
    payment_await: false,
    active: false,
    done: false,
    on_delivery: false,
    inactive: false,
  });

  return (
    <div className="px-5 pt-[80px]">
      <ManagerHeader />

      {statuses.map((status) => (
        <OrderCategory
          orders={manager.orders.filter((order) => order.status === status)}
          key={status}
          open={statusOpen[status]}
          setOpen={(isOpen) =>
            setStatusOpen({ ...statusOpen, [status]: isOpen })
          }
          name={statusesTitles[status]}
        />
      ))}
    </div>
  );
};

export default ManagerMainPage;
