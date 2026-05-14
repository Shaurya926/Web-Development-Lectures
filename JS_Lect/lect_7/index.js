// const arr = [
//     'https://images.unsplash.com/photo-1777829999062-917dd30ad425?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1778513811598-6ac88ef5cdc4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1778017825902-5d212f5ce532?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// ]
// const imagesEL = document.querySelector('img')
// let num = 0;
// setInterval(function () {
//     imagesEL.setAttribute('src', arr[num])
//     num=(num+1)%arr.length
// },1000)


// let img = document.querySelector("img")
// img.setAttribute("src","byee")
// console.log(img.getAttribute("src"));


// setTimeout(() => {
//     console.log("C")

// },10)
// setTimeout(() => {
//     console.log("B")

// },0)
// console.log("A")


// CALL-BACK Hell Function

// function step1(fn) {
//     setTimeout(() => {
//         console.log("Select the photo");
//         fn()
//     },5000)
// }
// function step2(fn) {
//     setTimeout(() => {
//         console.log("Add Filter");
//         fn()
//     },4000)
// }
// function step3(fn) {
//     setTimeout(() => {
//         console.log("Add Captions");
//         fn()
//     },3000)
// }
// function step4() {
//     setTimeout(() => {
//         console.log("Posted");

//     },1000)
// }

// step1(function () {
//     step2(function () {
//         step3(function () {
//             step4()
//         })
//     })
// })

// Promises

// let p = new Promise((res,rej) => {
//     res()
//     rej()
// })
// p.then(() => {
//     console.log("Promise accomplished");

// }).catch((err) => {
//     console.log(err);

// })

// function step1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Selected");
//             resolve()

//         },2000)
//     })
// }
// function step2() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Filter");
//             resolve()

//         },1000)
//     })
// }
// async function call() {
//    await step1()
//    await step2()
// }
// call()

// API Key...
fetch("https://jsonplaceholder.typicode.com/todos")
    .then((data) => {
        return data.json()

    }).then((val) => {
        console.log(val);

    }).catch((err) => {
        console.log(err);

    })