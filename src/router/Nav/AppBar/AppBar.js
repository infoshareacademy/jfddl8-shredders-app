import React from 'react'

import { connect } from 'react-redux'
import { loggedOutActionCreator } from '../../../state/auth'
import { withRouter } from 'react-router'
import { fetchs } from '../../../state/users'

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
  const photo = props._user && props._user.photo

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
            <IconButton >
              {
                photo ?
                  <img
                    style={{ width: 24, height: 24, borderRadius: '50%' }}
                    src={photo}
                    alt={"user_photo"}
                  />
                  :
                  <AccountCircle />
              }
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
            LOG OUT
          </Button>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}

const mapStateToProps = state => ({
  _userId: state.auth.userData.user_id,
  _user: state.users.data
})

const mapDispatchToProps = dispatch => ({
  _logOut: () => dispatch(loggedOutActionCreator()),
  _getUser: (url) => dispatch(fetchs.getAsyncActionCreator(url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppBar))
