import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import { StaticQuery, graphql, navigateTo } from "gatsby"
import { getBooksFromQuery } from '../utils/book'
import { CourseSummary, WhoICreateFor, CTA } from '../components/courses';
import { getCourseList } from '../data/courses'
import { SmallSubscribeForm } from '../components/subscribe'
import futureCourses from '../images/courses/future-courses.svg'

const Courses = ({ courses }) => (
  <Layout 
    seo={{
      title: 'Courses',
      keywords: []
    }}
    title="Courses"
    component={(
      <div>
        <p>Learn how to write enterprise-level software with Node.js & TypeScript.</p>
        <div className="desktop-subscribe-form-container">
          <SmallSubscribeForm/>
        </div>
      </div>
    )}
    footerComponent={(
      <div>
        <WhoICreateFor/>
        <CTA 
          image={futureCourses}
          text={'Get notified when new advanced Node.js & TypeScript courses come out'}
          onClick={() => {
            alert('we  should handle this')
          }}
        />
      </div>
    )}>
    {courses.map((course, i) => (
      <CourseSummary 
        key={i} 
        title={course.title}
        icon={course.icon}
        summary={course.description}
        onClick={() => navigateTo(`/courses/${course.slug}`)}
        buttonText="Learn more"
      />
    ))}
    <br/>
    <br/>
    {/* <hr/>
    <p style={{ textAlign: 'center'}}>... and more coming soon</p> */}
  </Layout>
)

export default () => {
  const courses = getCourseList();
  return (
    <Courses
      courses={courses}
    />
  )
}