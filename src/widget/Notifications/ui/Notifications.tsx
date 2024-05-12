import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import Notification from "./Notification.tsx";
import { useNavigate } from "react-router-dom";
import { setNotifications } from "../../../store/slices/managerSlice.ts";

const Notifications = () => {
  const notifications = useAppSelector((state) => state.manager.notifications);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = (order_id: number) => {
    dispatch(
      setNotifications(
        notifications.filter(
          (notification) => notification.order_id !== order_id,
        ),
      ),
    );
  };

  const handleClick = (order_id: number) => {
    navigate(`/orders/${order_id}`);
    dispatch(
      setNotifications(
        notifications.filter(
          (notification) => notification.order_id !== order_id,
        ),
      ),
    );
  };

  return (
    <div className="l-0 fixed top-0 z-[1000] flex w-[100vw] flex-col gap-4 px-4">
      {notifications.map((notification) => {
        return (
          <Notification
            key={notification.order_id}
            onClick={handleClick}
            onClose={handleClose}
            {...notification}
          />
        );
      })}
    </div>
  );
};

export default Notifications;
