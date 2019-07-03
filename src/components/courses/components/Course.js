import React from 'react'
import PropTypes from  'prop-types'
import "../styles/Course.sass"
import Layout from '../../shared/layout';
import CourseHeader from './CourseHeader';
import CourseDescriptionSection from './CourseDescriptionSection';
import CourseProject from './CourseProject';
import CTA from './CTA';
import futureCourses from '../../../images/courses/future-courses.svg'
import { LearningBenefits, CourseOutline } from '..';
import CourseGuarantee from './CourseGuarantee';
import { AboutTheResourceAuthor } from '../../resources';
import GetNotifiedModal from '../../shared/modals/components/GetNotifiedModal';
import innerText from 'react-innertext';
import { TwittterCardSize } from '../../shared/seo/CardSize';

class Course extends React.Component {
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
    const { course } = this.props;
    const {
      id,
      title,
      icon,
      banner,
      description,
      keywords,
      sections,
      videoUrl
    } = course;

    const {
      mainDescription,
      projectDescription,
      learningBenefits,
      outline,
      guarantee
    } = sections;

    return (
      <Layout 
        seo={{
          title: title,
          image: banner,
          description: innerText(description),
          keywords,
          cardSize: TwittterCardSize.LARGE
        }}
        footerComponent={(
          <div className="course-page-container">
            <GetNotifiedModal
              isOpen={isModalOpen}
              onClose={() => this.onCloseModal()}
            />
            <CourseHeader
              title={title}
              icon={icon}
              summary={description}
              onClick={() => this.openModal()}
              videoUrl={videoUrl}
            />
            <br/>
            <br/>
            <hr/>
            <br/>
            <CourseDescriptionSection>
              {mainDescription}
            </CourseDescriptionSection>
            <br/>
            <br/>
            <CourseProject>
              {projectDescription}
            </CourseProject>
            
            <LearningBenefits
              benefits={learningBenefits}
            />
            <CTA 
              onClick={() => this.openModal()}
              text="Want access to this course?"
            />
            <hr/>
            <CourseOutline
              outline={outline}
            />
            <CourseGuarantee
              text={guarantee}
            />
            <CTA 
              onClick={() => this.openModal()}
              text="Get notified when this course and other advanced Node.js & TypeScript courses come out"
              image={futureCourses}
            />
            <AboutTheResourceAuthor
              title="Meet the instructor"
            />
          </div>
        )}/>
    )
  }
}

export default Course;