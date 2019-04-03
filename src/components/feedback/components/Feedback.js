import React from 'react'
import PropTypes from 'prop-types'
import "../styles/Feedback.sass"
import { SubmitButton } from '../../shared/buttons'

class Feedback extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      message: "",
      submitted: false
    }

    this.submitFeedback = this.submitFeedback.bind(this);
    this.updateFeedbackForm = this.updateFeedbackForm.bind(this);
  }

  submitFeedback = () => {
    const { message } = this.state;
    if (message && typeof window !== "undefined") {
      try {
        window.amplitude.getInstance().logEvent('Feedback', {
          message
        });
        this.setState({
          submitted: true
        })
      } catch (err) {
        console.error(err);
      }
    }
  }

  updateFeedbackForm = (message) => {
    this.setState({
      ...this.state,
      message
    })
  }

  render () {
    const { submitted } = this.state;
    return (
      <div className="feedback">
      {submitted ? (
        <>
          <p>Thank you! 🙂 I really appreciate it.</p>
          <p>
            If you'd like to stay in touch and get notified of when I create new useful content,  
            consider <a href="https://mailchi.mp/bd65c1ac8fe2/enterprise-javascript">joining the newsletter</a>!
          </p>
          <p>Thanks again! 🙂👏</p>
        </>
      ) : (
        <>
          <p>Hey! Thanks for visiting. I'm looking for <u>your</u> feedback.</p>
          <p>
            I'm creating guides and tutorials for Junior Developers on software design, TypeScript, JavaScript, consulting and beyond. 
          </p>
          <p>What would you like to learn next? 📗</p>

          <div className="feedback-form">
            <textarea
              placeholder="Be nice!"
              onChange={(e) => this.updateFeedbackForm(e.target.value)}
            ></textarea>
            <SubmitButton 
              text="Submit feedback"
              onClick={() => this.submitFeedback()}
            />
          </div>
        </>
      )}
        
      </div>
    )
  }
}

export default Feedback;