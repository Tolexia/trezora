window.optionsContent = document.getElementById('optionsContent')
var skinsBasePath = "./images/skins/"
var settingChosen 
/******************
 * SKINS SETTINGS *
 *****************/
function displaySkins()
{
    if(settingChosen == "skins")
        return;
    else
        settingChosen = "skins"
    
    window.optionsContent.innerHTML = ""
    window.optionsContent.dataset.choice = "skins"
    
    const chevronLeft = document.createElement('button')
    chevronLeft.classList.add('chevronLeft')
    window.optionsContent.appendChild(chevronLeft)

    const skinsDiv = document.createElement('div')
    skinsDiv.classList.add('skins')
    window.optionsContent.appendChild(skinsDiv)
    for(let skin of gamesystem.skins)
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
        skinPicture.src = skinsBasePath + skin.file
        skinPicture.draggable = false
        
        selectButton.type = "button"
        selectButton.dataset.skintitle = skin.title
        if( (!getItem('boat-skin') && skin.title == "Default") || getItem('boat-skin') == (skinsBasePath + skin.file) )
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

    window.isBlocked = undefined;
    skinsDiv.addEventListener('mousedown', e => {
        window.mouseX = e.clientX
        window.isBlocked = false;
    })
    skinsDiv.addEventListener('touchstart', e => {
        window.mouseX = e.targetTouches[0].clientX
        alert("touchstart : " + window.mouseX)
        window.isBlocked = false;
    })
    skinsDiv.addEventListener('touchmove', e => {
        window.mouseX = e.targetTouches[0].clientX
        e.preventDefault()
    })
    skinsDiv.closest('body').addEventListener('mouseup', e => {
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
    skinsDiv.addEventListener('touchend', e => {
        alert("touchend : " + window.mouseX)
        if(e.changedTouches[0].clientX - window.mouseX < 0 && isBlocked == false)
        {
            isBlocked = true;
            sliderArrow("right", skinsDiv)
        }
        else if(e.changedTouches[0].clientX - window.mouseX > 0 && isBlocked == false)
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
        window.isBlocked = undefined;
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
        window.isBlocked = undefined;
        return;
    }
    target.scrollIntoView({
        behavior: "smooth",
        block: 'nearest'
    })
    window.isBlocked = undefined;
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
            setItem('boat-skin', skinsBasePath + skin.file)

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

function displayEnnemyStrength()
{
    if(settingChosen == "ennemy_strength")
        return;
    else
        settingChosen = "ennemy_strength"

    window.optionsContent.innerHTML = ""
    window.optionsContent.dataset.choice = "ennemy_strength"

    const container = document.createElement('div')
    const ennemy_strength = getItem("ennemy_strength") ? JSON.parse(getItem("ennemy_strength")) : gamesystem.ennemyStrengths[0]

    for(let strength_choice of gamesystem.ennemyStrengths)
    {
        const item = document.createElement('div')
        const label = document.createElement('span')
        const legend = document.createElement('p')

        label.innerText = strength_choice.title
        legend.innerText = strength_choice.legend

        item.classList.add('strengthItem')
        label.classList.add('optionsLabel')
        legend.classList.add('strengthLegend')

        if(JSON.stringify(strength_choice) == JSON.stringify(ennemy_strength))
        {
            label.classList.add("strengthChosen")
        }
            
        label.onclick = (e) => handleChangeEnnemyStrength(e) 

        container.appendChild(item)
        item.appendChild(label)
        item.appendChild(legend)
    }

    window.optionsContent.appendChild(container)
    container.classList.add('optionsContainer')
  
}

function handleChangeEnnemyStrength(event){
    const value = event.target.innerText
    const ennemy_strength =  gamesystem.ennemyStrengths.find(el => el.title == value)
    if(!ennemy_strength)
    {
        console.error("ennemy_strength not found")
        return;
    }

    setItem("ennemy_strength", JSON.stringify(ennemy_strength))
    for(let stat in ennemy_strength.stats)
    {
        setItem(stat, ennemy_strength.stats[stat])
    }

    const optionsContainer = event.target.closest('.optionsContainer')
    const items = optionsContainer.getElementsByTagName('div')

    for(let item of items)
    {
        const title = item.getElementsByTagName('span')[0]
        if(title.innerText == ennemy_strength.title)
        {
            title.classList.add('strengthChosen')
        }
        else{
            title.classList.remove('strengthChosen')
        }

    }
}