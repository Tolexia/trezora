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
    window.optionsContent.classList.add("sliderChoice")
    window.optionsContent.classList.remove("clickChoice")
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
        window.isBlocked = false;
    })
    var isTouching = false
    skinsDiv.addEventListener('touchmove', e => {
        if(!isTouching)
        {
            window.mouseX = e.targetTouches[0].clientX
            isTouching = true
            setTimeout(() => {
                handleEndMoveSlider(window.mouseX, skinsDiv) 
                isTouching = false
            }, 500)
        }
        e.preventDefault()
    })
    skinsDiv.closest('body').addEventListener('mouseup', e => {
        handleEndMoveSlider(e.clientX, skinsDiv)   
    })
    skinsDiv.addEventListener('touchend', e => {
        handleEndMoveSlider(e.changedTouches[0].clientX, skinsDiv)       
    })
}
function handleEndMoveSlider(clientX, container){
    if(clientX - window.mouseX < 0 && isBlocked == false)
    {
        isBlocked = true;
        sliderArrow("right", container)
    }
    else if(clientX - window.mouseX > 0 && isBlocked == false)
    {
        isBlocked = true;
        sliderArrow("left", container)
    }
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
    window.optionsContent.querySelectorAll('.selectButton').forEach(button => {
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
    confirmModifOK()
}

setTimeout(() => {
    displaySkins()
}, 2000);

/****************************
 * ENNEMY STRENGTH SETTINGS *
 ***************************/
function displayEnnemyStrength()
{
    if(settingChosen == "ennemy_strength")
        return;
    else
        settingChosen = "ennemy_strength"

    window.optionsContent.innerHTML = ""
    window.optionsContent.classList.remove("sliderChoice")
    window.optionsContent.classList.add("clickChoice")
    window.optionsContent.dataset.choice = "ennemy_strength"

    const container = document.createElement('div')
    const ennemy_strength = getItem("ennemy_strength") ? JSON.parse(getItem("ennemy_strength")) : gamesystem.ennemyStrengths[0]

    const paragraph = document.createElement('p')
    paragraph.innerText = "The stronger the ennemy is, the more gold is earned"
    container.appendChild(paragraph)

    for(let strength_choice of gamesystem.ennemyStrengths)
    {
        const item = document.createElement('div')
        const label = document.createElement('span')
        const legend = document.createElement('p')

        label.innerText = strength_choice.title
        legend.innerText = strength_choice.legend

        item.classList.add('clickItem')
        label.classList.add('optionsLabel')
        legend.classList.add('clickLegend')

        if(JSON.stringify(strength_choice) == JSON.stringify(ennemy_strength))
        {
            label.classList.add("clickChosen")
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
            title.classList.add('clickChosen')
        }
        else{
            title.classList.remove('clickChosen')
        }
    }

    confirmModifOK()
}


/*********************
 * MAP SIZE SETTINGS *
 ********************/
function displayMapSize()
{
    if(settingChosen == "map_size")
        return;
    else
        settingChosen = "map_size"

    window.optionsContent.innerHTML = ""
    window.optionsContent.classList.remove("sliderChoice")
    window.optionsContent.classList.add("clickChoice")
    window.optionsContent.dataset.choice = "map_size"

    const container = document.createElement('div')
    const map_size = getItem("map_size") ? JSON.parse(getItem("map_size")) : gamesystem.mapSizes[0]

    for(let map_chosen of gamesystem.mapSizes)
    {
        const item = document.createElement('div')
        const label = document.createElement('span')

        label.innerText = map_chosen.title

        item.classList.add('clickItem')
        label.classList.add('optionsLabel')

        if(JSON.stringify(map_chosen) == JSON.stringify(map_size))
        {
            label.classList.add("clickChosen")
        }
            
        label.onclick = (e) => handleChangeMapSize(e) 

        container.appendChild(item)
        item.appendChild(label)
    }

    const paragraph = document.createElement('i')
    paragraph.innerText = "Change map size will reset the current game"
    container.appendChild(paragraph)

    window.optionsContent.appendChild(container)
    container.classList.add('optionsContainer')
  
}

function handleChangeMapSize(event){
    const value = event.target.innerText
    const map_size =  gamesystem.mapSizes.find(el => el.title == value)
    if(!map_size)
    {
        console.error("map_size not found")
        return;
    }

    setItem("map_size", JSON.stringify(map_size))
    setItem("trezora-columnCount", map_size.columns)
    setItem("trezora-rowCount", map_size.rows)
    localStorage.removeItem("boatCoordX")

    const optionsContainer = event.target.closest('.optionsContainer')
    const items = optionsContainer.getElementsByTagName('div')

    for(let item of items)
    {
        const title = item.getElementsByTagName('span')[0]
        if(title.innerText == map_size.title)
        {
            title.classList.add('clickChosen')
        }
        else{
            title.classList.remove('clickChosen')
        }
    }
    confirmModifOK()
}
function confirmModifOK()
{
    iziToast.success({
        title: 'All good',
        message: 'Modifications saved',
        layout:2
    });
}
