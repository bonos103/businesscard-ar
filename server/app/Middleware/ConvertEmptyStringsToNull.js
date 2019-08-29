'use strict'

class ConvertEmptyStringsToNull {
  async handle({ request }, next) {
    if (Object.keys(request.body).length) {
      request.body = this.string2null(request.body)
    }

    await next()
  }

  static string2null(body) {
    return Object.assign(
      ...Object.keys(body).map(key => ({
        [key]: body[key] !== '' ? body[key] : null,
      })),
    )
  }
}

module.exports = ConvertEmptyStringsToNull
