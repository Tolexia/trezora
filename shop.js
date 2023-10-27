window.itemsContainer = document.getElementById('items')
window.itemslist = document.getElementById('itemslist')
function showlist(option, reload = false)
{
    window.itemslist.innerHTML = "";
    if(window.itemsContainer.classList.contains("open") && !reload)
    {
        window.itemsContainer.classList.remove("open")
        window.itemsContainer.classList.add("close")
        return setTimeout(() => {
            showlist(option, true)
        }, 1000);
    }
    let items;
    window.itemsContainer.classList.remove("close")
    window.itemsContainer.classList.add("open")
    if(option == "Buy")
    {
        setTimeout(() => {
            items = JSON.parse(localStorage.getItem('itemsInShop'));
            for(item of items)
            {
                const divItem = document.createElement('div')
                const titleItem = document.createElement('span')
                const buyButton = document.createElement('button')

                divItem.classList.add("divItem")
                if(item.bought == true)
                {
                    divItem.classList.add("bought")
                }

                titleItem.classList.add("titleItem")
                titleItem.innerText = item.name

                buyButton.classList.add("buyButton")
                buyButton.type = "button"
                buyButton.value = "Buy"
                buyButton.onclick = () => buy(item)

                divItem.appendChild(titleItem)
                divItem.appendChild(buyButton)
                window.itemslist.appendChild(divItem)
            }
        }, 1000);
    }
    else
    {

        items = localStorage.getItem('itemsToSell');
    }

}

function buy(item)
{

}


function sell(item)
{

}