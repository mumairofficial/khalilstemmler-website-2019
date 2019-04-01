import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import Tools from '../components/uses/components/Tools'
import ToolsNavigation from '../components/uses/components/ToolsNavigation'

const Uses = () => (
  <Layout 
    title="Tools"
    seo={{
      title: 'Tools I Use',
      keywords: ['javascript', 'design', 'react', 'angular', 'typescript', 'node.js']
    }}
    component={<ToolsNavigation/>}>
    <Tools/>
  </Layout>
)

export default Uses;