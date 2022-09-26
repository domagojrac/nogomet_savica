const buttons = document.querySelectorAll(".player");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });
}); 