import * as React from 'react'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import ImagePreview from 'renderer/ImagePreview'
import Menu from 'renderer/Menu'
const range = Array.from(new Array(10)).map((n, i) => i)

class App extends React.Component {
  render() {
    return (
      <Container fluid style={{ marginTop: '3em' }}>
        <Grid padded='horizontally'>
          <Grid.Row>
            <Grid.Column padded width={4} >
              <Menu />
            </Grid.Column>
            <Grid.Column padded width={11}>
              <Grid columns={16} >
                {range.map(() => (
                  <Grid.Column width={4}>
                    <ImagePreview />
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

export default App