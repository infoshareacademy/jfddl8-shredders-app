import React from 'react'

import ListItem from './ListItem'

const List = props => {
  return (
    <div>
      {props.data.map(data => (
        <ListItem key={data.key} data={data} />
      ))}
    </div>
  )
}

export default List