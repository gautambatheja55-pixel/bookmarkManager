import './style.css'

document.querySelector('#app').innerHTML = `
<section id="center">
  <div>
    <h1>Your Very Important Bookmarks</h1>
    <p>stored with us for you to keep your head clutter free</p>
  </div>
</section>


<section id="cards">
  <dialog id="bookmarkDialog">
  <h2>Add Bookmark</h2><div class="inputarea">
  <input type="text" id="bookmarkName" placeholder="Name">
  <input type="url" id="urlName" placeholder="https://"></div><br>
  <div class="buttonarea">
  <button id="saveBookmark">Save</button>
  <button id="closeDialog">Cancel</button>
  </div>
  </dialog>
  <div id="docs">
    <h2>Cards</h2>
    <button class="add_button">Add Bookmark</button>
    </div>
    <div id="bookmarkList"></div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`
const dailog = document.querySelector(`#bookmarkDialog`)
const add_button = document.querySelector(`.add_button`)
const closeButton = document.querySelector(`#closeDialog`)
const nameInput = document.querySelector(`#bookmarkName`)
const urlInput = document.querySelector(`#urlName`)
const bookmarkList = document.querySelector(`#bookmarkList`)
const savebutton = document.querySelector(`#saveBookmark`)

let bookmarks = JSON.parse(localStorage.getItem(`bookmarks`)) || []


function renderBookmarks(){
  bookmarkList.innerHTML=``
  bookmarks.forEach((bookmark,index) => {
  const card = document.createElement(`a`)
  card.className=`card`
  card.href=bookmark.url
  card.target = `_blank`
  card.rel=`noopener noreferrer`

  const logo = document.createElement(`img`)
  logo.className=`logo`
  logo.src=`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=128`
  
  const title = document.createElement(`h3`)
  title.textContent=bookmark.name
  card.append(logo,title)
  const deleteButton = document.createElement(`button`)
  deleteButton.textContent=`x`
  deleteButton.className=`delete-button`
  deleteButton.type=`button`
  deleteButton.addEventListener(`click`, (event) => {
    event.preventDefault()
    event.stopPropagation()
    bookmarks.splice(index,1)
    localStorage.setItem(`bookmarks`, JSON.stringify(bookmarks))
    renderBookmarks()
  })
  card.append(logo,title,deleteButton)
  bookmarkList.append(card)
  })
}

add_button.addEventListener(`click`,() => {
  dailog.showModal()
})

closeButton.addEventListener(`click`, () => {
  dailog.close()
  nameInput.value=``
  urlInput.value=``
})

savebutton.addEventListener(`click`,() => {
  const name= nameInput.value.trim()
  let url=urlInput.value.trim()
  if (!name || !url){
    alert(`enter name and url both`)
    return
  }
  if (!/^https?:\/\//i.test(url)){
    url=`https://`+url
  }
  try {
    const parsedUrl = new URL(url)
    if (![`http:`,`https:`].includes(parsedUrl.protocol)){
      throw new Error(`invalid url`)
    }
    bookmarks.push({name:name,url:parsedUrl.href})
    localStorage.setItem(`bookmarks`,JSON.stringify(bookmarks))
    renderBookmarks()
    nameInput.value=``
    urlInput.value=``
    dailog.close()
  } catch {
    alert(`enter valid url`)
  }
})

  renderBookmarks()
