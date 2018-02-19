import * as React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

export type ImagePreviewProps = {
  name: string,
  modified: string,
  src: any
}
const ImagePreview = (props: ImagePreviewProps) => {
  return (
    <Card>
      <Image src={props.src} />
      <Card.Content>
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {props.modified}
          </span>
        </Card.Meta>
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