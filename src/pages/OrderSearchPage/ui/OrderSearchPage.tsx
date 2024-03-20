import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Orders, OrderStatuses } from "../../../store/slices/managerSlice";
import SearchOrderHeader from "../../../features/Headers/ui/SearchOrderHeader.tsx";
import { useAppSelector } from "../../../store/hooks.ts";
import OrderSmall from "../../../features/OrderSmall";
import FilterPopup from "../../../features/Popups/ui/FilterPopup.tsx";

export type FilterState = {
  searchTerm: "id" | "phone";
  termValue: string;
  searchStatuses: OrderStatuses[];
};

const filterOrder = (order: Orders, filter: FilterState) => {
  if (filter.searchTerm === "id") {
    return (
      String(order.id).includes(filter.termValue) &&
      filter.searchStatuses.includes(order.status)
    );
  } else if (filter.searchTerm === "phone") {
    return (
      String(order.phone).includes(filter.termValue) &&
      filter.searchStatuses.includes(order.status)
    );
  } else {
    return true;
  }
};

const OrderSearchPage = () => {
  const navigate = useNavigate();
  const orders = useAppSelector((state) => state.manager.orders);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [filter, setFilter] = useState<FilterState>({
    searchTerm: "phone",
    termValue: "",
    searchStatuses: [
      "manager_await",
      "payment_await",
      "active",
      "done",
      "on_delivery",
      "inactive",
    ],
  });

  const filteredOrders = useMemo(
    () => orders.filter((order) => filterOrder(order, filter)),
    [orders, filter],
  );

  return (
    <div>
      <FilterPopup
        show={showPopup}
        filter={filter}
        setFilter={setFilter}
        toggleShow={() => setShowPopup(!showPopup)}
      />
      <SearchOrderHeader
        leftIconShow={true}
        filter={filter}
        setTermValue={(value: string) =>
          setFilter({ ...filter, termValue: value })
        }
        iconOnClick={() => navigate("/orders")}
        onSearchButtonClick={() => setShowPopup(true)}
      />
      <div className="mt-[120px] px-[20px]">
        {filteredOrders.map((order) => (
          <OrderSmall additionalText={true} key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderSearchPage;
