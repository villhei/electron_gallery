import * as React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

export type ImagePreviewProps = {
  name: string,
  modified: string,
  hasData: boolean
}

function getImageData(name: string) {
  const arrayBuffer = (window as any).___imageData[name] as ArrayBuffer
  const bytes = new Uint8Array(arrayBuffer)
  const blob = new Blob([bytes.buffer])
  return URL.createObjectURL(blob)
}
const ImagePreview = (props: ImagePreviewProps) => {
  const data = props.hasData ? getImageData(props.name) : null
  return (
    <Card>
      <Image src={data} />
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