import {Component} from "../core/component";
import {apiService} from "../services/api";
import {renderPost} from "../templates/post";

export class Favourite extends Component{
  constructor(id, {loader} ) {
    super(id);

    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  onShow() {
    const favourite = JSON.parse(localStorage.getItem('favourite'))
    const html = renderList(favourite)
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

async function linkClickHandler(event) {
  event.preventDefault()
  if(event.target.classList.contains('js-link')) {
    const postId = event.target.dataset.id
    this.$el.innerHTML = ''
    this.loader.show()
    const post = await apiService.fetchPostById(postId)
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, false))
  }
}

function renderList(list = []) {
  console.log(list)
  if(list.length) {
     return `
        <ul>
            ${list.map( i =>       
              `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`
            ).join(' ')}
        </ul>
     `
  }

  return `<h1 class="h5">Вы пока ничего не добавили</h1>`
}