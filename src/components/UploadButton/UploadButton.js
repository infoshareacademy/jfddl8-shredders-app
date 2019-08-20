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
    padding: '12px',
    fontSize: '1em',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#404ac2',
    borderRadius: '5px',
    display: 'inline-block',
    cursor: 'pointer'
  }
}

const UploadButton = props => {
  return (
    <div>
      <div>
        <input type="file" name="file" id="file" style={styles.input} onChange={props.onImageChange} />
        <label style={styles.label} htmlFor="file">Choose your photo</label>
      </div>
    </div>
  )
}

export default UploadButton
