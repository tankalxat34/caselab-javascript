
window.onload = () => {
    document.querySelector("#myBtn").addEventListener("click", () => {
        document.querySelector("#spoiler").classList.toggle("closed");
    });
    document.addEventListener("keyup", (event) => {
        if (event.keyCode === 27) document.querySelector("#spoiler").classList.add("closed");
    });
}