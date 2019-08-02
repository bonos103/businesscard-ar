const moment = require('moment')
const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const Encryption = use('Encryption')
  const Validator = use('Validator')

  Validator.extend('validAuthCode', async (data, field, message, args, get) => {
    const code = get(data, field)
    if (!code) {
      return
    }
    const decrypt = JSON.parse(Encryption.decrypt(code))
    if (!decrypt) {
      throw message
    }
    const rules = {
      email: 'required|email',
      password: 'required',
      createdDate: 'required',
    }
    const result = await Validator.validate(decrypt, rules)
    if (result.fails()) {
      throw message
    }
  })
  Validator.extend('timeoutCode', async (data, field, message, args, get) => {
    const code = get(data, field)
    if (!code) {
      return
    }
    const decrypt = JSON.parse(Encryption.decrypt(code))
    // decryptのvalidationは、validAuthCode
    if (!decrypt) {
      return
    }
    const [expired = (24 * 60 * 60)] = args
    const validDate = moment().subtract(expired, 'seconds')
    const rules = {
      createdDate: `after:${validDate}`,
    }
    const result = await Validator.validate(decrypt, rules)
    if (result.fails()) {
      throw message
    }
  })
})
