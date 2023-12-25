let base = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let btn = document.querySelector("button");
let drop = document.querySelectorAll(".drop-down select");
let fromcur = document.querySelector(".from select");
let tocur = document.querySelector(".to select");
let msg = document.querySelector(".msg");
for (let select of drop) {
    for (const curCode in countryList2) {
        let newOption = document.createElement("option");
        newOption.innerText = countryList2[curCode];
        newOption.value = curCode;
        if (select.name == "from" && curCode == "USD") {
            newOption.selected = "selected";
        } else if (select.name == "to" && curCode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

function updateFlag(element) {
    let curCode = element.value;
    let couCode = countryList[curCode];
    console.log(couCode);
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${couCode}/flat/64.png`;
}
async function runExchange() {
    let amt = document.querySelector("input");
    let amtval = amt.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amt.value = "1";
    }
    const url = `${base}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[tocur.value.toLowerCase()];
    let finalamt = amtval * rate;
    msg.innerText = `${amtval} ${fromcur.value} = ${finalamt} ${tocur.value}`;
}
window.addEventListener("load", runExchange())
btn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    runExchange();
})
