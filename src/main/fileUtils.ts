import * as fs from 'fs'
import * as P from 'bluebird'
import * as path from 'path'

const fsAsync = P.promisifyAll(fs)

type FsException = NodeJS.ErrnoException

export const SUPPORTED_IMAGE_FILES = new Set<string>([
  'jpg',
  'gif',
  'png'
])
export type File = {
  name: string,
  path: string,
  modified: string,
  created: string,
  size: number,
  isFile: boolean,
  isDirectory: boolean
}

export function readFileAsync(path: string): P<Buffer> {
  return new P((resolve, reject) => {
    fs.readFile(path, (err: FsException, data: Buffer) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

function readDirAsync(path: string): P<string[]> {
  return new P((resolve, reject) => {
    fs.readdir(path, (err: FsException, files: string[]) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}

function statAsync(path: string): P<fs.Stats> {
  return new P((resolve, reject) => {
    fs.stat(path, (err: FsException, stats: fs.Stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

export function isImageFile(file: File): boolean {
  const extension = getExtension(file)
  return SUPPORTED_IMAGE_FILES.has(extension.toLowerCase())
}
export function getExtension(file: File): string {
  return file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2)
}

export function fileDescriptionsInPath(pathname: string): P<File[]> {
  return readDirAsync(pathname)
    .then(files => P.map(files, async (file: string) => {
      const filePath: string = path.join(pathname, file)
      const stats = await statAsync(filePath)
      return {
        name: file,
        path: filePath,
        modified: stats.mtime.toISOString(),
        created: stats.ctime.toISOString(),
        size: stats.size,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory()
      }
    }))
}
