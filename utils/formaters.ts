export const formatToCurrency = (amount: number) => {
  const option = {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  };
  const numberFormat = new Intl.NumberFormat('es-CO', option);

  return numberFormat.format(amount);
};
