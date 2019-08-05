import React from 'react'

import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const props={
  date: '26.05.2020',
  label: 'Concert description',
  photo: 'https://picsum.photos/id/237/300/200'
}

const styles = {
  listItem: {
    width: '100%',
    height: '100px'
  },
  listItemAvatar: {
    height: '100%',
    width: '150px'
  },
  avatar: {
    height: '100%',
    width: '150px'
  }
  
}

const ListItem = () => (
  <MuiListItem style={styles.listItem}  alignItems="flex-start">
    <ListItemAvatar style={styles.listItemAvatar}>
      {/* <Avatar style={styles.avatar} alt={props.label} src={props.photo} /> */}
    </ListItemAvatar>
    <ListItemText
      primary={props.label}
      secondary={props.date}
    />
  </MuiListItem>

)

export default ListItem