let body = document.querySelector("body")
let btn = document.querySelector("button")
let h2 = document.querySelector("h2")
let data = prompt("Enter user name")
console.log(data)

h2.innerText = "Yoo Bro" + " " + data

let check = 0

btn.addEventListener("click", function () {
    if (check == 0)
    {
        body.style.backgroundColor = "blue"
        check = 1
    } else {
        if (check == 1)
        {
            body.style.backgroundColor = "Red"
            check = 2
        }else {
            if (check == 2)
            {
                body.style.backgroundColor = "Yellow"
                check = 3
            } else {
                body.style.backgroundColor = "Yellow"
                check = 0
             }
        }   
    }
})