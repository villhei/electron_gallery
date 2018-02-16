import * as React from 'react'
import { Card,  Image, Icon } from 'semantic-ui-react'
import * as iceland from './iceland.jpg'

const ImagePreview = () => {
  return (
    <Card>
      <Image src={iceland} />
      <Card.Content>
        <Card.Header>
          Matthew
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            Joined in 2015
        </span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  )
}

export default ImagePreview