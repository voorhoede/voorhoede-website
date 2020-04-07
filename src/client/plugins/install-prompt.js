export default () => {
  window.addEventListener('beforeinstallprompt', event => {
    /**
     * The native install prompt will probably just annoy our users.
     * Later on, nice custom behavior for displaying the install prompt
     * on high interaction points can be added.
     * */
    event.preventDefault()
  })
}
