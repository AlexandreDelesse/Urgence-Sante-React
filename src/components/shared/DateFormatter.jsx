import React from "react";

export default function DateFormatter({ isoDate }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return <>{new Date(isoDate).toLocaleDateString("fr", options)}</>;
}
