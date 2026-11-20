
const form = document.querySelector('#myForm');
const imageInput = document.querySelector('#imageInput');
const imageSelectedDisplay = document.querySelector("#imageSelectedDisplay");
const responseContent = document.querySelector("#responseContent");
const submitBtn = document.querySelector("#submitBtn");

// update file label if input changes
imageInput.addEventListener('change', (e) => {
  // check if file was added
  if(imageInput.files.length > 0){
    imageSelectedDisplay.textContent = imageInput.files[0].name
  } else {
    imageSelectedDisplay.textContent = 'No file selected';
  }
})

// main form handler
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // stop page reload

  responseContent.textContent = 'Thinking...';
  submitBtn.disabled = true;

  // grabs all inputs using their 'name'
  const formData = new FormData(form);

  try {
    const response = await fetch('/api/generate-response', {
      method: 'POST',
      body: formData
    });
    responseContent.textContent = await response.text();
  } catch (err) {
    responseContent.textContent = `Request failed: ${err}`
  } finally {
    submitBtn.disabled = false;
  }
})
