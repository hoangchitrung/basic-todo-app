const todo = [];

// processing input
const handleInput = () => {
    const input = document.getElementById("input-field");

    // add event add todo by press Enter key
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            if (event.target.value.trim() === "") {
                alert("The field is empty!");
                return;
            }
            
            todo.push(event.target.value.trim());
            renderItem();
            event.target.value = "";
        }
    });
}

// display todo item
const renderItem = () => {
    const ul = document.getElementById("item-list");

    // check if there are any todo in the list
    if (todo.length === 0) {
        const itemList = document.getElementById("item-list");
        itemList.innerHTML = "No todo? You are free!!";
        return;
    }
    // remove old item for new item
    ul.innerHTML = "";

    // create new li every loop
    todo.forEach((i) => {
        const item = document.createElement("li");
        item.innerText = i;

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "🗑️";

        removeBtn.addEventListener('click',() => {
            // find index of item
            const index = todo.findIndex(item => item === i);
            todo.splice(index, 1); // remove one item
            renderItem();
        });

        item.appendChild(removeBtn);
        ul.appendChild(item);
    });
    // document.body.appendChild(ul);
};

// render components
const render = () => {
    handleInput();
    renderItem();
};

render();