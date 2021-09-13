const app = new Vue({
    el: "#app",
    data:{
        modalMessage: false,
        monsterWidth: "",
        playerWidth: "",
        battleLog:[],
        showPopUp:false
    },
    methods:{
        getHealthValue(el){
            let width
            if(el == "monster") width = this.monsterWidth
            else if(el == "player") width = this.playerWidth

            if(width == "") return 100
            else{
                width = width.substring(0,width.length-1)
                return parseInt(width)
            }
        },
        setHealthValue(el, health, decreaseBy){
            let decreasedHealth = health - decreaseBy
            if(decreasedHealth < 0 ){
                decreasedHealth = 0
            }
            else if(decreasedHealth > 100){
                decreasedHealth = 100
            }
            if(el == "monster") this.monsterWidth = `${decreasedHealth}%`
            else if(el == "player") this.playerWidth = `${decreasedHealth}%`
            this.checkForWins()
        },
        checkForWins(){
            const monsterHealthVal = this.getHealthValue("monster")
            const playerHealthVal = this.getHealthValue("player")
            if(monsterHealthVal <= 0){
                this.showGameOver("You win!")
            }
            else if(playerHealthVal <= 0){
                this.showGameOver("Monster Wins")
            }
        },
        showGameOver(msg){
            this.modalMessage = msg
            this.showPopUp = true
        },
        surrenderGame(){
            this.setHealthValue("player", this.getHealthValue("player"), 100)  
        },
        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        playerAttackingMonster(){
            let playerAttackValue = this.randomIntFromInterval(1,10)
            this.setHealthValue("monster", this.getHealthValue("monster"), playerAttackValue)
            this.pushLogs(new Log('You','damaged','Monster',playerAttackValue ))
            this.monsterHealthAttackingPlayer()
        },
        monsterHealthAttackingPlayer(){
            let monsterAttackValue = this.randomIntFromInterval(1,10)
            this.setHealthValue("player", this.getHealthValue("player"), monsterAttackValue)
            this.pushLogs(new Log('Monster','damaged','you',monsterAttackValue ))
        },
        pushLogs(log){
            const {entity, enemy, value, action} = log
            const textlog = `${entity} ${action} ${enemy} by ${value} elixir`
            this.battleLog.push(textlog)
        },
        playerSplAttackingMonster(){
            let playerAttackValue = this.randomIntFromInterval(10,15)
            this.setHealthValue("monster", this.getHealthValue("monster"), playerAttackValue)
            this.pushLogs(new Log('You','damaged','Monster',playerAttackValue ))
            this.monsterHealthAttackingPlayer()
        },
        healPlayer(){
            let playerHealerValue = this.randomIntFromInterval(1,10)
            this.setHealthValue("player", this.getHealthValue("player"), playerHealerValue * (-1))
            this.pushLogs(new Log('You','healed','Yourself',playerHealerValue ))
            this.monsterHealthAttackingPlayer()
        }
    }
}) 

class Log{
    constructor(entity, action, enemy, value){
        this.entity = entity
        this.enemy = enemy
        this.value = value
        this.action = action
    }
}

