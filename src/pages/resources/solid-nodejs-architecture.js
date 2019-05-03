import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../../components/shared/layout"
import { ResourceType, FaqItem, AboutTheResourceAuthor, Gem } from '../../components/resources'
import { ResourceTypeConstant } from '../../components/resources/components/ResourceType'
import addToMailchimp from "gatsby-plugin-mailchimp";
import "./SolidNodeArchitectureEbook.sass"

import bookCover from '../../images/resources/solid/solid-cover.png'
import bookBanner from '../../images/resources/solid/solid-banner.png'
import infoIcon from '../../images/icons/info.svg'
import { TextInput } from '../../components/shared/text-input';
import { SubmitButton } from '../../components/shared/buttons';
import { validateEmail } from '../../utils/validateEmail';

const pageTitle = 'SOLID: An introduction to software architecture and design principles with Node.js & TypeScript';
const description = 'An introduction to software architecture and design principles with Node.js and TypeScript'
const pageKeywords = ['nodejs', 'software architecture', 'typescript', 'design principles', 'intro', 'ebook']
const gems = [
  `Prevent unmaintainable code- learn how to identify bad design and refactor towards a good one`,
  `Reap the benefits of OOP and type checking with TypeScript`,
  `Use the SOLID principles to prevent tightly coupled and untestable code`,
  `Develop a flexible and testable architecture using layers`,
  `When to consider microservices and how to proactively code towards eventual microservice deployment`,
  'How and why to layer your application into domain, application and infrastructure layers',
  `Learn how to structure any application’s source code for scale`,
  `How and when to write unit, integration and end-to-end tests`,
  `Why to structure business logic away from dependencies, frameworks, tools & ORMs like Express.js and Sequelize `
]

class SolidNodePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      isGetMoreResourcedChecked: true,
      loading: false,
      subscribed: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.updateSubscriptionStatus = this.updateSubscriptionStatus.bind(this);
  }

  onUpdateFormField = (fieldName, newValue) => {
    this.setState({
      ...this.state,
      [fieldName]: newValue
    });
  }

  updateSubscriptionStatus = (loading, subscribed) => {
    this.setState({ ...this.state, loading, subscribed })
  }

  onSubmit = () => {
    const { email, firstName, lastName, isGetMoreResourcedChecked } = this.state;

    if (this.isFormValid()) {
      this.updateSubscriptionStatus(true, false)
      setTimeout( async () => {
        try {
          await addToMailchimp(email, {
            FNAME: firstName,
            LNAME: lastName,
            SOURCEID: isGetMoreResourcedChecked ? 'solid-book-and-newsletter' : 'solid-book'
          });
          this.updateSubscriptionStatus(true, true);
          // go to best content
          this.props.navigate('/best?prev=solid-book-subscription');
        } catch (err) {
          console.error(err);
          alert('That didnt work... sad face.')
          this.updateSubscriptionStatus(false, false)
        }
      }, 100)
    }
  }

  isFormValid = () => {
    const { firstName, lastName, email } = this.state;

    if (!!firstName === false) {
      alert('Whoops. You forgot your first name. 🤠');
      return false;
    }

    if (!!lastName === false) {
      alert('Whoops. You forgot your last name. 🤠');
      return false;
    }

    if (email === "" || email === undefined || !validateEmail(email)) {
      alert('Whoops. Want to try that again with a valid email? 🤠')
      return false;
    }
    
    return true;
  }

  render () {
    const { email, firstName, lastName, isGetMoreResourcedChecked, subscribed } = this.state;
    return (
      <>
        <Layout
          title={pageTitle}
          seo={{ 
            title: pageTitle, 
            description: description,
            keywords: pageKeywords,
            image: bookBanner
          }}
          rawMode={true}
          
        >
          <div className="solid-resource--page-container">
            <section className="solid-resource--book-section">
              <div className="book-section--cover-image-container">
                <img src={bookCover}></img>
              </div>
              <div className="book-section--faq-container">
                <div className="faq-container--image-container">
                  <img src={infoIcon}></img>
                </div>
                <h2>FAQ</h2>
              </div>
              <FaqItem
                question="Who is this book for?"
                answer={`It's for junior or intermediate JavaScript developers who want to learn how to design maintainable & scalable software.`}
              />
              <FaqItem
                question="What's the main takeaway? What will I learn how to do?"
                answer={`You'll review classic OOP concepts and learn a set of design principles to aid you in improving your software designs. 
                You'll also understand how to apply these principles when writing
                code on either the frontend (with React or Angular) or the backend (with Node.js, Express.js and Sequelize).`}
              />
              <FaqItem
                question="When is this coming out?"
                answer="August 2019!"
              />
              <FaqItem
                question="How long is it?"
                answer="So far, it's about 150 pages and counting"
              />
              <FaqItem
                question="Will it still be free when it comes out?"
                answer="For now, yes. Absolutely."
              />
              <FaqItem
                question="Why are you writing this book?"
                answer={`This stuff really helps to write better code. I want my peers, especially the ones writing JavaScript, to have these skills.`}
              />
            </section>
            <section className="solid-resource--body">
              <ResourceType 
                type={ResourceTypeConstant.ebook}
                free={true}
              />
              <h1><i>Write SOLID code</i></h1>
              <h2>{description}</h2>
              
              <h3>Get it free. Delivered straight to your inbox when it comes out.</h3>
              <TextInput
                value={firstName}
                placeholder="First name"
                type="text"
                onChange={(val) => this.onUpdateFormField('firstName', val)}
              />
              <TextInput
                value={lastName}
                placeholder="Last name"
                type="text"
                onChange={(val) => this.onUpdateFormField('lastName', val)}
              />
              <TextInput
                value={email}
                placeholder="Email"
                type="email"
                onChange={(val) => this.onUpdateFormField('email', val)}
              />
              <input 
                checked={isGetMoreResourcedChecked} 
                onClick={() => this.onUpdateFormField('isGetMoreResourcedChecked', !isGetMoreResourcedChecked)}
                type="checkbox"/> Send me the best Node.js, TypeScript and JavaScript software design resources as they're released
              <br/>
              <br/>
              <SubmitButton 
                text={"I want this"}
                onClick={this.onSubmit}
                loading={this.state.loading}
              />
              <br/>
              <br/>
              { gems.map((g, i) => (<Gem key={i} text={g}/>)) }

            </section>
          </div>
        </Layout>
        <AboutTheResourceAuthor/>
      </>
    )
  }
}

export default SolidNodePage