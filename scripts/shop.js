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
    window.itemsContainer.classList.remove("close")
    window.itemsContainer.classList.add("open")
    setTimeout(() => {
        window.itemslist.innerHTML = `<span class = "itemsRemaining">Coins: ${getItem('playerCoins')}</span>`
        if(option == "Buy")
        {
            items = JSON.parse(getItem('itemsInShop'));
            for(let item of items)
            {
                const divItem = document.createElement('div')
                const titleItem = document.createElement('span')
                const cost = document.createElement('span')
                const illus = document.createElement('img')

                divItem.classList.add("divItem")
                divItem.dataset.item = item.name
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
            items = JSON.parse(getItem('itemsToSell'));
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
        icon: "question",
        confirmButtonText: 'Oh yes',
        denyButtonText: 'Maybe later',
        showConfirmButton: true,
        showDenyButton: true,
    })
      .then((result) => {
        if(result.isConfirmed)
        {
            let coins = getItem('playerCoins')
            if(coins == null || parseInt(coins) < parseInt(item.cost))
            {
                Swal.fire({
                    html: `
                        <img src = "./images/human_chest.png" />
                        <p>
                            Oh no ! Not enough coins...<br/>
                            Play a game and come get some 💪
                        </p>
                    `,
                    confirmButtonText: 'Got it!',
                    showConfirmButton: true,
                })
            }
            else
            {
                coins = parseInt(coins) - parseInt(item.cost)
                setItem('playerCoins', coins)
                const itemsStored = JSON.parse(getItem('itemsInShop'));
                for(let itemStored of itemsStored)
                {
                    if(itemStored.name == item.name)
                    {
                        itemStored.bought = true
                    }
                }
                setItem("itemsInShop", JSON.stringify(itemsStored))

                const currentStat = getItem(item.stat)
                const newStatValue = parseInt(currentStat) + item.buffValue
                setItem(item.stat, newStatValue)

                const upgradesPossessed = JSON.parse(getItem("upgradesPossessed"))
                upgradesPossessed.push(item)
                setItem("upgradesPossessed", JSON.stringify(upgradesPossessed))
                
                const sucessImg = (item.name.includes("Artillery") ? "./images/upgrades/artillery.png": "./images/upgrades/nice_ship.png")
                Swal.fire({
                    html: `
                        <img src = "${sucessImg}" />
                        <p>Congrats, you're getting stronger pal !</p>
                    `,
                    confirmButtonText: 'Return to Shop',
                    showConfirmButton: true,
                })
            }
        }
    })
}


function sell(item)
{

}