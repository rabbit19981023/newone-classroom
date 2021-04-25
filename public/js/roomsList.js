/** Indicate where the user is in web-roadmap **/
try {
  const navLink = document.querySelectorAll('.nav-link')[1]
  navLink.classList.add('active')
} catch (error) {  }

function doubleCheck () {
  const deleteDiv = document.querySelector('.double-check')
  deleteDiv.classList.toggle('is-active')
}

try {
  const deleteBtn = document.querySelector('.delete-btn')
  deleteBtn.addEventListener('click', doubleCheck)
} catch (error) {  }
