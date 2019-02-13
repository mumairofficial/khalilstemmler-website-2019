const fs = require('fs');
const bandcamp = require('bandcamp-scraper');
const path = require('path')

const cyanidecanaries = 'https://cyanidecanaries.bandcamp.com/';
const debutante = 'https://debutante-band.bandcamp.com/';


class Bandcamp {
  constructor () {
    this.bandcamp = bandcamp;
  }

  getAlbumUrls (artistUrl) {
    return new Promise((resolve, reject) => {
      bandcamp.getAlbumUrls(artistUrl, function(error, albumUrls) {
        if (error) {
          return reject(error)
        } else {
          return resolve(albumUrls);
        }
      });
    })
  }

  getAlbumInfo (albumUrl) {
    return new Promise((resolve, reject) => {
      bandcamp.getAlbumInfo(albumUrl, function(error, albumInfo) {
        if (error) {
          return reject(error)
        } else {
          return resolve(albumInfo)
        }
      });
    })
  }
}

function filterIndividualTracks (album) {
  return album.albumInfo.tracks.length === 0 ? false : true;
}

const bcamp = new Bandcamp();

async function getAllAlbums () {
  let result = [];
  const ccUrls = await bcamp.getAlbumUrls(cyanidecanaries);
  const ccAlbumsInfo = await Promise.all(ccUrls.map( async (url) => {
    const albumInfo = await bcamp.getAlbumInfo(url);
    return {
      url,
      albumInfo
    }
  }))

  const debUrls = await bcamp.getAlbumUrls(debutante);
  const debAlbumsInfo = await Promise.all(debUrls.map( async (url) => {
    const albumInfo = await bcamp.getAlbumInfo(url);
    return {
      url,
      albumInfo
    }
  }));
  
  result = result.concat(ccAlbumsInfo).concat(debAlbumsInfo);
  result = result.filter(filterIndividualTracks)
  return result;
}

async function bootstrap () {
  const data = await getAllAlbums();
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join('src/data/albums.json'), JSON.stringify(data), 'utf8', (err, data) => {
      if (err) return reject(err);
      return resolve();
    });
  })
}

bootstrap();


