import * as React from 'react'
import { Image } from 'semantic-ui-react'
import { File } from 'main/fileUtils'

export type ImageViewProps = {
  image: File
}

const ImageView = (props: ImageViewProps) => {
  return (
    <Image src={props.image.url} />
  )
}

export default ImageView