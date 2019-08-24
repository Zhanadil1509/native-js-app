import {Header} from "./components/header";
import {Navigation} from "./components/navigation";
import {Create} from "./components/create";
import {Posts} from "./components/posts";
import {Favourite} from "./components/favourite";
import {Loader} from "./components/loader";

new Header('header')

const navigation = new Navigation('navigation')

const loader = new Loader('loader')
const create = new Create('create')
const posts = new Posts('posts', {loader})
const favourite = new Favourite('favourite', {loader})

navigation.registerTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favourite', component: favourite}
])