import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<section id="center">
  <div>
    <h1>Your Very Important Bookmarks</h1>
    <p>stored with us for you to keep your head clutter free</p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>


<section id="cards">
  <dialog id="bookmarkDialog">
  <h2>Add Bookmark</h2><div class="inputarea">
  <input type="text" id="bookmarkName" placeholder="Name">
  <input type="url" id="urlName" placeholder="Url"></div><br>
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

let bookmarks = []

add_button.addEventListener(`click`,() => {
  dailog.showModal()
})

closeButton.addEventListener(`click`, () => {
  dailog.close()
  nameInput.value=null
  urlInput.value=null
})

savebutton.addEventListener(`click`,() => {
  const name= nameInput.value.trim()
  let url=urlInput.value.trim()
  if (!name || !url){
    alert(`enter name and url both`)
    return
  }
  bookmarks.push({
    name:name,
    url:url
  })
  const card = document.createElement(`div`)
  card.className="card"
  bookmarkList.append(card)
  dailog.close()
  
})


setupCounter(document.querySelector('#counter'))
