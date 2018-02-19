import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import ImagePreview from 'renderer/ImagePreview'
import Menu from 'renderer/Menu'
import { State, Image } from 'renderer/reducer'
import * as ipc from 'renderer/ipc'
import * as iceland from './iceland.jpg'

const range = Array.from(new Array(10)).map((n, i) => i)

export type AppProps = {
  pictures: Image[]
}

class App extends React.Component<AppProps> {

  componentDidMount() {
    ipc.requestFiles()
  }
  render() {
    const { pictures } = this.props
    return (
      <Container fluid style={{ marginTop: '3em' }}>
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column width={4} >
              <Menu />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid columns={16} >
                {pictures.map((picture) => (
                  <Grid.Column width={4}>
                    <ImagePreview {...picture} src={iceland} />
                  </Grid.Column>
                ))}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }
}

const mapStateToProps = ({ pictures }: State) => ({ pictures })

export default connect(mapStateToProps)(App)