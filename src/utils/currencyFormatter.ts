const currencyFormatter = (value: number, currency: string = "KZT") => {
  const formatter = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  });

  return formatter.format(value);
};

export default currencyFormatter;
