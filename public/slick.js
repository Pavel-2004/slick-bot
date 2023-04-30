const id = document.currentScript.getAttribute("id")
const screenWidth = screen.width
const screenHeight = screen.height

const iframe = document.createElement("iframe")
iframe.style.position = "fixed"
iframe.style.right = 0
iframe.style.bottom = 0
iframe.style.border = 'none'
iframe.style.width = "40px"
iframe.style.height = "40px"
iframe.allowTrasnparacy = "true"


iframe.src = "http://localhost:3000/customer-chat"

document.getElementsByTagName("body")[0].append(iframe)
const recieveMessage = (event) => {
  if (event.source !== iframe.contentWindow) return;

  // Get the message data
  var data = event.data;

  if (data.opened) {
    iframe.style.height = "600px"
    iframe.style.width = "500px"
  }
  else {
    iframe.style.height = "40px"
    iframe.style.width = "40px"
    iframe.style.right = 0
    iframe.style.bottom = 0
  }

  // Do something with the data
  console.log(data);

}

window.addEventListener('message', recieveMessage, false)