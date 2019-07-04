
export class JSONLD {
  constructor () {
    this.logoUrl = "";
  }

  createArticleMarkdown (title, description, image, datePublished, dateModified, fullArticleUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullArticleUrl
      },
      "headline": title,
      "image": [
        image
       ],
      "datePublished": datePublished,
      "dateModified": dateModified,
      "author": {
        "@type": "Person",
        "name": "Khalil Stemmler"
      },
       "publisher": {
        "@type": "Organization",
        "name": "khalilstemmler.com",
        "logo": {
          "@type": "ImageObject",
          "url": this.logoUrl
        }
      },
      "description": description
    }
  }
}