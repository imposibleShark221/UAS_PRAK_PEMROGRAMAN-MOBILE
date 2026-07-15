/**
 * Currency formatting helpers.
 * KampusMarket displays all prices in Indonesian Rupiah (IDR).
 */

/**
 * Format a number as Indonesian Rupiah, e.g. 8999000 -> "Rp8.999.000".
 * No decimal places are shown since Rupiah is not commonly displayed
 * with cents in everyday app UI.
 * @param {number} amount
 * @returns {string}
 */
export const formatRupiah = (amount) => {
  const value = typeof amount === 'number' ? amount : Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default formatRupiah;