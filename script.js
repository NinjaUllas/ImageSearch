const accessKey = "jxsTeuuk6g3uL1D4Jktr5KZtH7_ycbjc6jf0n2J9IVI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const SearchResultRow = document.querySelector(".row");
const Showmore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page == 1) {
    SearchResultRow.innerHTML = "";
  }

  results.map((result) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("col");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imageLink);
    SearchResultRow.appendChild(imagewrapper);
  });

  page++;
  if (page > 1) {
    Showmore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

Showmore.addEventListener("click", () => {
  searchImages();
});
