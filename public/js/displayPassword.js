function displayPassword () {
  const password = document.querySelector('#inputPassword')

  if (password.type === 'password') {
    password.type = 'text'
  } else {
    password.type = 'password'
  }
}
