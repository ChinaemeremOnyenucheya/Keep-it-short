// navbar functionality
const toogleShow = () =>{
      let navItem = document.querySelectorAll(".navbar-link");
      navItem.forEach(nav => nav.classList.toggle("navbar-toggleShow"));
    }

document.querySelector(".navbar-toggle").addEventListener("click",toogleShow);

// shortening links functionality
let inputField = document.getElementById("input-field");
let shortenButton = document.getElementById("shorten-button");
let shortenList = document.querySelector(".shorten-links-list");

// EventListener for fetching API
shortenButton.addEventListener("click",() =>{

         let inputValue = inputField.value;

         if(!inputValue.startsWith("http")){
   	         let linkMessage = document.getElementById("notification");
   	         linkMessage.textContent = "Invalid link";
   	
   	         if(inputValue.length === 0){
   		         let linkMessage = document.getElementById("notification");
   	             linkMessage.textContent = "Please add a link";}
   	         }

         else{
	           fetch(`https://api.shrtco.de/v2/shorten?url=${inputField.value}`)

               .then(response => response.json())

               .then(shorten => {
    	                  let linkObject = shorten;
    	                  let link = linkObject.result;
    	                  let shortenLink = link.full_short_link;
    	                  let newLink = document.querySelector(".new-link");
    	                  newLink.value = shortenLink;})

               .catch(err => { console.error(err.message);})

	            let newListElement = document.createElement("li");

	            newListElement.innerHTML = `
	            <input class ="old-link" value = "${inputField.value}"> 
	            <div class="move-left">
	            <input class="new-link" value = "Loading..." type="text">
                <button class="copy-button">Copy</button>
                </div>`;

	            shortenList.insertBefore(newListElement, shortenList.childNodes[0]);
	
                inputField.value = "";
                let linkMessage = document.getElementById("notification");
                linkMessage.textContent = " ";
            }
	
        })

// functionality for copying shortened link
document.body.addEventListener("click",(e) =>{

	      if(e.target.getAttribute("class") === "copy-button"){
			      let copyText=  e.target.previousElementSibling;
                  copyText.select();
                  copyText.setSelectionRange(0, 99999)
                  document.execCommand("copy");
                  e.target.style.backgroundColor = "#3b3054";
                  e.target.textContent = "Copied";}
		
         })












