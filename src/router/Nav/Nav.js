import React from 'react'

import SideBar from './SideBar'
import AppBar from './AppBar'

class Nav extends React.Component {

  state = {
    isSideBarOpen: false
  }

  toggleSideBar = () => this.setState({
    isSideBarOpen: !this.state.isSideBarOpen
  })

  render() {
    return (
      <div>
        <AppBar toggleSideBar={this.toggleSideBar} />
        <SideBar isSideBarOpen={this.state.isSideBarOpen} toggleSideBar={this.toggleSideBar} />
      </div>
    )
  }
}

export default Nav
