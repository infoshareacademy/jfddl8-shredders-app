import React from 'react';
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const options = ['All Genres ', 'Rock', 'Pop', 'Disco-Polo', 'Jazz', 'Hip-Hop'];

function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClick() {
    alert(`You clicked ${options[selectedIndex]}`);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
    const selectedValue = options[index]
    const value = selectedValue !== 'All' ? selectedValue : ''
    props.onChangeHandler({
      target: {
        value
      }
    })
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <div>

      <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button" >
        <Button onClick={handleClick}>{props.value || options[0]}</Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (

          <Paper id="menu-list-grow" style={{ zIndex: 100 }} >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === selectedIndex}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>

        )}
      </Popper>

    </div>
  );
}

SplitButton.propTypes = {

  value: PropTypes.string,
  onChangeHandler: PropTypes.func

}

SplitButton.deafaultProps = {

  value: '',
  onChangeHandler: () => { }

}

export default SplitButton