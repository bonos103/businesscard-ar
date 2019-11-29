import twitterIcon from '@/assets/images/project/sns/twitter.png'
import facebookIcon from '@/assets/images/project/sns/facebook.png'
import instagramIcon from '@/assets/images/project/sns/instagram.png'

export default class SocialIcon {
  constructor(value) {
    this.value = value
  }

  get src() {
    const match = this.value.match(/twitter|facebook|instagram/)
    if (match[0] === 'twitter') {
      return twitterIcon
    }
    if (match[0] === 'facebook') {
      return facebookIcon
    }
    if (match[0] === 'instagram') {
      return instagramIcon
    }
    return ''
  }
}
