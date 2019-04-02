import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import "../styles/Tags.sass";

const Tags = ({ tags }) => (
  <div className="tags-container">
    {tags && tags
      .filter(t => !!t)
      .map((tag, i) => (
        <Link
          to={`/articles/tags/${kebabCase(tag)}/`}
          className="tag"
          key={i}
        >
          {tag.toLowerCase()}
        </Link>
      ))}
  </div>
);

export default Tags;
