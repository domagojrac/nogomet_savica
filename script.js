const buttons = document.querySelectorAll(".player");
var generateButton = document.getElementById("generateButton");
var count = 0;
const selectAudio = new Audio("Music/Game Menu Select Sound Effect (1).mp3");
const unselectAudio = new Audio();

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
        if (button.classList.contains("active")) {
            selectAudio.currentTime = 0;
            selectAudio.play();
        } else {
            unselectAudio.currentTime = 0;
            unselectAudio.play();
        }
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
        }
        count = 0;
    });
}); 

generateButton.addEventListener("click", () => {
    buttons.forEach(button => {
        if (button.classList.contains("active")) {
            count++;  
        };
    });    
    if (count < 12) {
        alert("Nedostaje ti " + (12 - count) + " igrača!");
    } else if (count > 12) {
        alert("Imaš " + (count - 12) + " igrača previše!");
    } else {
        window.open("teams.html", "_self");
    };
    count = 0;
});
