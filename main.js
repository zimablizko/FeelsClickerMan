var gold = {
        name: 'gold',
        total: 0,
        default: 50,
        max: 100,
        perClick: 1,
        perClickUpgradeMod: 1,
        perClickUpgradeCost: 10,
        perClickUpgradeCostMod: 2.25,
        perTick: 0,
    },
    food = {
        name: 'food',
        total: 0,
        default: 100,
        max: 100,
        perClick: 1,
        perClickUpgradeMod: 1,
        perClickUpgradeCost: 10,
        perClickUpgradeCostMod: 2.25,
        perTick: 0,
    },
    wood = {
        name: 'wood',
        total: 0,
        default: 100,
        max: 100,
        perClick: 1,
        perClickUpgradeMod: 1,
        perClickUpgradeCost: 10,
        perClickUpgradeCostMod: 2.25,
        perTick: 0,
    },
    stone = {
        name: 'stone',
        total: 0,
        default: 100,
        max: 100,
        perClick: 1,
        perClickUpgradeMod: 1,
        perClickUpgradeCost: 10,
        perClickUpgradeCostMod: 2.25,
        perTick: 0,
    },
    memes = {
        name: 'memes',
        total: 2019,
        default: 9000,
        max: 9000,
        perClick: 0,
        perClickUpgradeMod: 0,
        perClickUpgradeCost: 0,
        perClickUpgradeCostMod: 0,
        perTick: 0,
    },

    population = {
        total: 0,
        max:20,
        workers: 0,
        farmers: 0,
        miners: 0,
        woodcutters: 0
    }

    worker = {
    name: 'worker',
    type: 'unit',
    total: 0,
    require: {
        worker: 0,
        food: 10,
        wood: 0,
        stone: 0,
        gold: 0
    },
    requireMod: {
        food: 1,
        wood: 1,
        stone: 1,
        gold: 1
    }
},
    farmer = {
        name: 'farmer',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 5,
            stone: 0,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            foodPerTick: 0.2
        }
    },
    miner = {
        name: 'miner',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 5,
            stone: 0,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            stonePerTick: 0.1
        }
    },
    woodcutter = {
        name: 'woodcutter',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 5,
            stone: 0,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            woodPerTick: 0.1
        }
    },

    mine = {
        name: 'mine',
        type: 'structure',
        total: 0,
        require: {
            worker: 1,
            gold: 10
        },
        requireMod: {
            gold: 1.8
        },
        effect: {
            goldPerTick: 0.1
        }
    },
    storage = {
        name: 'storage',
        type: 'structure',
        total: 0,
        require: {
            worker: 5,
            food: 0,
            wood: 50,
            stone: 20,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 2.2,
            stone: 1.9,
            gold: 1
        },
        effect: {
            allMax: 50
        }
    },
    tent = {
        name: 'tent',
        type: 'structure',
        total: 0,
        require: {
            worker: 2,
            food: 0,
            wood: 30,
            stone: 10,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 2.1,
            stone: 1.8,
            gold: 1
        },
        effect: {
            populationMax: 5
        }
    },

    upgrades = {
        hunting:{
            level:0,
            require:{
                food:50
            }
        },
        safekeeping: {
            level:0,
            require:{
                wood:50,
                stone:50
            }
        }
    }

var gameData = {
    //gold:gold
}

//RESOURCES
function clickResource(resource) {
    resource.total += resource.perClick
    checkResourceBounds(resource)
    updateGameData()
}

function resourcePerTick(resource) {
    if (resource == gameData.gold)
        resource.perTick = gameData.mine.effect.goldPerTick * gameData.mine.total
    else if (resource == gameData.food)
        resource.perTick = ((gameData.farmer.effect.foodPerTick+gameData.upgrades.hunting.level*0.2) * gameData.farmer.total) - (gameData.population.total * 0.1)
    else if (resource == gameData.wood)
        resource.perTick = gameData.woodcutter.effect.woodPerTick * gameData.woodcutter.total
    else if (resource == gameData.stone)
        resource.perTick = gameData.miner.effect.stonePerTick * gameData.miner.total
    else
        resource.perTick = 0
    resource.total += resource.perTick
    checkResourceBounds(resource)
    updateGameData()
}

function buyGoldPerClick() {
    if (gameData.gold.total >= gameData.gold.perClickUpgradeCost) {
        gameData.gold.total -= gameData.gold.perClickUpgradeCost
        gameData.gold.perClick += gameData.gold.perClickUpgradeMod
        gameData.gold.perClickUpgradeCost *= gameData.gold.perClickUpgradeCostMod
        updateGameData()
    }
}

