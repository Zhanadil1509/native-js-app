export function renderPost(post, option) {

  const tag = post.type === 'news' ? 'Новость' : 'Заметка'

  const favourite = (JSON.parse(localStorage.getItem('favourite')) || [])
  const candidate = favourite.find(p => p.id === post.id)

  const button = candidate
    ? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить</button>`
    : `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">В избранное</button>`
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
        ${option ? button : ''}
      </div>
    </div>
  `
}