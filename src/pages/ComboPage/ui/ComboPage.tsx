import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import { useEffect, useState } from "react";
import { OrderProduct, Product } from "../../../utils/Types.ts";
import ComboElement from "./ComboElement.tsx";
import ComboElementPopup from "./ComboElementPopup.tsx";
import Button from "../../../shared/Button.tsx";
import currencyFormatter from "../../../utils/currencyFormatter.ts";

const ComboPage = () => {
  const navigate = useNavigate();
  const { action_id } = useParams();
  const comboAction = useAppSelector((state) =>
    state.loyalty.actions.find(
      (action) => action.id === parseInt(action_id ? action_id : ""),
    ),
  );
  const products = useAppSelector((state) =>
    state.main.categories.reduce((products: Product[], category) => {
      return [...products, ...category.products];
    }, []),
  );
  const [showPopup, setShowPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>(
    (
      comboAction?.triggers[0].product_lists?.map((list) =>
        Array.isArray(list) ? list[0] : list,
      ) || []
    )
      .map((product_id) =>
        products.find((product) => product.id === product_id),
      )
      .filter((product): product is Product => product !== undefined)
      .map((product): OrderProduct => {
        return {
          product: product,
          active_modifier:
            product.price === null || product.price === 0
              ? product.modifiers[0].id
              : null,
          additions: [],
          price: 0,
          amount: 1,
          client_comment: "",
        };
      }),
  );

  const handleOrderProductChange = (orderProduct: OrderProduct) => {
    console.log("handleOrderProductChange");
    setSelectedProducts(
      selectedProducts.map((product, index) =>
        index === activeIndex ? orderProduct : product,
      ),
    );
    setShowPopup(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (
    comboAction === undefined ||
    comboAction.triggers[0].product_lists === undefined
  ) {
    navigate("/menu");
    return;
  }

  const getOrderProductsForPopup = (): Product[] => {
    if (comboAction.triggers[0].product_lists === undefined) return [];
    const productIdsToChoose =
      comboAction.triggers[0].product_lists[activeIndex];
    if (!Array.isArray(productIdsToChoose))
      return products.filter((product) => product.id === productIdsToChoose);
    return products.filter((product) =>
      productIdsToChoose.includes(product.id),
    );
  };

  const handleAddComboToOrder = () => {};

  return (
    <div className="relative mb-[90px] min-h-[calc(100vh-90px)]">
      <ComboElementPopup
        onClick={handleOrderProductChange}
        show={showPopup}
        selectedOrderProduct={selectedProducts[activeIndex]}
        allProducts={getOrderProductsForPopup()}
      />

      {/* Кнопка назад */}
      <div
        onClick={() => navigate("/menu")}
        className="fixed left-[20px] top-[15px] z-20 rounded-full px-[16px] py-[11px] text-xl backdrop-blur backdrop-filter"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      {/* Картинка блюда */}
      <div
        style={{ backgroundImage: `url(${comboAction.image_url})` }}
        className="mb-5 h-[300px] bg-buttonSecondary2 bg-cover bg-center shadow-image"
      />

      {/* Внешний контейнер */}
      <div className="px-3">
        {/* Описание блюда */}
        <h4 className="mb-3 text-base font-bold text-white">
          {comboAction.name}
        </h4>
        <p className="mb-6 text-xs text-fontSecondary">
          {comboAction.description}
        </p>

        {selectedProducts.map((element, index) => (
          <ComboElement
            key={index}
            element={element}
            index={index}
            comboAction={comboAction}
            setSelectedProducts={(index) => {
              setActiveIndex(index);
              setShowPopup(true);
            }}
          />
        ))}

        <div className="fixed bottom-0 left-0 flex w-full flex-row justify-between gap-4 border-t-2 border-t-buttonSecondary2 bg-bgColor px-6 py-3 align-middle">
          <p className="my-auto text-button">
            {currencyFormatter(
              (comboAction.payloads[0].new_price || 0) +
                selectedProducts.reduce(
                  (sum, product) =>
                    sum +
                    product.additions.reduce(
                      (addSum, addition) => addSum + addition.price,
                      0,
                    ),
                  0,
                ),
            )}
          </p>
          <Button
            onClick={handleAddComboToOrder}
            className="py-2 text-sm"
            text={`Добавить`}
          />
        </div>
      </div>
    </div>
  );
};

export default ComboPage;
