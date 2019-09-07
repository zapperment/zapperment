export default () => {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:3001`;
};
