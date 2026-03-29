
// localStorage.setItem("key","hellllooooo")
//  let data=  localStorage.getItem("key")
// //  localStorage.removeItem("key")
//  console.log(data);
let formData = document.querySelector("#formData")
let h2 = document.querySelector("h2")
let h1 = document.querySelector("h1")
let h3 = document.querySelector("h3")

let saveData = JSON.parse(localStorage.getItem("userData"))
if (saveData) {
    h1.innerText = saveData.name
    h2.innerText = saveData.email
    h3.innerText = saveData.pass

}
//    console.log(formData,"heheh");
formData.addEventListener("submit", (e) => {
    e.preventDefault()

    // console.log(formData[0].value);
    // console.log(formData[1].value);
    // console.log(formData[2].value);

    let data = {
        name: formData[0].value,
        email: formData[1].value,
        pass: formData[2].value,

    }



    localStorage.setItem("userData", JSON.stringify(data))
    //  h2.innerText=data.name
    // 


    // console.log("hello");

})









let LoginData = document.querySelector("#LoginData")
LoginData.addEventListener("submit", (e) => {
    e.preventDefault()

    let login = {
        email: LoginData[0].value,
        pass: LoginData[1].value,

    }
    let localStorageData = localStorage.getItem("userData")
    console.log(localStorageData);
    let mainData = JSON.parse(localStorageData)
    console.log(mainData);

    if (login.email === mainData.email && login.pass === mainData.pass) {
        alert("Login Completed...")
    } else {
        alert("Login unsuccessfull...")
    }



})
