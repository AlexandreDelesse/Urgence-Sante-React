import React from 'react'

export default function JobList({ list, listItem, emptyListMessage }) {
  if (list.length === 0)
    return <div>{emptyListMessage || 'Aucun elements'}</div>
  //FIXME: Gerer le scroll dans un composant scroll component
  return (
    // <div className="scroll-component mission-list">
    <div>{list.map((el) => listItem(el))}</div>
  )
}
