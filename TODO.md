# TO DO

## Explore & Shop

### Creatures
* Put creatures on map that could drop rare items
* When 1 block far from a shark or a kraken, possibility to attack them
* Displaying a ::after on creature to show the player this possibility
* For now, attacking creature kills it instantly, in future it could have a lifebar
* after killed, the block turns to sea and player loots a rare object
* For AI, if the direction it was going to choose is a creature, it attacks it instead 


## Game design
* Page settings
    - Difficulty system : increasing it at the same time as player levels up, but let the player modify it as they will. More difficulty is, stronger is the opponent and more coins gained
    -  Possibility to change boat skin (change it also when upgrading?)
    - Possibility to change map size (withing a limit range : default->12x6, 14x7, 16x8?)

# DONE

## Explore & Shop
* Shop : Make it beautiful
* Powers could be disposable and available in shop when some level is reached, in order to make them more attractive and powerful. Price should be pretty low to be able to buy 1 or 2 by game
    - Remains setting power items in the shop + handling power use counts + handling powers display if unlocked or not
* Init a drop rate = 0 when game starts, then increase it at each move, representing a probability to loot some stuff to sell in the shop. Reinit at 0 after looting
* Shop : Make it functional -> Remains selling items


## Fight
* Animate fights : smoke and kickback on attacker and after delay explosion on defender + screen shaking (smoke and explosion effect : increase scale and opacity)
* Ability to attack "AI"

## Game design
* Implementing levels depending on total xp