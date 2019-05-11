import React from 'react'
import "../styles/SmallSubscribeForm.sass"
import addToMailchimp from "gatsby-plugin-mailchimp";
import mysteryIcon from '../../../images/icons/mystery-icon.svg'
import { SubmitButton } from '../../shared/buttons';
import { detectEnterPress } from '../../../utils/enterPress';
import { validateEmail } from '../../../utils/validateEmail';

class SmallSubscribeForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      submitted: false
    }

    this.submitForm = this.submitForm.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFormFieldChanged = this.onFormFieldChanged.bind(this);
  }

  onKeyUp = (e) => {
    if (detectEnterPress(e)) {
      this.submitForm();
    } 
  }

  onFormFieldChanged = (fieldName, newValue) => {
    this.setState({
      ...this.state,
      [fieldName]: newValue
    })
  }

  submitForm = async () => {
    const { email } = this.state;
    if (email !== "" && email !== undefined && validateEmail(email)) {
      await addToMailchimp(email, {
        FNAME: '',
        LNAME: '',
        SOURCEID: 'subscribe-form'
      });
      // alert(`Good stuff! I'll let you know when I have something good for you. Cheers, pal.`)
      this.setState({ ...this.state, submitted: true })
    } else {
      alert('Whoops. Want to try that again with a valid email? 🤠')
    }
  }

  render () {
    const { submitted } = this.state;

    return (
      <div className="small-subscribe-form">
        <div className="header">
            <div className="icon-container">
              <img src={mysteryIcon}/>
            </div>
            <div className="details">
              <p className="message">Want to be notified when new Node.js, TypeScript & JavaScript resources come out?
              </p>
              <p className="sub-message">Join 200+ other developers</p>
            </div>
        </div>
        {
          submitted ? (
            <p className="form submitted">You're in!</p>
          ) : (
            <div className="form">
                <input 
                  onChange={(e) => this.onFormFieldChanged('email', e.target.value)}
                  onKeyUp={(e) => this.onKeyUp(e)} 
                  type="text" 
                  placeholder="Your email"
                />
                <SubmitButton 
                  text="Get updates"
                  onClick={() => this.submitForm()}
                />
              </div>  
          )
        }
        
      </div>
    )
  }
}

export default SmallSubscribeForm;