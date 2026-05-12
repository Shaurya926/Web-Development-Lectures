let body = document.querySelector("body")
let btn = document.querySelector("button")
let check=true
btn.addEventListener("click", function () {
    if (check) {
        body.style.backgroundColor = "blue"
        check = false
    } else 
    {
        body.style.backgroundColor = "Red"
        check = true
    }
})
