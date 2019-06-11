import React from 'react'
import PropTypes from 'prop-types'
import "../styles/ExitModal.sass"
import { withMailchimpHOC } from '../../../../hocs'
import futureCourses from '../../../../images/courses/future-courses.svg'
import { TextInput } from '../../text-input';
import { SubmitButton } from '../../buttons';
import { MAILCHIMP_SEGMENTS } from '../../../../hocs/withMailchimpHOC';

let ExitModal = ({ children }) => (
  <div>{children}</div>
)
if (typeof document !== `undefined`) {
  ExitModal = require('react-exit-modal').ExitModal
}

class SiteExitModal extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      intentToSubscribeExpressed: false
    }

    this.onSubmitButtonClicked = this.onSubmitButtonClicked.bind(this);
  }

  onSubmitButtonClicked () {
    const { intentToSubscribeExpressed }  = this.state;

    if (!intentToSubscribeExpressed) {
      this.setState({ ...this.state, intentToSubscribeExpressed: true })
    } else {
      this.props.submitForm(MAILCHIMP_SEGMENTS.subscribeForm)
    }
  } 

  render () {
    const { intentToSubscribeExpressed } = this.state;
    const { email, submitted } = this.props;
    return (
      <ExitModal
        className="exit-modal-container"
        height={300}
        width={450}
        minimumSecondsOnPage={1.5}
      >
        <div className="content-container">
          {submitted ? (
            <h3>Awesome! I'll let you know when I have something good for you. You can close this window now.</h3>
          ) : (
            <h3>Let’s stay in touch. 👋 Want to know when new Advanced TypeScript & Node.js courses & guides go live?</h3>
          )}
          <p></p>
          <div className="image-container">
            <img src={futureCourses}/>
          </div>
          <div className={`email-input-container ${!intentToSubscribeExpressed ? 'hidden' : ''}`}>
            <TextInput
              value={email}
              placeholder="Email"
              type="text"
              onChange={(e) => this.props.onFormFieldChanged('email', e)}
            />
          </div>
          <SubmitButton 
            text="Yeah! Let's go for it." 
            color="green" 
            onClick={() => this.onSubmitButtonClicked()}
          />
        </div>
      </ExitModal>
    )
  }
}

export default withMailchimpHOC(SiteExitModal);