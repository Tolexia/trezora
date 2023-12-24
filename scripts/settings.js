window.optionsContent = document.getElementById('optionsContent')
var basePath = "./images/skins/"
function displaySkins()
{
    window.optionsContent.innerHTML = ""
    
    const skins = [
        {
            title: "Default",
            file: "boat.png"
        },
        {
            title: "Mini",
            file: "mini-boat.png"
        },
        {
            title: "AC Black Flag",
            file: "black_flag.png"
        },
        {
            title: "Thousand Sunny",
            file: "thousand_sunny.png"
        }
    ]
    for(let skin of skins)
    {
        const skinContainer = document.createElement('div')
        const skinLabel = document.createElement('span')
        const skinPicture = document.createElement('img')
        const selectButton = document.createElement('button')

        skinContainer.classList.add('skinContainer')
        skinLabel.classList.add('skinLabel')
        skinPicture.classList.add('skinPicture')
        selectButton.classList.add('selectButton')

        skinLabel.innerText = skin.title
        skinPicture.src = basePath + skin.file
        
        selectButton.type = "button"
        selectButton.dataset.skintitle = skin.title
        if( (!getItem('boat-skin') && skin.title == "Default") || getItem('boat-skin') == (basePath + skin.file) )
        {
            selectButton.innerText = "Selected"
            selectButton.classList.add("selected")
        }
        else{
            selectButton.innerText = "Select"
            selectButton.onclick = () => chooseSkin(skin)
        }

        skinContainer.appendChild(skinLabel)
        skinContainer.appendChild(skinPicture)
        skinContainer.appendChild(selectButton)
        window.optionsContent.appendChild(skinContainer)
    }
}

function chooseSkin(skin){
    window.optionsContent.querySelectorAll(`selectButton`).forEach(button => {
        if(button.dataset.skintitle == skin.title)
        {
            button.innerText = "Selected"
            selectButton.classList.add("selected")
            button.onclick = ""
            setItem('boat-skin', basePath + skin.file)

        }
        else{
            button.innerText = "Select"
            selectButton.classList.remove("selected")
            button.onclick = () => chooseSkin(skin)
        }
    });
}

setTimeout(() => {
    displaySkins()
    
}, 2000);