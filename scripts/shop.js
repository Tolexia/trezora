window.itemsContainer = document.getElementById('items')
window.itemslist = document.getElementById('itemslist')
window.optionsContainer = document.getElementById('options')
window.options = [...window.optionsContainer.getElementsByTagName("button")]
window.optionChosen = "none"

function showlist(option, reload = false)
{
    if(window.optionChosen == option && !reload)
        return;

    if(!window.optionsContainer.classList.contains('itemsOpened'))
        window.optionsContainer.classList.add('itemsOpened')

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
        || (item.type == "power" && !JSON.parse(getItem("powersUnlocked")).includes(item.name))
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
function alertNotEnoughMoney()
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

function buy(item)
{
    if(!isNaN(parseInt(item.quantity)))
    {
        purchaseMultipleItems(item)
    }
    else
    {
        purchaseUniqueItem(item)
    }
}

function purchaseUniqueItem(item){
    Swal.fire({
        html: `
            Do you confirm purchase this item ?
        `,
        icon: "question",
        confirmButtonText: 'Yes',
        denyButtonText: 'Maybe later',
        confirmButtonColor: "#4CAF50",
        denyButtonColor: "grey",
        showConfirmButton: true,
        showDenyButton: true,
    })
      .then((result) => {
        if(result.isConfirmed)
        {
            let coins = getItem('playerCoins')
            if(coins == null || parseInt(coins) < parseInt(item.cost))
            {
                alertNotEnoughMoney()
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
async function purchaseMultipleItems(item){
    let coins = parseInt(getItem('playerCoins'))
    if(coins == null || coins < parseInt(item.cost))
    {
        return alertNotEnoughMoney()
    }
    const max = Math.floor(parseInt(coins) / item.cost)
    const result = await Swal.fire({
        icon: "question",
        input: "range",
        inputLabel: "How many do you need ?",
        inputAttributes: {
          min: "0",
          max: max,
          step: "1"
        },
        inputValue: 1,
        confirmButtonText: 'Purchase',
        denyButtonText: 'Maybe later',
        confirmButtonColor: "#4CAF50",
        denyButtonColor: "grey",
        showConfirmButton: true,
        showDenyButton: true,
    })
    if(result && result.value > 0)
    {
        const quantity = parseInt(result.value)
        if( coins < (item.cost * quantity))
        {
            alertNotEnoughMoney()
        }
        else
        {
            coins = (coins - (item.cost * quantity))
            setItem('playerCoins', coins)
            const itemsStored = JSON.parse(getItem('itemsInShop'));
            for(let itemStored of itemsStored)
            {
                if(itemStored.name == item.name)
                {
                    itemStored.quantity = ( itemStored.quantity + quantity )
                    break
                }
            }
            setItem("itemsInShop", JSON.stringify(itemsStored))

            confirmTransaction()

            fillShop("Buy")
        }
    }
}

function sell(item)
{
    if(item.quantity && item.quantity > 1)
    {
        sellMultipleItems(item)
    }
    else
    {
        sellUniqueItem(item)
    }
}
function sellUniqueItem(item)
{
    Swal.fire({
        html: `
            Do you confirm sell this item ?
        `,
        icon: "question",
        confirmButtonText: 'Yes',
        denyButtonText: 'Maybe later',
        confirmButtonColor: "#4CAF50",
        denyButtonColor: "grey",
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
                confirmTransaction()
            }
            else{
                alert("Error in shop")
                return;
            }
            
        }
    })
}

async function sellMultipleItems(item)
{
    let coins = parseInt(getItem('playerCoins'))
    
    const max = item.quantity
    const result = await Swal.fire({
        icon: "question",
        input: "range",
        inputLabel: "How many do you wish to sell ?",
        inputAttributes: {
          min: "0",
          max: max,
          step: "1"
        },
        inputValue: 1,
        confirmButtonText: 'Sell',
        denyButtonText: 'Maybe later',
        confirmButtonColor: "#4CAF50",
        denyButtonColor: "grey",
        showConfirmButton: true,
        showDenyButton: true,
    })
    if(result && result.value > 0)
    {
        const quantity = parseInt(result.value)
        coins = (coins + (item.cost * quantity))
        setItem('playerCoins', coins)

        const itemsStored = JSON.parse(getItem('itemsToSell'));
        for(let i = 0; i < itemsStored.length; i++)
        {
            const itemStored = itemsStored[i]
            if(itemStored.name == item.name)
            {
                const countLeft = ( itemStored.quantity - quantity )
                if(countLeft > 0)
                    itemStored.quantity = countLeft
                else
                    itemsStored.splice(i, 1)

                break;
            }
        }
        setItem("itemsToSell", JSON.stringify(itemsStored))

        confirmTransaction()

        fillShop("Sell")
    }
}

function confirmTransaction()
{
    iziToast.success({
        title: 'Transaction Confirmed',
        message: 'Your money and items have been updated',
        layout:2
    });
}
