const categoryList = document.getElementById('categories-list');
const listPanel = document.getElementById('list-panel');
const nothingSelected = '<p>No categories selected...</p>';
const nav = document.getElementById('navbar');

function openNav() {
    nav.style.width = "100%";
}

function closeNav() {
    nav.removeAttribute("style");
}

function addNothingText() {
    if (listPanel.innerHTML == "") {
        listPanel.innerHTML = nothingSelected;
    }
}

function clearNothingText() {
    if (listPanel.innerHTML == nothingSelected) {
        listPanel.innerHTML = "";
    }
}

function removeListItem(listParent, listItem) {
    listParent.removeChild(listItem);
    addNothingText();
}

function populateCategories() {
    for (let k = 0; k < kitList.length; k++) {
        let category = kitList[k].category;

        let li = document.createElement('li');
        li.classList.add('side-nav__list-item');
        li.classList.add('list-item');
        li.textContent = capitalizeFirstLetter(category);

        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'category');
        input.setAttribute('value', category);

        let span = document.createElement('span');
        span.setAttribute('class', 'checkmark');

        li.appendChild(input);
        li.appendChild(span);
        categoryList.appendChild(li);
    }

    addCategoryCheckOnClick(getCategories());
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCategories() {
    return document.getElementsByClassName('side-nav__list-item');
}

function addCategoryCheckOnClick(categories) {
    for (let category of categories) {
        category.onclick = function() {
            selectCategory(category);
        };
    }
}

function selectCategory(category) {
    let checkbox = category.getElementsByTagName('input')[0];
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        addKit(category);
    } else {
        removeKit(category);
    }
}

function getKitItems() {
    return document.getElementsByClassName('kit-item');
}

function addKitItemCheckOnClick(kitItems) {
    for (let item of kitItems) {
        item.onclick = function() {
            selectKit(item);
        };
    }
}

function selectKit(item) {
    let checkbox = item.getElementsByTagName('input')[0];
    checkbox.checked = !checkbox.checked;
}

function addKit(category) {
    for (let k = 0; k < kitList.length; k++) {
        let kitCategory = capitalizeFirstLetter(kitList[k].category);
        if (kitCategory === category.textContent) {
            let kit = kitList[k].kit;
            clearNothingText();
            for (let kitIndex in kit) {
                let kitItem = kit[kitIndex];

                let itemContainer = document.createElement('li');
                itemContainer.setAttribute('id', kitItem);
                itemContainer.classList.add('list-item');
                itemContainer.classList.add('kit-item');

                let removeIt = document.createElement('span');
                removeIt.setAttribute('class', 'remove-it');
                removeIt.textContent = 'x';
                removeIt.onclick = function() {
                    removeListItem(listPanel, itemContainer);
                }

                let input = document.createElement('input');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('name', 'kitItem');
                input.setAttribute('value', kitItem);

                let span = document.createElement('span');
                span.setAttribute('class', 'checkmark');

                let itemText = document.createElement('p');
                itemText.setAttribute('class', 'kit-text');
                itemText.textContent = capitalizeFirstLetter(kitItem);

                itemContainer.appendChild(removeIt);
                itemContainer.appendChild(input);
                itemContainer.appendChild(span);
                itemContainer.appendChild(itemText);
                listPanel.appendChild(itemContainer);
            }
        }
    }
    addKitItemCheckOnClick(getKitItems());
}

function removeKit(category) {
    for (let k = kitList.length - 1; k >= 0; k--) {
        let kitCategory = capitalizeFirstLetter(kitList[k].category);
        if (kitCategory === category.textContent) {
            let kit = kitList[k].kit;
            for (let item of kit) {
                for (listed of listPanel.children) {
                    if (item === listed.id) {
                        removeListItem(listPanel, listed)
                    }
                }
            }
        }
    }
}

addNothingText();
populateCategories();