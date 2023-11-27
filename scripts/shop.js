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
    
    window.itemsContainer.classList.remove("close")
    window.itemsContainer.classList.add("open")
    setTimeout(() => {
        fillShop(option)
    }, 1000);

}

function fillShop(option)
{
    let items;
    window.itemslist.innerHTML = `<span class = "itemsRemaining">Coins: <span id = "coinValue">${getItem('playerCoins')}</span></span>`
    if(option == "Buy")
    {
        items = JSON.parse(getItem('itemsInShop'));
        for(let item of items)
        {
           putItemInList(option, item)
        }
    }
    else
    {
        items = JSON.parse(getItem('itemsToSell'));
        if(items.length == 0)
        {
            window.itemslist.innerHTML = `<p class = "noitem">No item to sell.<br/>Play a few games to get some !</p>`
        }
        else{
            for(let item of items)
            {
               putItemInList(option, item)
            }
        }
    }
}

function putItemInList(option, item)
{
    const divItem = document.createElement('div')
    const titleItem = document.createElement('span')
    const cost = document.createElement('span')
    const illus = document.createElement('img')

    divItem.classList.add("divItem")
    divItem.dataset.item = item.name
    if(
        (typeof item.bought != "undefined" && item.bought == true)
        || (item.type == "power" && !JSON.parse(localStorage.getItem("powersUnlocked")).includes(item.name))
    )
    {
        divItem.classList.add("bought")
    }

    illus.className = "itemIllus"
    illus.src = item.image
    if(item.image.match("svg")) illus.style = "filter:invert(1)"
    divItem.appendChild(illus)

    titleItem.classList.add("titleItem")
    titleItem.innerText = item.title ?  item.title : item.name
    divItem.appendChild(titleItem)

    cost.classList.add("cost")
    cost.innerText = "cost: "+item.cost
    divItem.appendChild(cost)

    if(typeof item.quantity != "undefined")
    {
        const possessed = document.createElement('span')
        possessed.classList.add("possessed")
        possessed.innerText = "possessed: "+item.quantity
        divItem.appendChild(possessed)
    }
    if(typeof item.bought == "undefined" || item.bought == false)
    {
        const buyButton = document.createElement('button')
        const img = document.createElement('img')

        buyButton.classList.add("buyButton")
        buyButton.type = "button"
        buyButton.onclick = () => option == "Buy" ? buy(item) : sell(item)

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

function buy(item)
{
    console.log("item", item)
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
                        if(typeof item.bought != "undefined")
                            itemStored.bought = true
                        else if(typeof item.quantity != "undefined")
                            itemStored.quantity = parseInt(itemStored.quantity)+1

                        break
                    }
                }
                setItem("itemsInShop", JSON.stringify(itemsStored))
                let successImg;
                if(item.type == "upgrade")
                {
                    if(typeof item.stat != "undefined")
                    {
                        const currentStat = getItem(item.stat)
                        const newStatValue = parseInt(currentStat) + item.buffValue
                        setItem(item.stat, newStatValue)
                    }

                    const upgradesPossessed = JSON.parse(getItem("upgradesPossessed"))
                    upgradesPossessed.push(item)
                    setItem("upgradesPossessed", JSON.stringify(upgradesPossessed))
                    successImg = (item.name.includes("Artillery") ? "./images/upgrades/artillery.png": "./images/upgrades/nice_ship.png")
                }
                else if(item.type == "power")
                {
                    successImg = "./images/powers/livre1.png"
                }
                fillShop("Buy")
                Swal.fire({
                    html: `
                        <img src = "${successImg}" />
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
    Swal.fire({
        html: `
            Do you confirm sell this item ?
        `,
        icon: "question",
        confirmButtonText: 'I do',
        denyButtonText: 'Maybe later',
        showConfirmButton: true,
        showDenyButton: true,
    })
      .then((result) => {
        if(result.isConfirmed)
        {
            let coins = getItem('playerCoins')
            coins = parseInt(coins) + parseInt(item.cost)
            setItem('playerCoins', coins)
            const itemsStored = JSON.parse(getItem('itemsToSell'));
            const itemPossessed = itemsStored.find(el => el.name == item.name)
            if(itemPossessed)
            {
                if(typeof item.bought != "undefined")
                    itemPossessed.bought = false
                else if(typeof item.quantity != "undefined")
                {
                    itemPossessed.quantity = parseInt(itemPossessed.quantity)-1
                    if(itemPossessed.quantity <= 0)
                    {
                        itemsStored.splice(itemsStored.indexOf(itemPossessed), 1)
                    }
                }
                setItem("itemsToSell", JSON.stringify(itemsStored))
                fillShop("Sell")
                Swal.fire({
                    html: `
                        <img src = "./images/shop/pirate_gold.png" /><br/>
                        <p>
                            Sweet gold for ye !<br/>
                            Gold earned : ${item.cost}
                        </p>
                    `,
                    confirmButtonText: 'Return to Shop',
                    showConfirmButton: true,
                })
            }
            else{
                alert("Error in shop")
                return;
            }
            
        }
    })
}