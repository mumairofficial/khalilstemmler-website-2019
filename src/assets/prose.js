import React from 'react'
import { Link } from 'gatsby'

export default {
  "main": {
    "description": (
      <span>
        Essential software development <span className="special-green">patterns</span>, <span className="special-green">principles</span> and tutorials with  
        modern <span className="special-green">JavaScript</span> and <span className="special-green">TypeScript</span>. 
        <br/>
        <br/>
        By a software developer / designer, musician 
        based out of the GTA currently working as a JavaScript consultant.
      </span>
    ),
    "description-expanded": (
      <span>
        I co-founded <a href="https://univjobs.ca">Univjobs</a> in 2017 and learned a lot about making code scale. At some 
        point during my work as a consultant and reading as many <Link to="/books">books</Link> on software as I could digest, I've come to realize that 
        there were a lot of pitfalls I could have avoided if I knew the patterns and principles to guide me. That's what this 
        site is about: things I think all professional software people should know.
      </span>
    )
  },
  "currently": {
    "book": {
      "title": "Patterns of Enterprise Application Architecture",
      "author": "Martin Fowler"
    },
    "music": {
      "album": "Prayers on Fire",
      "artist": "The Birthday Party"
    }
  }
}