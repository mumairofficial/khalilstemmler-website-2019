import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

// const getSchemaOrgJSONLD = ({
//   isBlogPost,
//   url,
//   title,
//   image,
//   description,
//   datePublished,
// }) => {
//   const schemaOrgJSONLD = [
//     {
//       '@context': 'https://khalilstemmler.com',
//       '@type': 'WebSite',
//       url,
//       name: title,
//       alternateName: config.title,
//     },
//   ]

//   return isBlogPost
//     ? [
//         ...schemaOrgJSONLD,
//         {
//           '@context': 'https://khalilstemmler.com',
//           '@type': 'BreadcrumbList',
//           itemListElement: [
//             {
//               '@type': 'ListItem',
//               position: 1,
//               item: {
//                 '@id': url,
//                 name: title,
//                 image,
//               },
//             },
//           ],
//         },
//         {
//           '@context': 'https://khalilstemmler.com',
//           '@type': 'BlogPosting',
//           url,
//           name: title,
//           alternateName: config.title,
//           headline: title,
//           image: {
//             '@type': 'ImageObject',
//             url: image,
//           },
//           description,
//           author: {
//             '@type': 'Person',
//             name: 'Khalil Stemmler',
//           },
//           publisher: {
//             '@type': 'Organization',
//             url: 'https://khalilstemmler.com',
//             logo: config.logo,
//             name: 'Khalil Stemmler',
//           },
//           mainEntityOfPage: {
//             '@type': 'WebSite',
//             '@id': config.url,
//           },
//           datePublished,
//         },
//       ]
//     : schemaOrgJSONLD
// }

const SEO = ({ title, postData, postImage, isBlogPost, config }) => {
  const pageTitle = title || config.title
  const description = postData.description || postData.excerpt || config.description
  const image = `${config.url}${postImage}` || config.image
  const url = postData.slug ? `${config.url}${postData.slug}` : config.url
  const datePublished = isBlogPost ? postData.date : false

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished,
  })

  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    description: PropTypes.any,
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }).isRequired,
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
}

export default SEO;