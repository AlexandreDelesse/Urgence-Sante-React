import React from 'react'

export default function JobList({ list, listItem, emptyListMessage }) {
  if (list.length === 0)
    return <div className='text-center p-5'>{emptyListMessage || 'Aucun elements'}</div>
  //FIXME: Gerer le scroll dans un composant scroll component
  return (
    // <div className="scroll-component mission-list">
    <div>{list.map((el) => listItem(el))}</div>
  )
}
