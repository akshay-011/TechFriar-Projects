document.addEventListener("DOMContentLoaded", () => {
    resize()
})
document.addEventListener('resize', () => {
    resize()
})
const resize = () =>{
    let height  = document.getElementById("charts").clientHeight;
    
    document.getElementById('readings').style.height = `${height}px`

}

