const url = "http://makerstories.no/index.php/wp-json/wp/v2/posts?per_page=10&_embed";
const corsEnabledOne = "https://noroffcors.herokuapp.com/" + url;
const newUrl = "http://makerstories.no/index.php/wp-json/wp/v2/posts?per_page=20&_embed";
const corsEnabledTwo = "https://noroffcors.herokuapp.com/" + newUrl;
const loadMore = document.querySelector('.load-more');
const blogContainer = document.querySelector(".blog-container");



async function getPosts() {

  try {
    const response = await fetch(corsEnabledOne);
    const getResults = await response.json();
    createHTML(getResults);
    let clicked = false;
    console.log(getResults);

    loadMore.addEventListener('click', function() {

      async function morePosts() {
        try {
          const response = await fetch(corsEnabledTwo);
          const newResults = await response.json();

          clicked = true;
    
          if(clicked) { 
            blogContainer.innerHTML = "";
            createHTML(newResults);
            loadMore.style.display = "none";

          }else {
           false
          }
        }
        catch(error) {
          console.log(error);
        }
      }
      morePosts();
    })   
  }
  catch(error) {
    console.log(error);
  }
}

getPosts();


function createHTML(posts) {
  posts.forEach(function(post) {
    const image = post._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
    const imageText = post._embedded["wp:featuredmedia"][0].alt_text;
    

    blogContainer.innerHTML += `
    <a class="blog-link" href="/blog-article.html?id=${post.id}">
      <article class="blog-card">
        <img class="blog-image" src="${image}" alt="${imageText}">
        <address class="author">${post._embedded.author[0].name}</address>
        <div class="blog-card-title">${post.title.rendered}</div>
      </article>
    </a>`
    ; 
  })
}


//Filter buttons functions

let clicked = false;

const filterAll = document.querySelector('.filter-all');
const allUrl = "http://makerstories.no/index.php/wp-json/wp/v2/posts?categories=1&per_page=20&_embed";
const corsAll = "https://noroffcors.herokuapp.com/" + allUrl;

filterAll.addEventListener('click', function() {
  
  async function filter() {
    try {
      const response = await fetch(corsAll);
      const filterResults = await response.json();
      clicked = true;
      
      if(clicked) { 
        blogContainer.innerHTML = "";
        createHTML(filterResults)
        loadMore.style.display = "none";
        
      }else {
        false
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  filter();
})


const photoUrl = "http://makerstories.no/index.php/wp-json/wp/v2/posts?categories=2&_embed";
const corsPhoto = "https://noroffcors.herokuapp.com/" + photoUrl;
const filterPhotography = document.querySelector('.filter-photo');
filterPhotography.addEventListener('click', function() {
  
  async function filter() {
    try {
      const response = await fetch(corsPhoto);
      const filterResults = await response.json();
      loadMore.style.display = "none";
      clicked = true;
      
      if(clicked) { 
        blogContainer.innerHTML = "";
        createHTML(filterResults)
        
      }else {
        false
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  filter();

})

const illustrationUrl = "http://makerstories.no/index.php/wp-json/wp/v2/posts?categories=4&_embed";
const corsIllustration = "https://noroffcors.herokuapp.com/" + illustrationUrl;
const filterIllustration = document.querySelector('.filter-illustration');
filterIllustration.addEventListener('click', function() {
  
  async function filter() {
    try {
      const response = await fetch(corsIllustration);
      const filterResults = await response.json();
      loadMore.style.display = "none";
      clicked = true;
      
      if(clicked) { 
        blogContainer.innerHTML = "";
        createHTML(filterResults)

      }else {
        false
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  filter();

})

const musicUrl = "http://makerstories.no/index.php/wp-json/wp/v2/posts?categories=5&_embed";
const corsMusic = "https://noroffcors.herokuapp.com/" + musicUrl;
const filterMusic = document.querySelector('.filter-music');
filterMusic.addEventListener('click', function() {
  
  async function filter() {
    try {
      const response = await fetch(corsMusic);
      const filterResults = await response.json();
      loadMore.style.display = "none";
      clicked = true;
      
      if(clicked) { 
        blogContainer.innerHTML = "";
        createHTML(filterResults)

      }else {
        false
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  filter();

})

const filmUrl = "http://makerstories.no/index.php/wp-json/wp/v2/posts?categories=3&_embed";
const corsFilm = "https://noroffcors.herokuapp.com/" + filmUrl;
const filterFilm = document.querySelector('.filter-film');
filterFilm.addEventListener('click', function() {
  
  async function filter() {
    try {
      const response = await fetch(corsFilm);
      const filterResults = await response.json();
      loadMore.style.display = "none";
      clicked = true;
      
      if(clicked) {
        blogContainer.innerHTML = "";
        createHTML(filterResults)

      }else {
        false
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  filter();
})