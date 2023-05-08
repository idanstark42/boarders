export default class User {
  constructor (raw, app) {
    this.raw = raw
    this.app = app
    User.FUNCTIONS.forEach(func => this[func] = ((...args) => this.functions[func](...args)))
  }

  get id () {
    return this.raw.id
  }

  get profile () {
    return this.raw.profile
  }

  get username () {
    return this.profile.name || this.profile.email.split('@')[0]
  }

  get functions () {
    return this.raw.functions
  }

  async logOut () {
    return await this.raw.logOut()
  }

  mongoClient (cluster) {
    return this.raw.mongoClient(cluster)
  }
}


User.MIN_LEVEL = 1
User.FUNCTIONS = 'generateMythTemplate initMythStructure startMyth continueMyth summarize whitelisted'.split(' ')