function checkResourceBounds(resource){
    if (resource.total<0)
        resource.total=0
    else if (resource.total>resource.max)
        resource.total=resource.max
}

//UNITS
function createUnit(unit) {
    if (unit==gameData.worker && gameData.population.total<gameData.population.max && gameData.food.total >= unit.require.food){
        unit.total += 1
        //gameData.population.total+=1
        gameData.food.total -= unit.require.food
        unit.require.food *= unit.requireMod.food
    }else
    if (unit!=gameData.worker && gameData.gold.total >= unit.require.gold && gameData.food.total >= unit.require.food && gameData.wood.total >= unit.require.wood && gameData.stone.total >= unit.require.stone && gameData.worker.total >= unit.require.worker) {
        unit.total += 1
        gameData.gold.total -= unit.require.gold
        gameData.food.total -= unit.require.food
        gameData.wood.total -= unit.require.wood
        gameData.stone.total -= unit.require.stone
        gameData.worker.total -= unit.require.worker
        unit.require.gold *= unit.requireMod.gold
        unit.require.food *= unit.requireMod.food
        unit.require.wood *= unit.requireMod.wood
        unit.require.stone *= unit.requireMod.stone
        updateGameData()
    }
}

function fireUnit(unit) {
    if (unit.total > 0) {
        unit.total -= 1
        gameData.worker.total += 1
        updateGameData()
    }
}

//STRUCTURES
function createStructure(structure) {
    if (gameData.gold.total >= structure.require.gold && gameData.food.total >= structure.require.food && gameData.wood.total >= structure.require.wood && gameData.stone.total >= structure.require.stone && gameData.worker.total >= structure.require.worker) {
        structure.total += 1
        gameData.gold.total -= structure.require.gold
        gameData.food.total -= structure.require.food
        gameData.wood.total -= structure.require.wood
        gameData.stone.total -= structure.require.stone
        structure.require.gold *= structure.requireMod.gold
        structure.require.food *= structure.requireMod.food
        structure.require.wood *= structure.requireMod.wood
        structure.require.stone *= structure.requireMod.stone
        updateGameData()
    }
}

//UPGRADES
function getUpgrade(upgrade){
    if (upgrade == 'hunting' && gameData.food.total >= gameData.upgrades.hunting.require.food){
        gameData.upgrades.hunting.level = 1;
        gameData.food.total -= gameData.upgrades.hunting.require.food;
    }
    if (upgrade == 'safekeeping' && gameData.wood.total >= gameData.upgrades.safekeeping.require.wood && gameData.stone.total >= gameData.upgrades.safekeeping.require.stone){
        gameData.upgrades.safekeeping.level = 1;
        gameData.wood.total -= gameData.upgrades.safekeeping.require.wood;
        gameData.stone.total -= gameData.upgrades.safekeeping.require.stone;
    }
    updateGameData()
}

