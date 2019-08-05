import React from 'react'
import { Link } from 'react-router-dom'

import { ListItem, ListItemText } from '@material-ui/core'

const SideBarItem = (props) => {
  return (
    <Link to={props.to} style={{ textDecoration: 'none', color: 'black' }} onClick={props.toggleSideBar}>
      <ListItem button={true}>
        <ListItemText primary={props.label} />
      </ListItem>
    </Link>
  )
}

export default SideBarItem