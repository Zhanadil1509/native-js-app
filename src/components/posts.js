import {Component} from "../core/component";
import {apiService} from "../services/api";
import {Transform} from "../services/transform";
import {renderPost} from "../templates/post";

export class Posts extends Component{
  constructor(id, {loader}) {
    super(id);
    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = Transform.fbObjectToArray(fbData)
    const html = posts.map(post => renderPost(post, true))
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

function buttonHandler(event) {
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.title

  if(id) {
    let favourite = JSON.parse(localStorage.getItem('favourite')) || []
    const candidate = favourite.find( p => p.id === id)
    if(candidate) {
      $el.textContent = 'В избранное'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      favourite = favourite.filter(p => p.id !== id)
    } else {
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')
      $el.textContent = 'Удалить'
      favourite.push({id, title})
    }

    localStorage.setItem('favourite', JSON.stringify(favourite))
  }
}