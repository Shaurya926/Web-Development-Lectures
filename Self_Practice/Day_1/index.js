console.log("hello")
let c = document.querySelector('button')
let b = document.querySelector('body')
let skyblue = true;
c.addEventListener("click", function () {
    console.log("hello");
    if (!skyblue) {
        skyblue = true;
        b.style.backgroundColor = "skyblue";
    }
    else {
        skyblue = false
        b.style.backgroundColor = "pink";
    }
})