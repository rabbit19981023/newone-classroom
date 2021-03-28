export default function parsingUser (req) {
  let user = req.user

  if (req.user) {
    user = user.user
  }

  return user
}