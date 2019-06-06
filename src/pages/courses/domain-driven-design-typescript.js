import React from 'react'
import { findCourseById } from '../../data/courses';
import { Course } from '../../components/courses';

const DDDCourse = () => (
  <Course
    course={findCourseById('ddd-course')}
  />
)

export default DDDCourse;