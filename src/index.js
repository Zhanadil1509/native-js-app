import {Header} from "./components/header";
import {Navigation} from "./components/navigation";
import {Create} from "./components/create";
import {Posts} from "./components/posts";
import {Favourite} from "./components/favourite";

new Header('header')

const navigation = new Navigation('navigation')

const create = new Create('create')
const posts = new Posts('posts')
const favourite = new Favourite('favourite')

navigation.registerTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favourite', component: favourite}
])