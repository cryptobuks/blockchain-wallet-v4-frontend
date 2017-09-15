import { isEmpty } from 'ramda'
import bip39 from 'bip39'
import { isNumeric, isEmail, isGuid, isIpList } from 'services/ValidationHelper'
import { parse } from 'libphonenumber-js'
import zxcvbn from 'zxcvbn'

const required = value => value ? undefined : 'Required'

const validNumber = value => isNumeric(value) ? undefined : 'Invalid number'

const requiredNumber = value => isNumeric(value) && value > 0 ? undefined : 'Invalid number'

const validEmail = value => isEmail(value) ? undefined : 'Invalid email address'

const validMmemonic = value => bip39.validateMnemonic(value) ? undefined : 'Invalid passphrase'

const validWalletId = value => isGuid(value) ? undefined : 'Invalid wallet identifier'

const validMobileNumber = value => !isEmpty(parse(value)) ? undefined : 'Invalid mobile number'

const validStrongPassword = value => (value !== undefined && zxcvbn(value).score > 1) ? undefined : 'Your password is not strong enough'

const validIpList = value => isIpList(value) ? undefined : 'Invalid IP list'

const validPasswordStretchingNumber = value => (value > 1 && value <= 20000) ? undefined : 'Please ensure 1 < PBKDF2 <= 20000'

export { required, requiredNumber, validNumber, validEmail, validMmemonic, validWalletId, validMobileNumber, validStrongPassword, validIpList, validPasswordStretchingNumber }