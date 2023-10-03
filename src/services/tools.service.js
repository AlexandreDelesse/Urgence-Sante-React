const formattedTime = (isoDate) => {
  if (!isoDate)
    return new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return new Date(isoDate).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export { formattedTime };
