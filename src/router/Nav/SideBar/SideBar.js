import React from 'react'

import { Drawer } from '@material-ui/core'
import SideBarItem from './SideBarItem'

const styles = {
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 89,
    width: '100%',
    background: '#666894'
  },
  innerDrawer: {
    width: 200,
    textAlign: 'center'
  }
}

const SideBar = props => (
  <Drawer
    open={props.isSideBarOpen}
    onClose={props.toggleSideBar}
  >
    <div style={styles.innerDrawer}>
      <div style={styles.menu}>
        <img style={{ maxHeight: 75 }} src="https://i.ibb.co/rmsqMWV/logo-Music-Tripper1.png" alt="Music-Tripper" border="0" />
      </div>
      <SideBarItem
        to={'/Dashboard'}
        label={'Strona główna'}
        toggleSideBar={props.toggleSideBar}
      />
      <hr />
      <SideBarItem
        to={'/add-form'}
        label={'Dodaj koncert'}
        toggleSideBar={props.toggleSideBar}
      />
      <hr />
      <SideBarItem
        to={'/concerts-list'}
        label={'Lista koncertów'}
        toggleSideBar={props.toggleSideBar}
      />
      <hr />
    </div>
  </Drawer>
)



export default SideBar
