const alertElement = (name, color) => {
    document.getElementsByName(name)[0].style.border = "3px solid "+color
}

export default alertElement;