import {Component} from "../core/component";
import {apiService} from "../services/api";
import {Transform} from "../services/transform";

export class Posts extends Component{
  constructor(id, {loader}) {
    super(id);
    this.loader = loader
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = Transform.fbObjectToArray(fbData)
    const html = posts.map(post => renderPost(post))
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

function renderPost(post) {

  const tag = post.type === 'news' ? 'Новость' : 'Заметка'

  const button = `<button class="button-round button-small button-primary">Сохранить</button>`

  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          <li class="tag tag-blue tag-rounded">${tag}</li>
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${button}
      </div>
    </div>
  `
}