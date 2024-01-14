const outputDiv = document.getElementById("outputDiv");
const input = document.getElementById("input");
const calculateButton = document.getElementById("calculateButton");
const nextPageButton = document.getElementById("nextPageButton");
const lastPageButton = document.getElementById("lastPageButton");
const fetchButton = document.getElementById("fetchButton");
const pageCounter = document.getElementById("pageCounter");

lastPageButton.setAttribute("disabled", "disabled");
nextPageButton.setAttribute("disabled", "disabled");

let output = []
let currentPage = 1
let pages = 1
let maxOutputPerPage = 15

pageCounter.innerText = currentPage + " / " + pages;

fetchButton.addEventListener("click", function () { fetchTodo() })
nextPageButton.addEventListener("click", function () { changePage(1) });
lastPageButton.addEventListener("click", function () { changePage(-1) });
calculateButton.addEventListener("click", function () {
    input.value.trim().split(" ").forEach(w => {
        if (w != '') {
            const element = document.createElement("div");
            element.innerText = w;
            element.className = "output";
            output.push(element);
            input.value = '';
        }
    })

    pages = parseInt(output.length / maxOutputPerPage - 1 / maxOutputPerPage) + 1;

    handlePageButtonEnabling()
    addElements();
})

function handlePageButtonEnabling() {
    if (currentPage == 1) {
        lastPageButton.setAttribute("disabled", "disabled");
    } else {
        lastPageButton.removeAttribute("disabled");
    }

    if (currentPage == pages) {
        nextPageButton.setAttribute("disabled", "disabled");
    } else {
        nextPageButton.removeAttribute("disabled");
    }

    pageCounter.innerText = currentPage + " / " + pages;
}

function addElements() {
    outputDiv.innerHTML = '';
    for (let i = (currentPage - 1) * maxOutputPerPage; i < currentPage * maxOutputPerPage; i++) {
        if (output[i] != null) {
            outputDiv.appendChild(output[i]);
        }
    }
}

function changePage(offset) {
    if (currentPage + offset >= 1 && currentPage + offset <= pages) {
        currentPage = currentPage + offset
        handlePageButtonEnabling()
        addElements()
    }
}

async function fetchTodo() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todoJSON = await response.json();
        input.value = todoJSON[Math.floor(Math.random() * todoJSON.length)].title;
    } catch(error) {
        console.log(error);
    }
    
}