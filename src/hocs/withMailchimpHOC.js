import React from "react";
import PropTypes from "prop-types";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { detectEnterPress } from '../utils/enterPress';
import { validateEmail } from '../utils/validateEmail';

export const MAILCHIMP_SEGMENTS = {
  subscribeForm: 'subscribe-form',
  courseSubscriber: 'course-subscriber'
}

const withMailchimpHOC = Component => {
  return class extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        email: '',
        firstName:  '',
        lastName: '',
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
  
    submitForm = async (segmentName) => {
      const { email, firstName, lastName } = this.state;
      if (email !== "" && email !== undefined && validateEmail(email)) {
        await addToMailchimp(email, {
          FNAME: firstName,
          LNAME: lastName,
          SOURCEID: segmentName
        });
        // alert(`Good stuff! I'll let you know when I have something good for you. Cheers, pal.`)
        this.setState({ ...this.state, submitted: true })
      } else {
        alert('Whoops. Want to try that again with a valid email? 🤠')
      }
    }

    componentDidMount () {
      
    }

    render() {
      return (
        <Component 
          {...this.props} 
          {...this.state}
          onKeyUp={this.onKeyUp}
          submitForm={this.submitForm} 
          onFormFieldChanged={this.onFormFieldChanged}
        />
      );
    }
  };
};

export default withMailchimpHOC;

withMailchimpHOC.PropTypes = {
  
};
