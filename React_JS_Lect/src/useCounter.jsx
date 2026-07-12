import { useState } from "react"
function useCounter(data = 0) {
    let [count, SetCount] = useState(data) 
    const inc=()=>SetCount(count+1)
    const dec=()=>SetCount(count-1)
    const reset = () => SetCount(0)
    return{count,inc,dec,reset}
}
export default useCounter