//DATA
function updateGameData() {
    //POPULATION
    updatePopulationData()
    document.getElementById("populationTotal").innerHTML = gameData.population.total+"/"+gameData.population.max
    //RESOURCES
    updateResourcesData()
    //GOLD
    document.getElementById("goldTotal").innerHTML = prettify(gameData.gold.total)+"/"+prettify(gameData.gold.max)
    document.getElementById("goldPerTick").innerHTML = prettify(gameData.gold.perTick)
   // document.getElementById("goldPerClick").innerHTML = prettify(gameData.gold.perClick)
    //document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.gold.perClick + ")"
    //document.getElementById("perClickUpgradeCost").innerHTML = prettify(gameData.gold.perClickUpgradeCost)
    //FOOD
    document.getElementById("foodTotal").innerHTML = prettify(gameData.food.total)+"/"+prettify(gameData.food.max)
    document.getElementById("foodPerTick").innerHTML = prettify(gameData.food.perTick)
    document.getElementById("foodPerClick").innerHTML = prettify(gameData.food.perClick)
    //WOOD
    document.getElementById("woodTotal").innerHTML = prettify(gameData.wood.total)+"/"+prettify(gameData.wood.max)
    document.getElementById("woodPerTick").innerHTML = prettify(gameData.wood.perTick)
    document.getElementById("woodPerClick").innerHTML = prettify(gameData.wood.perClick)
    //STONE
    document.getElementById("stoneTotal").innerHTML = prettify(gameData.stone.total)+"/"+prettify(gameData.stone.max)
    document.getElementById("stonePerTick").innerHTML = prettify(gameData.stone.perTick)
    document.getElementById("stonePerClick").innerHTML = prettify(gameData.stone.perClick)
    //document.getElementById("foodPerClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.food.perClick + ")"
    //document.getElementById("foodPerClickUpgradeCost").innerHTML = prettify(gameData.food.perClickUpgradeCost)
    //MEMES
    document.getElementById("memesTotal").innerHTML = prettify(gameData.memes.total)+"/"+prettify(gameData.memes.max)
    //document.getElementById("memesPerTick").innerHTML = prettify(gameData.memes.perTick)
    //document.getElementById("memesPerClick").innerHTML = prettify(gameData.memes.perClick)
    //WORKERS
    document.getElementById("workerTotal").innerHTML = gameData.worker.total
    //document.getElementById("workerCostGold").innerHTML = prettify(gameData.worker.require.gold)
    document.getElementById("workerCostFood").innerHTML = prettify(gameData.worker.require.food)
    //FARMERS
    document.getElementById("farmerTotal").innerHTML = gameData.farmer.total
    document.getElementById("farmerCostWood").innerHTML = prettify(gameData.farmer.require.wood)
    //MINERS
    document.getElementById("minerTotal").innerHTML = gameData.miner.total
    document.getElementById("minerCostWood").innerHTML = prettify(gameData.miner.require.wood)
    //WOODCUTTER
    document.getElementById("woodcutterTotal").innerHTML = gameData.woodcutter.total
    document.getElementById("woodcutterCostWood").innerHTML = prettify(gameData.woodcutter.require.wood)
    //MINE
    //document.getElementById("mineTotal").innerHTML = gameData.mine.total
    //document.getElementById("mineCostGold").innerHTML = prettify(gameData.mine.require.gold)
    //document.getElementById("mineCostWorker").innerHTML = gameData.mine.require.worker
    // TENT
    document.getElementById("tentTotal").innerHTML = gameData.tent.total
    document.getElementById("tentCost").innerHTML =" Cost: "+prettify(gameData.tent.require.wood)+ " Wood, "+prettify(gameData.tent.require.stone)+ " Stone"
    document.getElementById("tentCostWorker").innerHTML = "Require: "+gameData.tent.require.worker + " Workers"
    // STORAGE
    document.getElementById("storageTotal").innerHTML = gameData.storage.total
    document.getElementById("storageCost").innerHTML =" Cost: "+prettify(gameData.storage.require.wood)+ " Wood, "+prettify(gameData.storage.require.stone)+ " Stone"
    document.getElementById("storageCostWorker").innerHTML = " Require: "+gameData.storage.require.worker + " Workers"

    //UPGRADES
    updateUpgradesData()
    document.getElementById("huntingCost").innerHTML = " Cost: "+ gameData.upgrades.hunting.require.food+ " Food"
    document.getElementById("safekeepingCost").innerHTML = " Cost: "+ gameData.upgrades.safekeeping.require.wood+ " Wood, "+gameData.upgrades.safekeeping.require.stone+ " Stone"
    //
    updateAccessData()
}

function resetGameData() {
    gameData.gold = clone(gold)
    gameData.food = clone(food)
    gameData.wood = clone(wood)
    gameData.stone = clone(stone)
    gameData.memes = clone(memes)
    gameData.population = clone(population)
    gameData.worker = clone(worker)
    gameData.farmer = clone(farmer)
    gameData.miner = clone(miner)
    gameData.woodcutter = clone(woodcutter)
    gameData.mine = clone(mine)
    gameData.storage = clone(storage)
    gameData.tent = clone(tent)
    gameData.upgrades = clone(upgrades)
    updateGameData()
    localStorage.removeItem('goldMinerSave')
}

function updatePopulationData() {
    gameData.population.workers = gameData.worker.total
    gameData.population.farmers = gameData.farmer.total
    gameData.population.woodcutters = gameData.woodcutter.total
    gameData.population.miners = gameData.miner.total
    gameData.population.total = gameData.population.workers + gameData.population.farmers + gameData.population.woodcutters + gameData.population.miners
    gameData.population.max = 20 + gameData.tent.total*gameData.tent.effect.populationMax
}

function updateResourcesData() {
    gameData.food.max = gameData.food.default + gameData.storage.total*gameData.storage.effect.allMax
    gameData.wood.max = gameData.wood.default + gameData.storage.total*gameData.storage.effect.allMax
    gameData.stone.max = gameData.stone.default + gameData.storage.total*gameData.storage.effect.allMax
    gameData.gold.max = gameData.gold.default
    gameData.memes.max = gameData.memes.default
}

