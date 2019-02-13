
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