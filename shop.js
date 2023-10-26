window.itemsContainer = document.getElementById('items')
function showlist(option)
{
    let items;
    if(option == "Buy")
    {
        window.itemsContainer.classList.add("open")
        items = localStorage.getItem('itemsInShop');

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