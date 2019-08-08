import React from 'react'

import MuiListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'


const ListItem = props => {
  return (
    <div onClick={props.onClick} className={'listItem'}>
      <MuiListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="concert" src="http://lorempixel.com/200/200" />
        </ListItemAvatar>
        <ListItemText
          primary={props.data.band}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ display: 'inline' }}
              >
                {props.data.location}
              </Typography>
              {' — ' + props.data.date}
            </React.Fragment>
          }
        />
      </MuiListItem>
      <Divider variant="inset" component="div" />

    </div>
  )
}

export default ListItem