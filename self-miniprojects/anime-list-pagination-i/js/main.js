// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
  
//
// Place any custom JS here
//

// Create an example popover
// document.querySelectorAll('[data-bs-toggle="popover"]')
// .forEach(popover => {
//   new bootstrap.Popover(popover)
// })

// Handlebars

const source = document.getElementById("hbsTemplate").innerHTML
const template = Handlebars.compile(source);

// Fetch API

async function fetchAPI(url, endpoint, queries) {
  let querystr = []
  for (const [key, val] of Object.entries(queries)) {
    querystr.push(`${key}=${val}`);
  }
  
  const fullURL = `${url}${endpoint}?${querystr.join("&")}`
  const res = await fetch(fullURL)
  const data = await res.json()
  
  return data
}

let currentPage = 1;
const url = "https://api.jikan.moe/v4";
const popularEndpoint = "/top/anime";
const popularEndpointQuery = {"page": currentPage, "limit": 24}

fetchAPI(url, popularEndpoint, popularEndpointQuery)
.then(data => {
  console.log(data);
  const generateHTML = template( data );
  document.getElementById("hbs-output").innerHTML = generateHTML

  const maxPage = data.pagination.last_visible_page
  pagination.addEventListener("click", (event) => {
    if (event.target.classList.contains("page")) {
      const currentPageElement = event.target
      pagination.innerHTML = DisplayPagination(pageClasses, maxPage, Number(currentPageElement.dataset.page)).join("")
      currentPage = Number(currentPageElement.dataset.page)
      
      fetchAPI(url, popularEndpoint, {"page": currentPage, "limit": 24})
      .then(data => {
        const generateHTML = template( data );
        document.getElementById("hbs-output").innerHTML = generateHTML
      })
    }
    const markedPage = document.querySelector(`[data-page="${currentPage}"]`);
    markedPage.classList.add("bg-success")
  })
  pagination.innerHTML = DisplayPagination(pageClasses, maxPage, 1).join("")
  
  const markedPage = document.querySelector(`[data-page="${currentPage}"]`);
  markedPage.classList.add("bg-success")
})

function searchQuery(str) {
  const searchEndpoint = "/anime";
  const searchEndpointQuery = {"q": str, "page": currentPage}
  fetchAPI(url, searchEndpoint, searchEndpointQuery)
  .then(data => {
    const generateHTML = template( data );
    document.getElementById("hbs-output").innerHTML = generateHTML
    })
  }
  
const search = document.getElementById("search");
  
search.addEventListener("submit", (e) => {
  e.preventDefault()
  const val = search.firstElementChild.value
  
  searchQuery(val)
})

const pagination = document.getElementById("pagination");
const pageClasses = "page bg-primary d-flex align-items-center justify-content-center mx-1 rounded-2";
  
function DisplayPagination(classes, total, current) {
  const pages = []
  let i = 1
  while (i <= total) {
    pages.push(`<div data-page="${i}" class="${classes}">${i}</div>`)
    i++
  }
  if (current === 1) {
    return pages.slice(current - 1, current + 4)
  }
  
  return pages.slice(current - 2, current + 3)
}


