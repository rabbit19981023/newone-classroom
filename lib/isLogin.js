export default function (user, role) {
  let isLogin = false

  if (user) {
    if (user.role === role) {
      isLogin = true
    }
  }

  return isLogin
}