function updateUpgradesData() {
    //HUNTING
    if (gameData.upgrades.hunting.level == 1) {
        document.getElementById('huntingLine').style.display = 'none';
    } else {
        document.getElementById('huntingLine').style.display = 'block';
        if (gameData.food.total >= gameData.upgrades.hunting.require.food) {
            document.getElementById('huntingBut').disabled = false;
        } else {
            document.getElementById('huntingBut').disabled = true;
        }
    }
    //SAFEKEEPING
    if (gameData.upgrades.safekeeping.level == 1) {
        document.getElementById('safekeepingLine').style.display = 'none';
    } else {
        document.getElementById('safekeepingLine').style.display = 'block';
        if (gameData.wood.total >= gameData.upgrades.safekeeping.require.wood && gameData.stone.total >= gameData.upgrades.safekeeping.require.stone) {
            document.getElementById('safekeepingBut').disabled = false;
        } else {
            document.getElementById('safekeepingBut').disabled = true;
        }
    }
}

function updateAccessData() {

    //WORKER
    if (gameData.food.total >= gameData.worker.require.food && gameData.population.total < gameData.population.max) {
        document.getElementById('createWorker').disabled = false;
    } else {
        document.getElementById('createWorker').disabled = true;
    }
    //FARMER
    if (gameData.wood.total >= gameData.farmer.require.wood && gameData.worker.total >= gameData.farmer.require.worker ) {
        document.getElementById('createFarmer').disabled = false;
    } else {
        document.getElementById('createFarmer').disabled = true;
    }
    if (gameData.farmer.total > 0) {
        document.getElementById('fireFarmer').disabled = false;
    } else {
        document.getElementById('fireFarmer').disabled = true;
    }
    //MINER
    if (gameData.wood.total >= gameData.miner.require.wood && gameData.worker.total >= gameData.miner.require.worker ) {
        document.getElementById('createMiner').disabled = false;
    } else {
        document.getElementById('createMiner').disabled = true;
    }
    if (gameData.miner.total > 0) {
        document.getElementById('fireMiner').disabled = false;
    } else {
        document.getElementById('fireMiner').disabled = true;
    }
    //WOODCUTTER
    if (gameData.wood.total >= gameData.woodcutter.require.wood && gameData.worker.total >= gameData.woodcutter.require.worker ) {
        document.getElementById('createWoodcutter').disabled = false;
    } else {
        document.getElementById('createWoodcutter').disabled = true;
    }
    if (gameData.woodcutter.total > 0) {
        document.getElementById('fireWoodcutter').disabled = false;
    } else {
        document.getElementById('fireWoodcutter').disabled = true;
    }
    //TENT
    if (gameData.wood.total >= gameData.tent.require.wood && gameData.stone.total >= gameData.stone.require.wood && gameData.worker.total >= gameData.tent.require.worker) {
        document.getElementById('tentBut').disabled = false;
    } else {
        document.getElementById('tentBut').disabled = true;
    }
    //STORAGE
    if (gameData.upgrades.safekeeping.level == 0) {
        document.getElementById('storageLine').style.display = 'none';
       // document.getElementById('Pdomestication').style.display = 'block';
    } else {
        document.getElementById('storageLine').style.display = 'block';
       // document.getElementById('Pdomestication').style.display = 'none';
        if (gameData.wood.total >= gameData.storage.require.wood & gameData.stone.total >= gameData.storage.require.stone && gameData.worker.total >= gameData.storage.require.worker) {
            document.getElementById('storageBut').disabled = false;
        } else {
            document.getElementById('storageBut').disabled = true;
        }
    }

}
//MAIN LOOP
var mainGameLoop = window.setInterval(function () {
    resourcePerTick(gameData.gold)
    resourcePerTick(gameData.food)
    resourcePerTick(gameData.wood)
    resourcePerTick(gameData.stone)
}, 1000)

//SAVE AND LOAD
var saveGameLoop = window.setInterval(function () {
    localStorage.setItem('goldMinerSave', JSON.stringify(gameData))
}, 5000)

saveData = JSON.parse(localStorage.getItem("goldMinerSave"))
if (saveData !== null) {
    gameData = saveData
    updateGameData()
} else {
    resetGameData()
}

//UTILS
function prettify(input) {
    return input.toFixed(1).toString()
}

function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = new obj.constructor();
    for (var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}