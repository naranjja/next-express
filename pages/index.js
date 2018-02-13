import Link from "next/link"
import Head from "next/head"
import { Container, Segment } from "semantic-ui-react"
import Button from "./../components/Button"
import Menu from "./../components/Menu"
import Break from "./../components/Break"

export default () => (
  <div>
    <Head>
      <title>Title</title>
      <meta charset="utf-8"/>
      <meta http-equiv="X-YA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <link rel="stylesheet" href="/modules/semantic-ui-css/semantic.min.css" />
    </Head>
        <Menu />
        <Break />
        <Container>
            <Segment>
                <Button />
            </Segment>
        </Container>
  </div>
)