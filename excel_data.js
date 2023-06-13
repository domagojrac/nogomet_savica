
let allPlayersElm = document.getElementById("allPlayers")
let loaderElm = document.getElementById("loader")
let errorMessageElm = document.getElementById("errorMessage")
	
function setErrorDisplay(){
	loaderElm.style.display = "none"
	allPlayersElm.style.display = "none"
	errorMessageElm.style.display = "block"
}
        
fetch("https://api.apispreadsheets.com/data/KrDsZ4AFnODMCGMS/").then(res=>{
	if (res.status === 200){
        res.json().then(data=>{
			const yourData = data["data"]
				for(let i = 0; i < yourData.length; i++){
				    let playerInfo = yourData[i]

				    let playerInfoDiv = document.createElement("button")
				    playerInfoDiv.classList.add("player")
                    playerInfoDiv.style.backgroundImage = "url('Photos/"+playerInfo["Name"]+".jpg')";
                    playerInfoDiv.setAttribute("Name", playerInfo["Name"])
                    playerInfoDiv.setAttribute("Rating", playerInfo["Rating"])
                    
					
				    let playerName = document.createElement("h4")
				    let playerNameNode = document.createTextNode(playerInfo["Name"])
				     playerName.appendChild(playerNameNode)
				     playerName.classList.add("name")
					
				    let playerRating = document.createElement("p")
				    let playerRatingNode = document.createTextNode(playerInfo["Rating"])
				     playerRating.appendChild(playerRatingNode)
				     playerRating.classList.add("rating")
					
				    playerInfoDiv.appendChild(playerName)
				    playerInfoDiv.appendChild(playerRating)
					
				    allPlayersElm.appendChild(playerInfoDiv)
				}
				
				loaderElm.style.display = "none"
				allPlayersElm.style.display = "block"
				errorMessageElm.style.display = "none"

    
		}).catch(err => console.log(err))
	}
	else {
        setErrorDisplay()
			}
		}).catch(err =>{
			setErrorDisplay()
		})



		