import toBoolean from './toBoolean.js'

try {
  const isAuth = toBoolean(document.querySelector('#is-auth').textContent)
  if (!isAuth) {
    window.location.href = '/login'
  }
} catch (error) {  }
