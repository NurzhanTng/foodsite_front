import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks.ts";
import ManagerHeader from "../../../features/Headers";

const OrderPage = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const order = useAppSelector((state) =>
    state.manager.orders.find((order) => order.id === Number(order_id)),
  );

  if (order_id === undefined || order === undefined) {
    navigate("/orders");
    return;
  }

  return (
    <div className="px-5" >
      <ManagerHeader />
    </div>
  );
};

export default OrderPage;
