const buttons = document.querySelectorAll(".player");
var generateButton = document.getElementById("generateButton");
var count = 0;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
        buttons.forEach(button => {
            if (button.classList.contains("active")) {
                count++;  
            };
        });
        generateButton.textContent = "Generate (" + count + ")";
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
        alert("Program još nije gotov! :(");
    }
    count = 0;
});
