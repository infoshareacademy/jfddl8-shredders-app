import React from 'react'
import MuiDialog from '@material-ui/core/Dialog'
import ListItem from '../List/ListItem'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { FormControlLabel, Checkbox } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    margin: 'auto',
    maxWidth: 500,
    position: 'relative'
  },
  image: {
    width: 180,
    height: 180,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  favoriteDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: -10
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: -10,
  },
  favorite: {
    margin: 0
  }
}

const ListItemWithDialog = (props) => {

  return (
    <div>
      <Link to={'/concerts-list/' + props.data.key} style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem
          data={props.data}
        />
      </Link>

      <MuiDialog
        aria-labelledby="customized-dialog-title"
        open={props.data.key === props.match.params.concertKey}
        onClose={() => { props.history.push('/concerts-list') }}
      >

        <Paper style={styles.paper}>
          <div style={styles.favoriteDiv}>
            <FormControlLabel style={styles.favorite}
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}
            />
            <IconButton onClick={() => props.history.push('/concerts-list')}>
              <CloseIcon />
            </IconButton>
          </div>

          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase style={styles.image}>
                <img style={styles.img} alt="concert" src="http://lorempixel.com/200/200" />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {props.data.band}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.data.location} - {props.data.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {props.data.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{props.data.ticketPrice + 'ZŁ'}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <div style={styles.buttonDiv}>
            <Button
              color={'secondary'}
              variant={"contained"}
              onClick={() => {
                props.deleteConcert(props.data.key)
                  .then(() => props.history.push('/concerts-list'))
              }}
            >
              Remove
            </Button>
          </div>
        </Paper>

      </MuiDialog>

    </div>
  )
}

export default withRouter(ListItemWithDialog)