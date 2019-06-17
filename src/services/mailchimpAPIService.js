
import axios from 'axios'

export const EmailAudienceTags = {
  NCS_BOOK_LEAD: 'Downloaded Names Construct Structure Book',
  DDD_COURSE_LEAD: 'DDD Course Lead'
}

export const MailChimpAPIService = {
  tagContact: async (email, tag) => {
    return axios({
      url: 'https://khalilstemmler-mailchimp.stemmlerjs.now.sh/functions/add_tag_to_subscriber.ts',
      method: 'POST',
      data: {
        email,
        tag
      }
    })
  }
}

