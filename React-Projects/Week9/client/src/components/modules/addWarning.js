const addWarning = (className) => {
    document.getElementsByName(className)[0].classList.add("input-field-warn");
}

module.exports = addWarning;