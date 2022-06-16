import { useEffect, useState } from "react";

export default function useVehiculeFilter({ list, filters }) {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (!filters) setFilteredList(list);
    else
      setFilteredList(
        list.filter(
          (el) =>
            (!filters.type || el.type === filters.type) &&
            (el.name.toLowerCase().includes(filters.name.toLowerCase()) ||
              el.immat.toLowerCase().includes(filters.name.toLowerCase()))
        )
      );
  }, [filters, list]);

  return filteredList;
}
