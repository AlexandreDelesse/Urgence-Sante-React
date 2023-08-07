import React from 'react'

export default function DateFormatter({ isoDate, dateSpecial, dateToParse }) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const timeOptions = { hour: '2-digit', minute: '2-digit' }

  const dateTimeOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  if (dateSpecial) {
    let [date, time] = dateSpecial.split(' ')
    let [d, m, y] = date.split('/')
    let [h, min, s] = time.split(':')
    return (
      <>{new Date(y, m, d, h, min, s).toLocaleTimeString([], timeOptions)}</>
    )
  }

  if (dateToParse) {
    let time = Date.parse(dateToParse)
    return <>{new Date(time).toLocaleString([], dateTimeOptions)}</>
  }
  return <>{new Date(isoDate).toLocaleDateString('fr', options)}</>
}
