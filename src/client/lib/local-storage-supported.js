export default function () {
  if (process.server || !('localStorage' in window)) {
    return false
  }

  try {
    const uid = new Date()
    localStorage.setItem(uid, uid)
    const success = localStorage.getItem(uid) === uid
    localStorage.removeItem(uid)
    return success
  } catch (exception) {
    return false
  }
}
