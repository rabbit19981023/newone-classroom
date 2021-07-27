export default function (user, role) {
  let isAuth = false

  if (user) {
    if (user.role === role) {
      isAuth = true
    }
  }

  return isAuth
}
