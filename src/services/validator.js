const nirValidator = (fullNir) => {
  if (!fullNir) return true;
  if (fullNir.length !== 15) return false;

  const nir = fullNir.slice(0, 13);
  const cle = parseInt(fullNir.slice(13));

  const cleCalcule = 97 - (nir % 97);
  if (cle !== cleCalcule) return false;
  return true;
};

export { nirValidator };
