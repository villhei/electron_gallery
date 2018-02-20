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

export type Path = Directory | File

export type BasePath = {
  path: string,
  modified: string,
  created: string,
}

export type Directory = BasePath & {
  children: Path[] | null,
  isDirectory: true,
  isFile: false
}

export type File = BasePath & {
  name: string,
  url: string,
  size: number,
  isDirectory: false,
  isFile: true
}

function Directory(path: string, modified: Date, created: Date, children: Path[] | null): Directory {
  return {
    path,
    modified: modified.toISOString(),
    created: modified.toISOString(),
    children,
    isFile: false,
    isDirectory: true
  }
}

function File(path: string, name: string, size: number, modified: Date, created: Date): File {
  return {
    path,
    name,
    url: 'file://' + path,
    modified: modified.toISOString(),
    created: created.toISOString(),
    size,
    isFile: true,
    isDirectory: false
  }
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

export function statAsync(path: string): P<fs.Stats> {
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

export function isFile(path: Path): path is File {
  return path.isFile
}

export function isDirectory(path: Path): path is Directory {
  return path.isDirectory
}

export function getPath(pathname: string, depth: number): P<Path> {
  const fileName = pathname.substring(pathname.lastIndexOf(path.delimiter))
  return statAsync(pathname).then(async (stats: fs.Stats): Promise<Path> => {
    if (stats.isFile()) {
      return File(pathname, fileName, stats.size, stats.mtime, stats.ctime)
    } else if (depth < 1) {
      return Directory(pathname, stats.mtime, stats.ctime, null)
    }
    const children = await P.map(readDirAsync(pathname), child => getPath(path.join(pathname, child), depth - 1))
    return Directory(pathname, stats.mtime, stats.ctime, children)
  })
}
