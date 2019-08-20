import React from 'react'

import { connect } from 'react-redux'
import { loggedOutActionCreator } from '../../../state/auth'
import { withRouter } from 'react-router'

import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Button } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

const styles = {
  title: { flexGrow: 1 },
}

const AppBar = (props) => {
  return (
    <div>
      <MuiAppBar color={'default'} position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleSideBar}>
            <MenuIcon />
          </IconButton>

          <Typography
            style={styles.title}
            variant="h6"
          >
            <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
              MusicTripper
            </Link>
          </Typography>
          <Button
            onClick={() => {
              props._logOut()
              props.history.push('/')
            }}
          >
            LOG OUT
          </Button>
          <Link to='/account'>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  _logOut: () => dispatch(loggedOutActionCreator())
})

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AppBar))