import React from 'react'
import { Button } from '@material-ui/core';

const styles = {
  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '1',
    cursor: 'pointer',
    opacity: 0

  },
  label: {
    fontSize: '1em',
    fontWeight: '700',
    color: 'white',
    display: 'inline-block',
    cursor: 'pointer'
  },
  button: {
    width: 250
  }
}

const UploadButton = props => {
  return (
    <div>
      <div>
        <label style={styles.label} htmlFor="file">
          <Button style={styles.button} variant={'contained'} color={'primary'}>
            <input type="file" name="file" id="file" style={styles.input} onChange={props.onImageChange} />
            Wybierz zdjęcie profilowe
          </Button>
        </label>
      </div>
    </div>
  )
}

export default UploadButton
