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
import { FacebookShareButton } from 'react-share'
import ShareIcon from '@material-ui/icons/Share'

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

          {document.body.clientWidth > 400 ?
            <Typography
              style={styles.title}
              variant="h6"
            >
              <Link to='/' style={{ textDecoration: 'none', color: 'black', lineHeight: 1 }}>
                Music Tripper
            </Link>
            </Typography>
            :
            <Typography
              style={styles.title}
              variant="h6"
            >
            </Typography>
          }
          <Link to='/account'>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Link>
          <IconButton style={{ width: 48, height: 48 }} >
            <FacebookShareButton url={'http://app.music-tripper.jfddl8.is-academy.pl/'}>
              <ShareIcon />
            </FacebookShareButton>
          </IconButton>
          <Button
            onClick={() => {
              props._logOut()
              props.history.push('/')
            }}
          >
            Wyloguj
          </Button>
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
