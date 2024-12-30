document.querySelectorAll('.list-container .fa-shopping-basket').forEach(icon => {
    icon.addEventListener('click', () => {

        if (icon.dataset.status === 'true') {
            icon.dataset.status = 'false';
            icon.style.color = '#fff';
            const productName = icon.closest('.listitem').querySelector('h3').textContent;
            createList('busket', productName, icon.dataset.status);
        } else {
            icon.dataset.status = 'true';
            icon.style.color = '#f4ff58';
            const productName = icon.closest('.listitem').querySelector('h3').textContent;
            createList('busket', productName, icon.dataset.status);
        }
    });
});

document.querySelectorAll('.list-container .fa-heart').forEach(icon => {
    icon.addEventListener('click', () => {

        if (icon.dataset.status === 'true') {
            icon.dataset.status = 'false';
            icon.style.color = '#fff';
            const productName = icon.closest('.listitem').querySelector('h3').textContent;
            createList('like', productName, icon.dataset.status);
        } else {
            icon.dataset.status = 'true';
            icon.style.color = '#ff9393';
            const productName = icon.closest('.listitem').querySelector('h3').textContent;
            createList('like', productName, icon.dataset.status);
        }
    });
});

const listbox = document.getElementById('listbox');
const boxCon = document.getElementById('box-container');
let currentDisplay = null;
const arrbasket = [];
const arrlike = [];

const updateCount = () => {
    if (arrbasket.length > 0) {
        document.getElementById('basket-count').textContent = arrbasket.length;
        document.getElementById('basket-count').style.display = 'block';
    } else {
        document.getElementById('basket-count').style.display = 'none';
    }

    if (arrlike.length > 0) {
        document.getElementById('like-count').textContent = arrlike.length;
        document.getElementById('like-count').style.display = 'block';
    } else {
        document.getElementById('like-count').style.display = 'none';
    }
};

const createList = (name, productName, status) => {
    const contentText = `${productName}`;
    const item = document.createElement("li");
    item.textContent = contentText;
    item.classList.add(name);
    
    if (status === 'true') {
        listbox.appendChild(item);
        
        if (name === 'busket') {
            arrbasket.push(item);
        } else if (name === 'like') {
            arrlike.push(item);
        }
    } else {

        const items = listbox.querySelectorAll(`li.${name}`);
        items.forEach(existingItem => {
            if (existingItem.textContent === contentText) {
                listbox.removeChild(existingItem);

                if (name === 'busket') {
                    const index = arrbasket.indexOf(existingItem);
                    if (index > -1) arrbasket.splice(index, 1);
                } else if (name === 'like') {
                    const index = arrlike.indexOf(existingItem);
                    if (index > -1) arrlike.splice(index, 1);
                }
            }
        });
    }

    if (currentDisplay) toggleDisplay(currentDisplay);
    updateCount();
};

const toggleDisplay = (type) => {
    const listboxItems = listbox.querySelectorAll('li');

    if (currentDisplay === type) {
        resetIcons();
        currentDisplay = null;
        boxCon.style.display = 'none';
    } else {
        currentDisplay = type;
        boxCon.style.display = 'block';
        listboxItems.forEach(item => {
            item.style.display = item.classList.contains(type) ? 'block' : 'none';
        });

        if (type === 'busket') {
            setActiveIcon('.fa-shopping-basket', '.fa-heart', '#dae63d', '#fff');
        } else if (type === 'like') {
            setActiveIcon('.fa-heart', '.fa-shopping-basket', '#d86161', '#fff');
        }
    }
};

function setActiveIcon(activeSelector, inactiveSelector, activeColor, inactiveColor) {
    document.querySelector('nav ' + activeSelector).style.color = activeColor;
    document.querySelector('nav ' + inactiveSelector).style.color = inactiveColor;
}

function resetIcons() {
    document.querySelector('.fa-shopping-basket').style.color = '#fff';
    document.querySelector('.fa-heart').style.color = '#fff';
}

document.querySelector('.fa-shopping-basket').addEventListener('click', () => toggleDisplay('busket'));
document.querySelector('.fa-heart').addEventListener('click', () => toggleDisplay('like'));