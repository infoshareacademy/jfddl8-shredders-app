import React from 'react'

import { Drawer } from '@material-ui/core'
import SideBarItem from './SideBarItem'

const styles = {
  innerDrawer: {
    width: 200
  }
}

const SideBar = props => (
  <Drawer
    open={props.isSideBarOpen}
    onClose={props.toggleSideBar}
  >
    <div style={styles.innerDrawer}>
      <SideBarItem
        to={'/add-form'}
        label={'Add Form'}
        toggleSideBar={props.toggleSideBar}
      />
      <SideBarItem
        to={'/concerts-list'}
        label={'Concerts List'}
        toggleSideBar={props.toggleSideBar}
      />
    </div>
  </Drawer>
)



export default SideBar
