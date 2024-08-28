import { fetchOrders, Orders } from "../../../store/slices/managerSlice.ts";
import OrderCheck from "./OrderCheck.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect, useState } from "react";
import soundFile from "../../../data/audio/message_sound.mp3";

const CookPage = () => {
  const dispatch = useAppDispatch();
  const orders: Orders[] = useAppSelector((state) => state.manager.orders);
  const companies = useAppSelector((state) => state.user.company_ids);
  const [oldOrders, setOldOrders] = useState(orders);
  const audio = new Audio(soundFile);

  audio.onerror = () => {
    console.error("Ошибка загрузки аудиофайла");
  };

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        dispatch(
          fetchOrders({
            statuses: ["active"],
            company_ids: companies,
          }),
        ),
      5000,
    );
    return () => clearInterval(intervalId);
  }, []);

  const playSound = () => {
    // Создаем элемент (например, кнопку)
    const button = document.createElement("button");
    button.style.display = "none"; // Скрываем кнопку

    // Обработчик клика для воспроизведения звука
    const handleClick = () => {
      alert("Звук");
      audio.play().catch((error) => {
        console.error("Ошибка воспроизведения звука:", error);
      });
    };

    // Вешаем обработчик клика на элемент
    button.addEventListener("click", handleClick);

    // Добавляем элемент на страницу
    document.body.appendChild(button);

    // Симулируем клик по элементу
    button.click();

    // Удаляем обработчик клика
    button.removeEventListener("click", handleClick);

    // Удаляем элемент из DOM
    document.body.removeChild(button);
  };

  useEffect(() => {
    if (oldOrders.length < orders.length) {
      playSound();
      setOldOrders(orders);
    } else {
      setOldOrders(orders);
    }
  }, [orders]);

  return (
    <div
      className={
        "flex h-[100vh] max-h-[100vh] flex-col flex-wrap gap-8 overflow-y-hidden p-4"
      }
    >
      {orders.map((order) => {
        return <OrderCheck key={order.id} order={order} />;
      })}
    </div>
  );
};

export default CookPage;
