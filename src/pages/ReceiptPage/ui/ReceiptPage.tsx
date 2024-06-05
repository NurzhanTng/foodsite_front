import { ChangeEvent, useState } from "react";
import Input from "../../../shared/Input.tsx";
import Button from "../../../shared/Button.tsx";
import OrderOneLine from "../../OrderPage/ui/OrderOneLine.tsx";

type Receipt = {
  value: number;
  name: string;
}[];

const receipt: Receipt = [
  { value: 2000, name: "красная мука" },
  { value: 2000, name: "обычная мука" },
  { value: 2500, name: "холодная вода" },
  { value: 50, name: "дрожжи" },
  { value: 400, name: "вода" },
  { value: 75, name: "соль" },
  { value: 75, name: "оливковое масло" },
];

const ReceiptPage = () => {
  const [needed, setNeeded] = useState<number | "">(0);
  const [have, setHave] = useState<number | "">(0);
  const [proportions, setProportions] = useState<Receipt | null>(null);
  const [error, setError] = useState<string>("");

  const handleNeededInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setNeeded("");
    const value = parseFloat(e.target.value);
    if (value < 0) {
      setNeeded(0);
    } else {
      setNeeded(value);
    }
  };

  const handleHaveInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setHave("");
    const value = parseFloat(e.target.value);
    if (value < 0) {
      setHave(0);
    } else {
      setHave(value);
    }
  };

  const calculateProportions = () => {
    if (needed === "" || needed <= 0) {
      setError(
        "Введите корректное количество грамм необходимого теста. Оно должно быть больше 0",
      );
      setProportions(null);
      return;
    }
    if (have === "" || have < 0) {
      setError(
        "Введите корректное количество грамм имеющегося теста. Оно не должно быть пустым",
      );
      setProportions(null);
      return;
    }
    if (needed <= have) {
      setError("Необходимый вес теста должен превышать вес имеющегося теста");
      setProportions(null);
      return;
    }
    const sumWeight = receipt.reduce(
      (prev, current) => prev + current.value,
      0,
    );
    const newProportion = [];
    for (const receiptElement of receipt) {
      newProportion.push({
        name: receiptElement.name,
        value: ((needed - have) * receiptElement.value) / sumWeight,
      });
    }
    setProportions(newProportion);
  };

  return (
    <div className="mx-[20px] flex flex-col gap-3">
      <h2 className="mb-[20px] mt-8 block text-base font-normal leading-none text-white">
        Введите начальные данные
      </h2>

      <Input
        label={"Сколько грамм теста осталось"}
        type={"number"}
        value={have}
        onChange={handleHaveInput}
      />
      <Input
        label={"Сколько грамм теста надо"}
        type={"number"}
        value={needed}
        onChange={handleNeededInput}
      />
      <Button onClick={calculateProportions} text="Посчитать" />

      {error && (
        <h2 className="mb-[20px] block text-balance text-base font-normal leading-none text-error">
          {error}
        </h2>
      )}

      {proportions && (
        <h2 className="mb-[20px] mt-[30px] block text-base font-normal leading-none text-white">
          Что необходимо использовать
        </h2>
      )}

      {proportions &&
        proportions.map((proportion) => {
          return (
            <OrderOneLine
              key={proportion.name}
              title={proportion.name}
              description={`${Math.floor(proportion.value)}гр`}
              descriptionClassName="text-button"
            />
          );
        })}
    </div>
  );
};

export default ReceiptPage;
