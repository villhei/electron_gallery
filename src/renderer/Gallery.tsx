import * as React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ImagePreview from 'renderer/ImagePreview'
import { File, Directory, isFile, isImageFile } from 'main/fileUtils'

export type Props = {
  path: Directory,
  select: (path: string) => void
}
const Gallery = (props: Props) => {
  const images: File[] = (props.path.children || [])
    .reduce((acc, child) => {
      if (isFile(child) && isImageFile(child)) {
        return acc.concat(child)
      } else {
        return acc
      }
    }, new Array<File>())
  return (
    <Grid columns={16} >
      {images.map((image) => (
        <Grid.Column computer={4} tablet={8} mobile={16} key={image.name}>
          <ImagePreview {...image} handleSelect={props.select} />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default Gallery