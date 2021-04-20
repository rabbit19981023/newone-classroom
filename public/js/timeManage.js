const mode = document.querySelector('#mode')
const modeStr = mode.textContent

if (modeStr === 'add') {
  const navLink = document.querySelectorAll('.nav-link')[2]
  navLink.classList.add('active')
}

if (modeStr === 'delete') {
  const navLink = document.querySelectorAll('.nav-link')[3]
  navLink.classList.add('active')
}

const select = document.querySelector('#room-select')
select.addEventListener('change', () => {
  window.location.href = '/admin/rooms/time/' + modeStr + '/' + select.value
})

const selectAll = document.querySelector('.select-all')
selectAll.addEventListener('click', selectAllCheckboxes)
