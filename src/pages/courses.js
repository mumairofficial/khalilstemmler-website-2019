import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import { navigateTo } from "gatsby"
import { CourseSummary, WhoICreateFor, CTA } from '../components/courses';
import { getCourseList } from '../data/courses'
import { SmallSubscribeForm } from '../components/subscribe'
import futureCourses from '../images/courses/future-courses.svg'
import GetNotifiedModal from '../components/shared/modals/components/GetNotifiedModal';

class Courses extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  openModal () {
    this.setState({ ...this.state, isModalOpen: true });
  }

  onCloseModal () {
    this.setState({ ...this.state, isModalOpen: false });
  }

  render () {
    const { isModalOpen } = this.state;
    const { courses } = this.props;
    return (
      <Layout 
        seo={{
          title: 'Advanced Node.js & TypeScript courses',
          description: 'Courses for developers to learn how to write better software with Node.js & TypeScript',
          keywords: ['nodejs', 'typescript', 'javascript']
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
            <GetNotifiedModal
              isOpen={isModalOpen}
              onClose={() => this.onCloseModal()}
            />
            <WhoICreateFor/>
            <CTA 
              image={futureCourses}
              text={'Get notified when new advanced Node.js & TypeScript courses come out'}
              onClick={() => this.openModal()}
            />
          </div>
        )}>
          <div className="courses-page">
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
          </div>
      </Layout>
    )
  }
}

export default () => {
  const courses = getCourseList();
  return (
    <Courses
      courses={courses}
    />
  )
}