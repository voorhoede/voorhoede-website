export default async function ({ store }) {
    if (!store.state.layoutData) {
        store.dispatch('getLayoutData')
    }
}