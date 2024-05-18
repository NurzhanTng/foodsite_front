import { useAppSelector } from "../../../store/hooks/hooks.ts";
import { useNavigate } from "react-router-dom";
import Header from "../../../entities/Header.tsx";
import OrderOneLine from "../../OrderPage/ui/OrderOneLine.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";
import Button from "../../../shared/Button.tsx";
import useManager from "../../../hooks/useManager.ts";
import useCart from "../../../hooks/useCart.ts";
import { setCart } from "../../../store/slices/mainSlice.ts";
import { setUserData } from "../../../store/slices/orderSlice.ts";
import { useDispatch } from "react-redux";

const ClientOrderPage = () => {
  const { from, order } = useAppSelector((state) => state.clientOrder);
  const { statusesText } = useManager();
  const { getProductById } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const sumOneOrderProduct = (order: Orders, product: Product) => {
  //   if (!product) return 0;
  //
  //   let price = 0;
  //   if (
  //     order.products
  //     product.price === null ||
  //     product.price === undefined ||
  //     product.price === 0 ||
  //     product.modifiers.length !== 0
  //   ) {
  //     if (orderProduct.active_modifier !== null) {
  //       price =
  //         orderProduct.product.modifiers.find(
  //           (modifier) => modifier.id === orderProduct.active_modifier
  //         )?.price || 0;
  //     }
  //   } else {
  //     price = orderProduct.product.price;
  // }

  const handleRepeatButton = () => {
    console.log("handleRepeatButton", order);
    if (order === null) return;

    dispatch(
      setCart(
        order.products.map((order) => {
          const product = getProductById(order.product_id);
          const additions = product?.additions.filter((addition) =>
            order.additions.includes(addition.id),
          );
          console.log({
            product: product,
            active_modifier: order.active_modifier,
            additions: additions === undefined ? [] : additions,
            amount: order.amount,
            client_comment: order.client_comment,
          });

          return {
            product: product,
            active_modifier: order.active_modifier,
            additions: additions === undefined ? [] : additions,
            amount: order.amount,
            client_comment: order.client_comment,
          };
        }),
      ),
    );
    dispatch(
      setUserData({
        telegram_id: order.client_id,
        telegram_fullname: order.user_name,
        phone: order.phone,
        kaspi_phone: order.kaspi_phone,
        bonus: 0,
        address: order.address,
        exact_address: order.exact_address,
      }),
    );
    navigate(`/?telegram_id=${order.client_id}`);
  };

  const handleBackButton = () => {
    navigate(from);
  };

  return (
    <div>
      <Header className="flex h-[50px] flex-row justify-between gap-3 px-5 text-center">
        <p className="mx-auto my-auto h-fit">MonoPizza</p>
      </Header>

      <div className="px-5">
        <div
          className={`my-5 mt-[100px] h-fit w-full text-base font-normal leading-none text-white transition-all`}
        >
          <div
            className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
          >
            <h2 className=" leading-non block text-base font-normal text-white">
              Заказ № {order?.id}
            </h2>
            <p
              className={`my-auto h-fit pl-4 text-center text-sm font-normal leading-none text-button`}
            >
              {
                statusesText[
                  order?.status === undefined ? "manager_await" : order?.status
                ]
              }
            </p>
          </div>

          <div className="flex w-full flex-col gap-2">
            {order?.products.map((element, index) => {
              const product = getProductById(
                element.product_id ? element.product_id : -1,
              );

              if (product === undefined) return <div />;

              return (
                <div
                  className={`${index === order?.products.length - 1 ? "" : "border-b"} flex flex-row gap-5 border-secondary py-5`}
                >
                  <div /* Element image */
                    style={{
                      backgroundImage: `url(${product?.image_url})`,
                    }}
                    className="min-h-[100px] min-w-[100px] rounded-[10px] bg-cover bg-center"
                  />

                  <div
                    /* Element main */ className="relative flex min-h-[100px] w-full flex-col"
                  >
                    <h4 /* Element name */
                      className="line-clamp-2 text-base font-normal text-white"
                    >
                      {product?.name}
                    </h4>

                    <p /* Element description */
                      className="line-clamp-1 text-sm font-medium leading-tight text-textSecondary"
                    >
                      {
                        product?.modifiers.find(
                          (modifier) => modifier.id === element.active_modifier,
                        )?.name
                      }
                    </p>

                    <p /* Element additions */
                      className="mb-2 line-clamp-1 text-sm font-medium leading-tight text-textSecondary"
                    >
                      {product.additions
                        .filter((addition) =>
                          element.additions.includes(addition.id),
                        )
                        .map((addition) => addition.name)
                        .join(", ")}
                    </p>

                    <div className="flex w-fit flex-col-reverse justify-between gap-2 sm-s:w-full sm-s:flex-row">
                      <p /* Element cost */
                        className="my-auto w-fit text-base text-button "
                      >
                        {currencyFormatter(element.price ? element.price : 0)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`my-5 h-fit w-full text-base font-normal leading-none text-white transition-all`}
        >
          <div
            className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
          >
            <h2 className=" leading-non block text-base font-normal text-white">
              Описание
            </h2>
          </div>
          <div className="flex w-full flex-col gap-2">
            <OrderOneLine
              title="Время оформления"
              description={
                new Date(order?.created_at || "")
                  .getHours()
                  .toString()
                  .padStart(2, "0") +
                ":" +
                new Date(order?.created_at || "")
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")
              }
            />
            <OrderOneLine
              title="Время готовности"
              description={
                order?.done_time === null || order?.done_time === "00:00"
                  ? "Как можно скорее"
                  : order?.done_time
              }
            />
            <OrderOneLine title="Номер клиента" description={order?.phone} />
            {order?.is_delivery && (
              <OrderOneLine
                title="Доставка"
                description={`${order?.address?.parsed} ${order?.exact_address}`}
              />
            )}
            <OrderOneLine
              title="Адрес"
              description={
                (order?.address?.parsed === undefined
                  ? `${order?.address?.lat} ${order?.address?.long}`
                  : order?.address?.parsed) + ""
              }
            />
            <OrderOneLine
              title="Комментарий"
              description={
                order?.client_comment === null ? "" : order?.client_comment
              }
            />
          </div>
        </div>

        <div
          className={`my-5 h-fit w-full text-base font-normal leading-none text-white transition-all`}
        >
          <div
            className={`relative mb-5 flex w-[calc(100vw-40px)] flex-row justify-between`}
          >
            <h2 className=" leading-non block text-base font-normal text-white">
              Оплата
            </h2>
          </div>

          <div className="flex w-full flex-col gap-2">
            <OrderOneLine title="Номер каспи" description={order?.phone} />

            <OrderOneLine
              title="Стоимость заказа"
              description={order?.products.reduce(
                (accumulator, currentValue) => {
                  return (
                    accumulator +
                    (currentValue.price === null ? 0 : currentValue.price)
                  );
                },
                0,
              )}
            />
          </div>
        </div>

        <Button
          className="mt-5 w-full"
          styleType="outline"
          text="Открыть"
          onClick={handleRepeatButton}
        />

        <Button
          className="mb-[30px] mt-5 w-full"
          styleType="outline"
          text="Назад"
          onClick={handleBackButton}
        />
      </div>
    </div>
  );
};

export default ClientOrderPage;
