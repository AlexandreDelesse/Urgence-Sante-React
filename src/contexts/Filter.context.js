import { createContext } from "react";

const defaultValue = {
  showPastMission: false, 
  setShowPastMission: () => {}
};

const FilterContext = createContext(defaultValue);

export default FilterContext;
