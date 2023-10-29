window.itemsContainer = document.getElementById('items')
window.itemslist = document.getElementById('itemslist')
window.options = [...document.getElementById('options').getElementsByTagName("button")]
window.optionChosen = "none"
function showlist(option, reload = false)
{
    if(window.optionChosen == option && !reload)
        return;

    window.optionChosen = option
    window.options.forEach(optionButton => optionButton.dataset.option == option ? optionButton.classList.add("selected") : optionButton.classList.remove("selected"))
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
    console.log("ici")
    window.itemsContainer.classList.remove("close")
    window.itemsContainer.classList.add("open")
    setTimeout(() => {
        if(option == "Buy")
        {
            items = JSON.parse(localStorage.getItem('itemsInShop'));
            for(item of items)
            {
                const divItem = document.createElement('div')
                const titleItem = document.createElement('span')
                const cost = document.createElement('span')
                const illus = document.createElement('img')

                divItem.classList.add("divItem")
                if(item.bought == true)
                {
                    divItem.classList.add("bought")
                }

                illus.className = "itemIllus"
                illus.src = item.image
                divItem.appendChild(illus)

                titleItem.classList.add("titleItem")
                titleItem.innerText = item.name
                divItem.appendChild(titleItem)

                cost.classList.add("cost")
                cost.innerText = "cost: "+item.cost
                divItem.appendChild(cost)
                if(item.bought == false)
                {
                    const buyButton = document.createElement('button')
                    const img = document.createElement('img')

                    buyButton.classList.add("buyButton")
                    buyButton.type = "button"
                    buyButton.onclick = () => buy(item)

                    img.src = "./images/shop/coin.png"
                    buyButton.appendChild(img)
                    divItem.appendChild(buyButton)
                }
                else 
                {
                    const boughtLabel = document.createElement("span")
                    boughtLabel.innerText = "Bought"
                    divItem.appendChild(boughtLabel)
                }
                window.itemslist.appendChild(divItem)
            }
        }
        else
        {
            items = JSON.parse(localStorage.getItem('itemsToSell'));
            if(items.length == 0)
            {
                window.itemslist.innerHTML = `<p class = "noitem">No item to sell.<br/>Play a few games to get some !</p>`
            }
        }
    }, 1000);

}

function buy(item)
{
    Swal.fire({
        html: `
            Do you confirm purchase this item ?
        `,
        confirmButtonText: 'Cool',
        showConfirmButton: true,
        customClass: {
            container: 'swal2-backdrop-show win'
        }  
    })
      .then((result) => {
        newGame();
    })
}


function sell(item)
{

}