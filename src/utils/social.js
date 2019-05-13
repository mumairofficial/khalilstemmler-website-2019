
import config from '../../gatsby-config'
import urljoin from 'url-join'

export const createTwitterShareURL = (title, url) => {
  return `http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url}/&via=stemmlerjs`
}

export const createEditOnGitHubURL = (slug) => {
  return urljoin(config.siteMetadata.repo, '/blob/master/src/pages/', `${slug.substring(0, slug.length - 1)}.md`);
}

export const createTwitterDiscussionURL = (url) => {
  return `https://twitter.com/search?q=${url}`
}