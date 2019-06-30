const React = require('react');
const bugsnag = require('@bugsnag/js')
const bugsnagReact = require('@bugsnag/plugin-react')

const bugsnagClient = bugsnag('6ebb797b32abf0914738a154bea1971b')
bugsnagClient.use(bugsnagReact, React)

module.exports = {
  bugsnagClient
}