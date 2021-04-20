const isAuth = toBoolean(document.querySelector('#is-auth').textContent)
if (!isAuth) {
  window.location.href = '/admin/login'
}
