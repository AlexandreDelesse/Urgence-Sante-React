import React, { useState } from "react";

export default function useDatePickerViewModel() {
  const [ddn, setDdn] = useState("");
  const isoDate = ddn ? new Date(ddn).toISOString() : "";

  const updateDate = (e: any) => setDdn(e.target.value);

  const initDate = (date: string | null) => {
    if (!date) setDdn("");
    else setDdn(date.split("T")[0]);
  };
  return { updateDate, ddn, isoDate, initDate };
}
