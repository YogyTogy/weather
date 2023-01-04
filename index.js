const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img ");
const weatherField = document.querySelector(".weather3 span ");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "delhi"

const fetchData = async (target) => {

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=6259628ae353489a847162255220712&q=${target}`;

        const response = await fetch(url)
        const data = await response.json()

        const {
            current: {
                temp_c,
                condition: { text, icon },
            },
            location: { name, localtime },

        } = data

        updateDom(temp_c, name, localtime, icon, text)
    } catch (error) {
        alert("Location not found.")
    }
};

function updateDom(temperature, city, time, emoji, text) {

    const exactTime = time.split(" ")[1]
    const exactDate = time.split(" ")[0]
    const exactDay = getDayFullName(new Date(exactDate).getDay())

    temperatureField.innerText = temperature
    cityField.innerText = city
    dateField.innerText = `${exactTime}-${exactDay}-${exactDate}`
    emojiField.src = emoji
    weatherField.innerText = text
}

fetchData(target)

const search = (e) => {
    e.preventDefault();
    target = searchField.value;
    fetchData(target)
    searchField.value = ""
}

form.addEventListener("submit", search)

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";

        default:
            return "IDK"
    }
}