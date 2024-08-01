const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const truncateMessage = (message, maxLength) => {
  if (message.length <= maxLength) {
    return message;
  }
  return message.slice(0, maxLength) + "...";
};

export { formatDate, truncateMessage };
