export const truncateProductDescription = (description, maxLength) => {
  if (description.length > maxLength)
    return description.substring(0, maxLength);
  return description;
};

export const formatProductCategory = (str) => {
  return str
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatDateTime = (timestamp) => {
  const date = new Date(Number(timestamp));
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};

export const formatProductCategoryFormData = (categories) => {
  return categories.map((category) =>
    category.toUpperCase().replace(/\s+/g, '_')
  );
};

export const formatRentTypeFormData = (rentType) => {
  if (rentType === 'per day') return 'DAILY';
  if (rentType === 'per week') return 'WEEKLY';
  if (rentType === 'per month') return 'MONTHLY';
  return rentType;
};
