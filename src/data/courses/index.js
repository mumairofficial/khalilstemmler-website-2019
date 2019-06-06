
import dddDetails from './ddd/details'

const details = [
  dddDetails
]

export function findCourseById (id) {
  const result = details.filter((course) => course.id === id);

  if (result && result.length !== 0) {
    return result[0]
  }

  return null;
}

export function getCourseList () {
  return details;
}

export default details;
