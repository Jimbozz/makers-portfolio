const formElement = document.querySelector('form#contact-form');
const thanks = document.getElementById('thanks');
const fail = document.getElementById('fail');


function submitSuccess() {
  formElement.setAttribute('hidden', '');
  thanks.removeAttribute('hidden');
}
function submitFail() {
  formElement.setAttribute('hidden', '');
  fail.removeAttribute('hidden');
}

async function onSubmit(event) {
  event.preventDefault(); 
  
  try {
    const response = await fetch(event.target.action, {
      method: formElement.method,
      body: new FormData(formElement)
         
    });
    const data = await response.json();
    console.log(data);
    
    submitSuccess();

  } catch(error) {
    
    submitFail();
    console.log(error);
  }
}

formElement.onsubmit = onSubmit;