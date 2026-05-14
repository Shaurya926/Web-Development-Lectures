let box=document.querySelectorAll("button")
 let resetBtn=  document.querySelector("#reset")
 let msgBox=  document.querySelector("h2")

 let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[0,4,8],[2,4,6],[2,5,8]]
 let turn0=true
 for(let a of box){
    a.addEventListener("click",()=>{
        console.log("hello");
        if(turn0){
            a.innerText="0"
            turn0=false
            a.disabled=true
            // checkWinner()
        }else{
            a.innerText="X"
            turn0=true
            a.disabled=true
            checkWinner()

        }
        
        
    })
 }

 function checkWinner(){
    for(let pattern of win){
     let x =  box[pattern[0]].innerText
    let y  =  box[pattern[1]].innerText
    let z  =  box[pattern[2]].innerText
    if(x!="" && y!="" && z!=""){
        if(x==y && y==z){
            msgBox.innerText=  x+"aap jeet gayee hehehe"
            console.log("kyaaaaaaaaaaaa");
            
          }
          

    }
   

    }

 }