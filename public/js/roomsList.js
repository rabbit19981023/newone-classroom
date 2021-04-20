/** Indicate where the user is in web-roadmap **/
const navLink = document.querySelectorAll('.nav-link')[1]
navLink.classList.add('active')

function doubleCheck () {
  const deleteDiv = document.querySelector('.double-check')
  deleteDiv.classList.toggle('is-active')
}

const deleteBtn = document.querySelector('.delete-btn')
deleteBtn.addEventListener('click', doubleCheck)
