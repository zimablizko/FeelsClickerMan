var gold = {
	name:'gold',
	total:0,
	perClick:1,
	perTick:0,
	perClickCost:10
}
var gameData = {
	//gold:gold
}

function mineGold() {
	gameData.gold.total += gameData.gold.perClick
	updateGameData()
}

function mineGoldPerTick() {
	gameData.gold.total += gameData.gold.perTick
	updateGameData()
}

function buyGoldPerClick() {
  if (gameData.gold.total >= gameData.gold.perClickCost) {
    gameData.gold.total -= gameData.gold.perClickCost
    gameData.gold.perClick += 1
    gameData.gold.perClickCost *= 2.25
    updateGameData()
  }
}

function updateGameData(){
	  document.getElementById("goldMined").innerHTML = prettify(gameData.gold.total)
	  document.getElementById("goldPerTime").innerHTML = prettify(gameData.gold.perTick)
	  document.getElementById("goldPerClick").innerHTML = prettify(gameData.gold.perClick)
	  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.gold.perClick + ")"
	  document.getElementById("perClickUpgradeCost").innerHTML = prettify(gameData.gold.perClickCost)
  
}

function resetGameData(){
	localStorage.removeItem('goldMinerSave')
	gameData.gold = gold
	updateGameData()
}

function prettify(input){
	return input.toFixed(1).toString()
}

var mainGameLoop = window.setInterval(function() {
  mineGoldPerTick()
}, 1000)

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
