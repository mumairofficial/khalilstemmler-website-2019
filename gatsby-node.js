/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const fs = require('fs')
const NodeID3 = require('node-id3')

// You can delete this file if you're not using it
const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

const readID3Tag = (path) => {
  return new Promise((resolve, reject) => {
    NodeID3.read(path, function(err, tags) {
      if (err) return reject(err);
      else resolve(tags);
    })
  })
}

const getMP3DataFromPath = async (relPath) => {
  const tags = await readID3Tag(path.join(__dirname, relPath))
  console.log(tags.artist, tags.title)
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  // Get all media files
  // const mp3Paths = getAllFiles(path.join('src', 'media'))
  // const rawID3Tags = await Promise.all(mp3Paths.map(getMP3DataFromPath))
  // // Process data into nodes.
  // data.forEach(datum => createNode(processDatum(datum)))

  // We're done, return.
  return
}