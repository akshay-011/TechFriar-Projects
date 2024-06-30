const removeWarning = (className) => {
    document.getElementsByName(className)[0].classList.remove("input-field-warn");
}

module.exports = removeWarning