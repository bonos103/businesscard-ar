import twitterIcon from '@/assets/images/project/sns/twitter.png'
import facebookIcon from '@/assets/images/project/sns/facebook.png'
import instagramIcon from '@/assets/images/project/sns/instagram.png'
import webIcon from '@/assets/images/project/sns/web.png'

export default class SocialIcon {
  constructor(value) {
    this.value = value
  }

  get src() {
    const match = this.value.match(/twitter|facebook|instagram/)
    if (!match) {
      return webIcon
    }
    switch (match[0]) {
      case 'twitter': {
        return twitterIcon
      }
      case 'facebook': {
        return facebookIcon
      }
      case 'instagram': {
        return instagramIcon
      }
      default: {
        return webIcon
      }
    }
  }
}
