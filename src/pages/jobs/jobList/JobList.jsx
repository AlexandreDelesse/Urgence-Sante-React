import React from "react";

export default function JobList({ list, listItem, emptyListMessage }) {
  if (list.length === 0)
    return <div>{emptyListMessage || "Aucun elements"}</div>;

  return (
    <div className="scroll-component mission-list">
      {list.map((el) => listItem(el))}
    </div>
  );
}
