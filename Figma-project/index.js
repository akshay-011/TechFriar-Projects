document.addEventListener("DOMContentLoaded", () => {
    resize()
    document.getElementById("create-button").addEventListener('click', () => {
        alert("hsd")
    })
})
document.addEventListener('resize', () => {
    resize()
})
const resize = () =>{
    let height  = document.getElementById("charts").clientHeight;
    
    document.getElementById('readings').style.height = `${height}px`

}
