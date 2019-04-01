import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

class SEO extends React.Component {
  constructor (props) {
    super(props);

    this.getKeywords = this.getKeywords.bind(this);
  }

  getKeywords () {
    const { keywords } = this.props;
    return keywords.length > 0
    ? {
        name: `keywords`,
        content: keywords.join(`, `),
      }
    : []
  }

  render () {
    const { description, meta, image, title } = this.props;
    return (
      <StaticQuery
        query={detailsQuery}
        render={data => {
          const metaDescription = description || data.site.siteMetadata.description;
          const metaImage = image || data.site.siteMetadata.logo;
          
          return (
            <Helmet
              htmlAttributes={{
                lang: 'en'
              }}
              title={title}
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              meta={[
                // General tags
                { name: `description`, content: metaDescription },

                // Opengraph tags
                { property: `og:title`, content: title },
                { property: `og:image`, content: metaImage },
                { property: `og:description`, content: metaDescription },
                { property: `og:type`, content: `website` },

                // Twitter cards
                { name: `twitter:card`, content: `summary` },
                { name: `twitter:creator`, content: data.site.siteMetadata.author },
                { name: `twitter:title`, content: title },
                { name: `twitter:description`, content: metaDescription },
                { name: "twitter:image", content: metaImage }
              ]
              .concat(this.getKeywords())
              .concat(meta)}
            />
          )
        }}
      />
    )
  }
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        twitter
        author
        logo
        url
      }
    }
  }
`
