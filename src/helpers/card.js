export const trimDate = (time) => {
  const regex = /(\d{4}-\d{2}-\d{2})/;
  return time.match(regex)[1];
};
