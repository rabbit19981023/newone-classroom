function displayPassword () {
  const password = document.getElementById('inputPassword')

  if (password.type === 'password') {
    password.type = 'text'
  } else {
    password.type = 'password'
  }
}
