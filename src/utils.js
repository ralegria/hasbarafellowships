export const currency = (amount) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export const toCents = (amount) => Math.floor(Number(amount) * 100);

export const fromCents = (amount) => Number(amount) / 100;
