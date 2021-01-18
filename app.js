const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

const items = [];

function handleSubmit(event) {
    event.preventDefault(); 
    const name = event.currentTarget.item.value;
    const item = {
        name,
        id: Date.now(),
        complete: false,
    };
    items.push(item);
    console.log(`There are now ${items.length} items in your state`);
    event.target.reset();
    displayItems(item)
}

function displayItems() {
    const html = items.map(
        item => `<li class="shopping-item">
        <input type="checkbox">
        <span class="itemName">${item.name}</span>
        <button area-label="Remove ${item.name}">&times;</button>
        </li>`
    )
    .join('');
    list.innerHTML = html;
}

shoppingForm.addEventListener('submit', handleSubmit);