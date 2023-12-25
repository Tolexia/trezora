window.optionsContent = document.getElementById('optionsContent')
var basePath = "./images/skins/"
var skins = [
    {
        title: "Default",
        file: "boat.png"
    },
    {
        title: "Minimalist",
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
function displaySkins()
{
    window.optionsContent.innerHTML = ""
    
    const chevronLeft = document.createElement('button')
    chevronLeft.classList.add('chevronLeft')
    window.optionsContent.appendChild(chevronLeft)

    const skinsDiv = document.createElement('div')
    skinsDiv.classList.add('skins')
    window.optionsContent.appendChild(skinsDiv)
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
        skinPicture.draggable = false
        
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
        skinsDiv.appendChild(skinContainer)
    }
    const chevronRight = document.createElement('button')
    chevronRight.classList.add('chevronRight')
    window.optionsContent.appendChild(chevronRight)

    chevronLeft.onclick = () => sliderArrow("left", skinsDiv)
    chevronRight.onclick = () => sliderArrow("right", skinsDiv)

    window.isBlocked = false;
    skinsDiv.addEventListener('mousedown', e => {
        window.mouseX = e.clientX
    })
    skinsDiv.addEventListener('mouseup', e => {
        if(e.clientX - window.mouseX < 0 && isBlocked == false)
        {
            isBlocked = true;
            sliderArrow("right", skinsDiv)
        }
        else if(e.clientX - window.mouseX > 0 && isBlocked == false)
        {
            isBlocked = true;
            sliderArrow("left", skinsDiv)
        }
    })
}
function sliderArrow(direction, container)
{
    const children = container.childNodes
    let targetted
    for(child of children)
    {
        if(child.offsetLeft <= container.scrollLeft && container.scrollLeft <= (child.offsetLeft+child.clientWidth))
        {
            targetted = child
        }
    }
    if(!targetted)
    {
        console.error("No current target")
        window.isBlocked = false;
        return;
    }
    let target
    if(direction == "left" && targetted != children[0])
    {
        target = targetted.previousElementSibling
    }
    else if(direction == "right" && targetted != children[children.length-1])
    {
        target = targetted.nextElementSibling
    }
    if(!target)
    {
        console.error("No target found")
        window.isBlocked = false;
        return;
    }
    target.scrollIntoView({
        behavior: "smooth"
    })
    window.isBlocked = false;
}
function chooseSkin(skin){
    console.log("chooseSkin")
    console.log("skin", skin)
    window.optionsContent.querySelectorAll('.selectButton').forEach(button => {
        console.log("button", button)
        if(button.dataset.skintitle == skin.title)
        {
            button.innerText = "Selected"
            button.classList.add("selected")
            button.onclick = ""
            setItem('boat-skin', basePath + skin.file)

        }
        else{
            button.innerText = "Select"
            button.classList.remove("selected")
            button.onclick = () => chooseSkin(skins.find(el => el.title == button.dataset.skintitle))
        }
    });
}

setTimeout(() => {
    displaySkins()
    
}, 2000);