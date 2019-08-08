import React from 'react';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import ListItem from '../List/ListItem';

class ListItemWithDialog extends React.Component {
  state = {
    dialogOpen: false
  }

  toggleDialog = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen })
  }

  render() {
    return (
      <div>
        <ListItem
          data={this.props.data}
          onClick={this.toggleDialog}
        />
        <MuiDialog
          onClose={this.toggleDialog}
          aria-labelledby="customized-dialog-title"
          open={this.state.dialogOpen}
        >
          something
        </MuiDialog>
      </div>
    );
  }
}

export default ListItemWithDialog