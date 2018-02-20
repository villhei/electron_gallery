import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import Menu from 'renderer/Menu'
import Gallery from 'renderer/Gallery'
import ImageView from 'renderer/ImageView'
import { State } from 'renderer/reducer'
import * as ipc from 'renderer/ipc'
import { Path, isFile, isDirectory } from 'main/fileUtils'
import * as iceland from './iceland.jpg'

const range = Array.from(new Array(10)).map((n, i) => i)

export type AppProps = {
  path: Path | null
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    console.log('onMount')
    ipc.requestPath()
  }

  handleSelect(path: string) {
    console.log('selecting', path)
    ipc.requestPath(path)
  }
  render() {
    const { path } = this.props
    return (
      <Container fluid style={{ marginTop: '3em' }}>
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column width={4} >
              <Menu />
            </Grid.Column>
            <Grid.Column width={12}>
              {path && isDirectory(path) && <Gallery path={path} select={this.handleSelect} />}
              {path && isFile(path) && <ImageView image={path} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }
}

const mapStateToProps = ({ path }: State) => ({
  path
})

export default connect(mapStateToProps)(App)