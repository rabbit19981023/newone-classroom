function toBoolean (str) {
  switch (str.toLowerCase().trim()) {
    case 'true':
      return true

    case '1':
      return true

    case 'false':
      return false

    case '0':
      return false
  }
}
