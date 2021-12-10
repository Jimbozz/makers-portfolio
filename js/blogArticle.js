
const wrapper = document.querySelector('.article-wrapper');
const blogText = document.querySelector('.article-wrapper');
const blogHeading = document.querySelector('.article-heading');
const headerImage = document.querySelector('.blog-header');
const title = document.querySelector('title');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const finalId = parseInt(id);

const url = "http://makerstories.no/index.php/wp-json/wp/v2/posts/" + finalId + "?&_embed";

const corsEnabledArticle = "https://noroffcors.herokuapp.com/" + url;


async function blogInfo() {
  try {
    const response = await fetch(corsEnabledArticle);
    const result = await response.json();
   
    title.innerHTML = `${result.title.rendered}`;
    wrapper.innerHTML = "";
    createHTML(result);
    createModal();

  }
  catch(error) {
    console.log(error);
  }

}

blogInfo();



//Function for creation of HTML

function createHTML(result) {
  
  const image = result._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  const genre = result._embedded["wp:term"][0][0].slug;
  const genreUp = genre.charAt(0).toUpperCase() + genre.slice(1);
  const title = result._embedded["wp:featuredmedia"][0].alt_text;
  

  headerImage.style.backgroundImage = `url(${image})`;
  headerImage.title = title;

  let htmlString = "";

  htmlString += `
    <section class="article-heading">
      <div class="genre">${genreUp}</div>
      <h1 class="article-title">${result.title.rendered}</h1>
    </section>
    <div class=article-text>
    ${result.content.rendered}
    </div>
    <section class="article-share">
          <p>Share this article...</p>
          <ul>
            <li><a class="article-link" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A5500%2Fblog-article.html&amp;src=sdkpreparse" target="_blank">Facebook</a></li>
            <li><a class="article-link" href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fblog-article.com%2F">Twitter</a></li>
          </ul>
        </section>`
  ;

  wrapper.innerHTML = htmlString;
}


//Function for modal

function createModal() {

  const figures = document.querySelectorAll('figure');
  
  for (let figure of figures) {

    //Inserts close button
    const node = document.createElement("I"); 
    document.querySelector("figure").appendChild(node);
    node.className = "fas fa-times";

    figure.addEventListener("click", function() {
      
      clicked = true
  
      if(clicked) { 
        figure.classList.toggle("modal");
        node.style.display = "block";
      }
    
    });
  }
}


// blog comments


const postLink = document.querySelector('#comments-heading');
const formWrapper = document.querySelector('.comments-wrapper');
// const commentsForm = document.querySelector('form.comments-form');

postLink.addEventListener("click", function() {
      
  // createForm();
	commentsForm.style.display = "block";

});


// function createForm() {
 
//   formWrapper.innerHTML += `
//   <form class="comments-form" action="https://www.makerstories.no/wp-json/contact-form-7/v1/contact-forms/228/feedback" method="post">
//     <input type="hidden" id="postId" value=${finalId}>
//     <div class="form-styles">
//       <label for="your-name">Name*</label>
//       <input class="form-control" id="your-name" name="your-name" type="text" required>
    
//       <label for="your-email">Email*</label>
//       <input class="form-control" id="your-email" name="your-email type="email" required>
    
//       <label for="your-message">Comment*</label>
//       <textarea class="form-control" type="text" name="your-message" id="your-message" cols="30" rows="10"></textarea>
//       <button class="contact-button" type="submit">Post comment</button>
//     </div>
//   </form>`
//   ;   
// }

//Grab form data using async function for comments



const thanks = document.getElementById('thanks');
const fail = document.getElementById('fail');
const commentsForm = document.querySelector('form.comments-form');


function submitSuccess() {
  commentsForm.setAttribute('hidden', '');
  thanks.removeAttribute('hidden');
	commentsForm.style.display = "none";
}
function submitFail() {
  commentsForm.setAttribute('hidden', '');
  fail.removeAttribute('hidden');
}


async function onSubmit(event) {
  event.preventDefault(); 
  
  try {
    const response = await fetch(event.target.action, {
      method: commentsForm.method,
      body: new FormData(commentsForm)
         
    });
    const data = await response.json();
    console.log(data);
    
    submitSuccess();

  } catch(error) {
    
    submitFail();
    console.log(error);
  }
}

commentsForm.onsubmit = onSubmit;