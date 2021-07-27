window.addEventListener('DOMContentLoaded', () => {
  function displayPassword () {
    const password = document.querySelector('#inputPassword')
  
    if (password.type === 'password') {
      password.type = 'text'
    } else {
      password.type = 'password'
    }
  }
  
  try {
    const password = document.querySelector('#display-password')
    password.addEventListener('click', displayPassword)
  } catch (error) {  }
})
