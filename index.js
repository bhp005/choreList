let myChor = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEL = document.getElementById("ul-el");
const closeBtn = document.getElementById("close-btn");
const chorFromLocalStorage = JSON.parse(localStorage.getItem("myChor"));


if (chorFromLocalStorage) {
    myChor = chorFromLocalStorage;
    render(myChor);
}

function render(chore) {
    let listItems = "";
    for (let i = 0; i < chore.length; i++) {
        listItems += `<li class="chore-item">${chore[i]}
        <button class="delete-btn" data-index="${i}">❌</button>
        </li>`;
    }
    ulEL.innerHTML = listItems;

    // Attach event listeners to delete buttons AFTER rendering
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", function(event) {
            const index = event.target.getAttribute("data-index");
            myChor.splice(index, 1);
            localStorage.setItem("myChor", JSON.stringify(myChor));
            render(myChor);
        });
    });
}

function chorExists(newChore) {
    for (let i = 0; i < myChor.length; i++) {
        if (myChor[i].toLowerCase() === newChore.toLowerCase()) {
            return true;
        }
    }
    return false;
}

closeBtn.addEventListener("click", function () {
    localStorage.clear();
    myChor = [];
    render(myChor);
})

inputBtn.addEventListener("click", function () {
    const newChore = inputEl.value.trim();
    
    // Only add the chore if it's not empty and doesn't already exist
    if (newChore !== "") {
        if (chorExists(newChore)) {
            alert("This chore already exists in your list!");
        } else {
            myChor.push(newChore);
            inputEl.value = "";
            localStorage.setItem("myChor", JSON.stringify(myChor));
            render(myChor);
        }
    }
});



