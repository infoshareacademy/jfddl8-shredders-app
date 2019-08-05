import React from 'react'

import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'



const AppBar = (props) => {
  return (
    <div>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleSideBar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            MusicTripper
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}

export default AppBar