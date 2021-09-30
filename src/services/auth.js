class Auth {
  #isAuthorized = false
  #authToken
  #authName

  constructor() {
    const storData = this.readFromStorage()
    if (storData) {
      this.#authToken = storData.token
      this.#authName = storData.name
      this.#isAuthorized = true
    }
  }

  signin(name, token, remember) {
    this.#isAuthorized = true

    this.writeToStorage(
      {
        token: token,
        name: name,
      },
      remember
    )
  }

  signout() {
    this.#authToken = undefined
    this.#authName = undefined
    this.#isAuthorized = false
    this.clearStorage()
  }

  getName() {
    return this.#authName
  }

  getToken() {
    return this.#authToken
  }

  isAuthorized() {
    return this.#isAuthorized
  }

  writeToStorage(object, remember) {
    if (remember) {
      window.localStorage.setItem("auth", JSON.stringify(object))
    } else {
      window.sessionStorage.setItem("auth", JSON.stringify(object))
    }
  }

  readFromStorage() {
    let object = JSON.parse(window.sessionStorage.getItem("auth"))
    if (!object) object = JSON.parse(window.localStorage.getItem("auth"))
    return object || false
  }

  clearStorage() {
    window.sessionStorage.removeItem("auth")
    window.localStorage.removeItem("auth")
  }
}

export default Auth
