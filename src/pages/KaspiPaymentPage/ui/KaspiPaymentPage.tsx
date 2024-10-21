import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";

import { clearState as mainSliceClear } from "../../../store/slices/mainSlice.ts";
import { clearState as companySliceClear } from "../../../store/slices/companySlice.ts";
import { clearState as clientOrderSliceClear } from "../../../store/slices/clientOrderSlice.ts";
import { clearState as managerSliceClear } from "../../../store/slices/managerSlice.ts";
import { clearState as orderSliceClear } from "../../../store/slices/orderSlice.ts";
import { deleteAllTimers as timerSliceClear } from "../../../store/slices/timerSlice.ts";
import { clearState as userSliceClear } from "../../../store/slices/userSlice.ts";

type PaymentStatus = {
  order_id: string;
  process_id: string;
  status: string;
  qr_link: string;
  price: number;
};

const KaspiPaymentPage: React.FC = () => {
  const [qrLink, setQrLink] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const orderId = useAppSelector((state) => state.main.orderId);

  useEffect(() => {
    if (orderId === null) return;

    const fetchPaymentStatus = async () => {
      try {
        console.log(
          `fetch payment status: ${
            import.meta.env.VITE_REACT_APP_API_BASE_URL +
            `food/newPayment/${orderId}/`
          }`,
        );
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_API_BASE_URL +
          `food/newPayment/${orderId}/`,
        );

        if (!response.ok) {
          throw new Error("Ошибка сети или сервера");
        }

        const data: PaymentStatus = await response.json();
        console.log(data);

        // Проверка, что получены нужные данные
        if (data && data.qr_link) {
          setQrLink(data.qr_link);
        }
      } catch (error) {
        console.error("Ошибка при запросе статуса оплаты:", error);
      }
    };

    const interval = setInterval(fetchPaymentStatus, 1000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    if (qrLink) {
      dispatch(mainSliceClear());
      dispatch(companySliceClear());
      dispatch(clientOrderSliceClear());
      dispatch(managerSliceClear());
      dispatch(orderSliceClear());
      dispatch(timerSliceClear());
      dispatch(userSliceClear());
    }
  }, [dispatch, qrLink]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-semibold">Сохранение заказа</p>
        {!qrLink ? (
          <p className="text-gray-500">Ожидание...</p>
        ) : (
          <>
            <p className="text-green-500 mb-4">Заказ сохранен. Нажмите на кнопку ниже для оплаты через Kaspi:</p>
            <a
              href={`https://pay.kaspi.kz/pay/${qrLink}`}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Открыть в Kaspi
            </a>
            <a
              href={`kaspikz://pay/${qrLink}`}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Открыть в Kaspi 2
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default KaspiPaymentPage;
