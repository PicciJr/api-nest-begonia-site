const crypto = require('crypto')

export function generateRandomToken() {
  return crypto.randomBytes(20).toString('hex')
}
