export const truncateProductDescription = (description, maxLength) => {
  if (description.length > maxLength)
    return description.substring(0, maxLength);
  return description;
};

export const formatProductCategory = (category) => {
  return category
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

export const formatRentDateTimeFormData = (dateStr) => {
  let date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }
  console.log(date.toISOString());
  return date.toISOString();
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

export const formatRentType = (rentTypeGQLResponse) => {
  if (rentTypeGQLResponse === 'DAILY') return 'per day';
  if (rentTypeGQLResponse === 'WEEKLY') return 'per week';
  if (rentTypeGQLResponse === 'MONTHLY') return 'per month';
  return rentTypeGQLResponse;
};
