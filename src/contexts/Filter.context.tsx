import { Dispatch, SetStateAction, createContext } from "react";

interface IFilterContext {
  showPastMission: boolean;
  setShowPastMission: Dispatch<SetStateAction<boolean>>;
}

const defaultValue = {
  showPastMission: false,
  setShowPastMission: () => {},
};

const FilterContext = createContext<IFilterContext>(defaultValue);

export default FilterContext;
