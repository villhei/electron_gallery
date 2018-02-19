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
  images: Image[]
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    ipc.requestFiles()
  }
  render() {
    const { images } = this.props
    return (
      <Container fluid style={{ marginTop: '3em' }}>
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column width={4} >
              <Menu />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid columns={16} >
                {images.map((image) => (
                  <Grid.Column width={4} key={image.name}>
                    <ImagePreview {...image} />
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

const mapStateToProps = ({ imageDescriptions }: State) => {
  const images = imageDescriptions.all.map((name => imageDescriptions.byId[name]))
  return {
    images
  }
}

export default connect(mapStateToProps)(App)