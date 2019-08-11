import React from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'


const TextField = (props) => {
  const { value, label, changeHandler, handleKeyDown } = props
  return (
    <MuiTextField
      value={value}
      label={label}
      margin={'normal'}
      fullWidth
      onChange={changeHandler}
      onKeyDown={handleKeyDown}

    />
  )
}

TextField.propTypes = {
  changeHandler: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  handleKeyDown: PropTypes.func,
}

TextField.defaultProps = {
  label: '',
  value: '',
  handleKeyDown: () => { },
  changeHandler: () => { },
}

export default TextField
