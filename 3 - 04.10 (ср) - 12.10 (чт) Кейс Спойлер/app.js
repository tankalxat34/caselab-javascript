
window.onload = () => {
    document.querySelector("#myBtn").addEventListener("click", () => {
        document.querySelector("#spoiler").classList.toggle("closed");
    });
    document.addEventListener("keyup", (event) => {
        if (!document.querySelector("#spoiler").classList.contains("closed") && event.keyCode === 27) document.querySelector("#spoiler").classList.add("closed");
    });
}