const SocialLinkOrigin = (link) => {
  const match = link.match(/^https:\/\/(www\.instagram\.com|www\.facebook\.com|twitter\.com)\//)
  if (match && match.length) {
    return match[0]
  }
  return ''
}
export default SocialLinkOrigin
