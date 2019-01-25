var gold = {
	name:'gold',
	total:0,
	perClick:5,
	perClickUpgradeMod:1,
	perClickUpgradeCost:10,
	perClickUpgradeCostMod:2.25,
	perTick:0,
},
food = {
	name:'food',
	total:0,
	perClick:1,
	perClickUpgradeMod:1,
	perClickUpgradeCost:10,
	perClickUpgradeCostMod:2.25,
	perTick:0,
},
memes = {
	name:'memes',
	total:9000,
	perClick:0,
	perClickUpgradeMod:0,
	perClickUpgradeCost:0,
	perClickUpgradeCostMod:0,
	perTick:0,
},

worker = {
	name:'worker',
	type:'unit',
	total:0,
	require:{
		gold:10,
		food:0
	}
}

mine = {
	name:'mine',
	type:'structure',
	total:0,
	require:{
		worker:1,
		gold:10
	},
	effect:{
		goldPerTick:0.1
	}	
}


var gameData = {
	//gold:gold
}

//RESOURCES
function clickResource(resource) {
	resource.total += resource.perClick
	updateGameData()
}

function resourcePerTick(resource) {
	resource.perTick=gameData.mine.effect.goldPerTick*gameData.mine.total
	resource.total += resource.perTick
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

//UNITS
function createUnit(unit) {
	if(gameData.gold.total>=unit.require.gold){
		unit.total+=1
		gameData.gold.total -=unit.require.gold
		updateGameData()
	}
}

//UNITS
function createStructure(structure) {
	if(gameData.gold.total>=structure.require.gold && gameData.worker.total>=structure.require.worker){
		structure.total+=1
		gameData.gold.total -=structure.require.gold
		gameData.worker.total -=structure.require.worker
		updateGameData()
	}
}

//DATA
function updateGameData(){
	//GOLD
	document.getElementById("goldTotal").innerHTML = prettify(gameData.gold.total)
	document.getElementById("goldPerTick").innerHTML = prettify(gameData.gold.perTick)
	document.getElementById("goldPerClick").innerHTML = prettify(gameData.gold.perClick)
	document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.gold.perClick + ")"
	document.getElementById("perClickUpgradeCost").innerHTML = prettify(gameData.gold.perClickUpgradeCost)
	//FOOD
	document.getElementById("foodTotal").innerHTML = prettify(gameData.food.total)
	document.getElementById("foodPerTick").innerHTML = prettify(gameData.food.perTick)
	document.getElementById("foodPerClick").innerHTML = prettify(gameData.food.perClick)
	//document.getElementById("foodPerClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.food.perClick + ")"
	//document.getElementById("foodPerClickUpgradeCost").innerHTML = prettify(gameData.food.perClickUpgradeCost)
	//MEMES
	document.getElementById("memesTotal").innerHTML = prettify(gameData.memes.total)
	//document.getElementById("memesPerTick").innerHTML = prettify(gameData.memes.perTick)
	//document.getElementById("memesPerClick").innerHTML = prettify(gameData.memes.perClick)
	//WORKERS
	document.getElementById("workerTotal").innerHTML = gameData.worker.total
	document.getElementById("workerCost").innerHTML = prettify(gameData.worker.require.gold)
	//MINE
	document.getElementById("mineTotal").innerHTML = gameData.mine.total
	document.getElementById("mineCostGold").innerHTML = prettify(gameData.mine.require.gold)
	document.getElementById("mineCostWorker").innerHTML = prettify(gameData.mine.require.worker)
}

function resetGameData(){
	gameData.gold = clone(gold)
	gameData.food = clone(food)
	gameData.memes = clone(memes)
	gameData.worker = clone(worker)
	gameData.mine = clone(mine)
	updateGameData()
	localStorage.removeItem('goldMinerSave')
}


//MAIN LOOP
var mainGameLoop = window.setInterval(function() {
  resourcePerTick(gameData.gold)
}, 1000)

//SAVE AND LOAD
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('goldMinerSave', JSON.stringify(gameData))
}, 5000)

saveData = JSON.parse(localStorage.getItem("goldMinerSave"))
if (saveData !== null) {
	gameData = saveData
	updateGameData()
}else{
	resetGameData()
}

//UTILS
function prettify(input){
	return input.toFixed(1).toString()
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}