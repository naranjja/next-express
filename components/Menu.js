import { Menu, Container } from "semantic-ui-react"

export default () => (
    <Menu fixed="top">
      <Menu.Item as="a">Item text</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as="a">Item text</Menu.Item>
        <Menu.Item as="a">Item text</Menu.Item>
      </Menu.Menu>
  </Menu>
  )