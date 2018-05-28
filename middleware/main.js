export default function ({ route,store }) {

  // console.log(route);
  store.commit('titleStoreinfos',route.name);
  return true
}
