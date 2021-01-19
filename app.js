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
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
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

function mirrorToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems.length) {
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id) {
    console.log('**TODO** deleting item.')
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event Delegation: We listen for the clock on the list <ul> but then delegate the click over to the button if that is what was clicked.
list.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        deleteItem();
    }
});
restoreFromLocalStorage();