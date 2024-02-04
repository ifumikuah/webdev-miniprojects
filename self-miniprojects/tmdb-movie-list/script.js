const container = document.getElementById("card-container")
const search = document.getElementById("search")
const pageTitle = document.getElementById("page-title")

const key = "f5db75d695de5c4f6e97687738ad2961"
const server = "https://api.themoviedb.org/3"
const endpoint = "/movie/popular"

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

getMovies(`${server+endpoint}?api_key=${key}&language=en-US&page=2`)

function showMovies(data) {
  const imgURL = "https://image.tmdb.org/t/p/w500"
  const generateCards = data.map((movie) => {
    return `
      <div class="card">
        <img class="card-img" src="${imgURL+movie.poster_path}" alt="">
        <div class="card-info-container">
          <div>
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-release">${movie.release_date}</p>
          </div>
          <p class="rating">${movie.vote_average.toFixed(2)}</p>
        </div>
        <div class="synopsis-container">
          <h3 class="synopsis-title">${movie.title}</h3>
          <p class="synopsis">
            ${movie.overview}
          </p>
        </div>
      </div>
    `
  }).join("")
  container.innerHTML = generateCards
}

search.addEventListener("submit", async function (target) {
  target.preventDefault()
  const form = search.firstElementChild;
  const searchEndpoint = "/search/movie?query=" + form.value + "&page=2"
  const res = await fetch(`${server+searchEndpoint}&api_key=${key}`)
  const data = await res.json()

  showMovies(data.results)
  pageTitle.innerText = "Search: " + form.value
})

const darkmode = document.getElementById("darkmode")
darkmode.addEventListener("click", (event) => {

  if (localStorage.getItem("dark") === "active") {
    darkmode.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`
    localStorage.setItem("dark", "inactive")
    document.body.classList.toggle("dark")
  }  else {
    darkmode.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`
    localStorage.setItem("dark", "active")
    document.body.classList.toggle("dark")
  }
})