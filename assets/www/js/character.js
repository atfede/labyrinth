function Character(type, life, name, weapon) {
    this.type = type; //knight, orc, goblin
    this.life = life; //varía según personaje
    this.name = name;
    this.weapon = weapon;

    this.attack = function () {
        alert('do...');
    };
    this.block = function () {
        alert('do...');
    };
    this.cast = function () {
        alert('do...');
    };
}

// var Player.prototype = new Character(type, life, name, weapon);
// var Enemy.prototype = new Character(type, life, name, weapon);

function Player(type, life, name, weapon, xp) {
    this.prototype = new Character(type, life, name, weapon);
    this.prototype.constructor = Player;
    this.xp = xp;

    this.attack = function () {
        switch (this.prototype.weapon) {
            case "sword":
                return swordAtack();
                break;
            case "axe":
//                axeAtack();
                break;
            case "knife":
//                knifeAtack();
                break;
        }
    };
    this.update = function (damage) {
        this.prototype.life -= damage;
        if (this.prototype.life <= 0) {
            gameOver();
        }
    };
}

function Enemy(type, life, name, weapon) {
    this.prototype = new Character(type, life, name, weapon);
    this.prototype.constructor = Enemy;

    this.attack = function () {
        switch (this.prototype.type) {
            case "werewolf":
                return clawAttack();
                break;
            case "mage":
                return iceAttack();
                break;
            case "enemy1":
               return poundAttack();
                break;
        }
    };

    this.update = function (damage) {
        if (damage === 0) {
            return "no damage"; //miss
        }
        else {
            this.prototype.life -= damage;
            if (this.prototype.life <= 0) {
                destroyEnemy();
            }
        }
    };
}

/*player*/
function swordAtack() {
    var damage = Math.floor(Math.random() * 7);
//    alert("enemy damaged: " + damage + " pts");
    return damage;
}

/*enemy*/
function clawAttack() {
    var damage = Math.floor(Math.random() * 6);
//    alert("Claw - player damaged: " + damage + " pts");
    return damage;
}

function iceAttack() {
    var damage = Math.floor(Math.random() * 5);
//    alert("Ice - player damaged: " + damage + " pts");
    return damage;
}

function poundAttack() {
    var damage = Math.floor(Math.random() * 7);
//    alert("Pound - player damaged: " + damage + " pts");
    return damage;
}
/******/
