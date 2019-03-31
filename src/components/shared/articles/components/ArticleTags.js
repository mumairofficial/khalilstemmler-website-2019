import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import "../styles/ArticleTags.sass";

const ArticleTags = ({ tags }) => (
  <div className="article-tags-container">
    {tags
      .filter(t => !!t)
      .map((tag, i) => (
        <Link
          to={`/articles/tags/${kebabCase(tag)}/`}
          className="article-tag"
          key={i}
        >
          {tag.toLowerCase()}
        </Link>
      ))}
  </div>
);

export default ArticleTags;
