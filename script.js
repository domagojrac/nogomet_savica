var generateButton = document.getElementById("generateButton");
var count = 0;
const selectAudio = new Audio("Music/Game Menu Select Sound Effect (1).mp3");
const unselectAudio = new Audio();
const anthemAudio = new Audio("Music/UEFA Champions League Hymne Stadion Version _ Lyrics.mp3");

const container = document.querySelector("#allPlayers");
container.addEventListener("click", function(e) {
    count=0;
    if (e.target.classList.contains("player")) {
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            selectAudio.currentTime = 0;
            selectAudio.play();
        } else {
            unselectAudio.currentTime = 0;
            unselectAudio.play();
        };
    };
    const buttons = document.querySelectorAll(".player");
    
    buttons.forEach(button => {
        if (button.classList.contains("active")) {
            count++;  
        };
    });

    generateButton.textContent = "Generate (" + count + ")";
        if (count == 12) {
            generateButton.style.backgroundColor = "green";
        } else {
            generateButton.style.backgroundColor = "red";
        };
});

        

generateButton.addEventListener("click", () => {
    const buttons = document.querySelectorAll(".player");   
    if (count < 12) {
        alert("Nedostaje ti " + (12 - count) + " igrača!");
    } else if (count > 12) {
        alert("Imaš " + (count - 12) + " igrača previše!");
    } else {
        createTeams();
        window.open("teams.html", "_self");  
    };
    count = 0;
});


function createList() {
    var selectedPlayers = {};
    const buttons = document.querySelectorAll(".player");  
    buttons.forEach(button => {
        if (button.classList.contains("active")) {
            selectedPlayers[button.getAttribute("Name")] = Number(button.getAttribute("Rating"));
        };
    });
    return selectedPlayers;
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
function store(item1, item2) {
    sessionStorage.setItem("teamWhite", JSON.stringify(item1));
    sessionStorage.setItem("teamBlack", JSON.stringify(item2));
};

function storePlayers(item) {
    sessionStorage.setItem("selectedPlayers", JSON.stringify(item));
};

function get(item1, item2) {
    var teamWhite = JSON.parse(sessionStorage.getItem(item1));
    var teamBlack = JSON.parse(sessionStorage.getItem(item2));
}


function createTeams() {
    var playerValues = [];
    var selectedPlayers = createList();
    var playerEntries = Object.entries(selectedPlayers);

    storePlayers(selectedPlayers);

    playerEntries.sort((a, b) => b[1] - a[1]);

    var teamWhite = [];
    var teamBlack = [];
    
    // Split the top two players into different teams
    teamWhite.push(playerEntries[0][0]); 
    teamBlack.push(playerEntries[1][0]);
    
    playerEntries.splice(0, 2);

    var totalValue = playerEntries.reduce((sum, player) => sum + player[1], 0);
    var goalValue = totalValue / 2;

    var checkSum = 0;

    while (Math.abs(checkSum - goalValue) > 2) {
        checkSum = 0;
        playerEntries = playerEntries.sort(() => 0.5 - Math.random());

        for (let i = 0; i < 5; i++) {
            checkSum += playerEntries[i][1];
        }
    }

    for (let i = 0; i < 5; i++) {
        teamWhite.push(playerEntries[i][0]);
    }

    for (let i = 5; i < 10; i++) {
        teamBlack.push(playerEntries[i][0]);
    }

    store(teamWhite, teamBlack);
};