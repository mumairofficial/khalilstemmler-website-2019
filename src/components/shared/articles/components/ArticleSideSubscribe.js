import React from 'react'
import withMailchimpHOC, { MAILCHIMP_SEGMENTS } from '../../../../hocs/withMailchimpHOC';
import mysteryIconWhite from '../../../../images/icons/mystery-icon-white.svg'
import "../styles/ArticleSideSubscribe.sass"
import prose from '../../../../assets/prose'
import { SubmitButton } from '../../buttons';

class ArticleSideSubscribe extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { submitted } = this.props;
    return (
      <div className="article-side-subscribe">
        <div className="icon-container">
          <img src={mysteryIconWhite}/>
        </div>
        <p>Want to be notified when new content comes out?</p>
        <p>Join {prose.subscriberCount}+ other developers learning 
          about Domain-Driven Design and 
          Enterprise Node.js.
        </p>
        <p>I won't spam ya. 🖖 Unsubscribe anytime.</p>

        {
          submitted ? (
            <p className="form submitted">You're in!</p>
          ) : (
            <div className="form">
                <input 
                  onChange={(e) => this.props.onFormFieldChanged('email', e.target.value)}
                  onKeyUp={(e) => this.props.onKeyUp(e)} 
                  type="text" 
                  placeholder="Your email"
                />
                <SubmitButton 
                  text="Get updates"
                  onClick={() => this.props.submitForm(MAILCHIMP_SEGMENTS.subscribeForm)}
                />
              </div>  
          )
        }
      </div>
    )
  }
}

export default withMailchimpHOC(ArticleSideSubscribe)