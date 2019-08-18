import React from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'

const styles = {
  textField: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30',
    margin: '0 auto',
    maxWidth: '600px'
  }
}

const TextField = (props) => {
  const { error, helperText, value, label,
    onBlur, changeHandler, select } = props

  return (
    < MuiTextField
      select={select}
      style={styles.textField}
      error={error}
      fullWidth
      multiline
      helperText={helperText}
      label={label}
      margin={'normal'}
      onChange={changeHandler}
      onBlur={onBlur}
      value={value}
    />
  )
}

TextField.propTypes = {
  changeHandler: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  value: PropTypes.string,
}

TextField.defaultProps = {
  changeHandler: () => { },
  error: false,
  helperText: '',
  label: '',
  onBlur: () => { },
  value: ''
}

export default TextField
