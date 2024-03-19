import SelectCard from "../entities/SelectCard.tsx";
import Icon from "../shared/Icon";
import OrderSmall from "../features/OrderSmall";
import { Orders } from "../store/slices/managerSlice.ts";

type OrderCategoryProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  orders: Array<Orders>;
  name: string;
};

const OrderCategory = ({
  open,
  setOpen,
  orders,
  name,
}: OrderCategoryProps) => {
  return (
    <div>
      <SelectCard
        onClick={() => setOpen(!open)}
        className="mb-5 pl-[30px]"
        borderBottom={true}
        name={name}
      >
        <div className="absolute left-[4px] top-[16px] h-[15px] w-[15px] rounded-[100px] bg-blue-500 text-center text-[10px] font-bold leading-[15px] text-white">
          {orders.length}
        </div>
        <Icon className="my-auto h-5 w-5" type={open ? "list" : "arrowDown"} />
      </SelectCard>
      {open &&
        orders.map((order) => (
          <OrderSmall key={order.id} order={order} />
        ))}
    </div>
  );
};

export default OrderCategory;
