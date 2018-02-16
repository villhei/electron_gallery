import * as React from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

const AppMenu = () => {
  return (
    <Menu vertical>
      <Menu.Item name='inbox' active={false} onClick={this.handleItemClick}>
        <Label color='teal'>1</Label>
        Inbox
      </Menu.Item>

      <Menu.Item name='spam' active={false} onClick={this.handleItemClick}>
        <Label>51</Label>
        Spam
      </Menu.Item>

      <Menu.Item name='updates' active={false} onClick={this.handleItemClick}>
        <Label>1</Label>
        Updates
      </Menu.Item>
      <Menu.Item>
        <Input icon='search' placeholder='Search mail...' />
      </Menu.Item>
    </Menu>)
}

export default AppMenu