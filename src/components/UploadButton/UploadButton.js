import React from 'react'

const styles = {
  input: {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  },
  label: {
    fontFamily: 'roboto',
    padding: '10px',
    fontSize: '1.25em',
    fontWeight: '700',
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '5px',
    display: 'inline-block',
    cursor: 'pointer'
  }
}

const UploadButton = props => {
  return (
    <div>
      <div>
        <input type="file" name="file" id="file" style={styles.input} onChange={props.onChange} />
        <label style={styles.label} for="file">Choose a photo</label>

      </div>
    </div>
  )
}

export default UploadButton
