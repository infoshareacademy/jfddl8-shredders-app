import React from 'react'
import { IconButton } from '@material-ui/core';

import beforeIcon from './navigate_before.svg'
import nextIcon from './navigate_next.svg'

const styles = {
  panelButton: {
    margin: 5,
    width: 20
  },
  panel: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const PaginationPanel = props => {
  const pages = []
  for (let i = 1; i <= props.paginationLength; i++) {
    pages.push(i)
  }

  return (
    <div style={styles.panel}>
      <IconButton
        disabled={props.currentPage === 0 ? true : false}
        style={{ opacity: props.currentPage === 0 ? 0.2 : 0.6 }}
        size='small'
        onClick={() => props.changePage(props.currentPage - 1)}
      >
        <img src={beforeIcon} alt={'before'} />
      </IconButton>

      {pages
        .filter((el) => el > props.currentPage - 2 && el < props.currentPage + 4)
        .map(el => (
          <IconButton
            key={el}
            size='small'
            color={el - 1 === props.currentPage ? 'primary' : 'default'}
            onClick={() => props.changePage(el - 1)}
            style={styles.panelButton}
          >
            {el}
          </IconButton>
        ))}

      <IconButton
        disabled={props.currentPage >= props.paginationLength - 1 ? true : false}
        style={{ opacity: props.currentPage >= props.paginationLength - 1 ? 0.2 : 0.6 }}
        size='small'
        onClick={() => props.changePage(props.currentPage + 1)}
      >
        <img src={nextIcon} alt={'next'} />
      </IconButton>
    </div>
  )
}

export default PaginationPanel