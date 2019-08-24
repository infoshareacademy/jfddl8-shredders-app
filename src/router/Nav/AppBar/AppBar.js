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
  appBar: {
    display: 'flex',
    justifyContent: 'center',
    background: 'radial-gradient(circle, rgba(81,67,110,1) 10%, rgba(102,104,148,1) 72%, rgba(120,137,182,1) 88%, rgba(120,137,182,1) 89%, rgba(137,167,212,1) 98%, rgba(148,187,233,1) 100%)',
    height: 80,
    borderRadius: '4px'
  },
  img: { maxWidth: 30, maxHeight: 30, height: '100%', width: '100%', borderRadius: '50%', objectFit: 'cover', overflow: 'hidden' }
}


const AppBar = (props) => {
  const photo = props._user && props._user.photo

  return (
    <div>
      <MuiAppBar style={styles.appBar} position="static">
        <Toolbar>
          <IconButton edge="start" style={{ color: 'black' }} aria-label="menu" onClick={props.toggleSideBar}>
            <MenuIcon />
          </IconButton>

          {document.body.clientWidth > 570 ?
            <Typography
              style={styles.title}
              variant="h5"
            >
              <Link to='/' style={{ textDecoration: 'none', color: 'black', lineHeight: 1 }}>
                <img style={{ height: 40, width: 300 }} src="https://i.ibb.co/rZWyVsC/Music-Tripper.png" alt="Music-Tripper" border="0" />
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
                    style={styles.img}
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
            Wyloguj
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
