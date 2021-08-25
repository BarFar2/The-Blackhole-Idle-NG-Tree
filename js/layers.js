zero = new OmegaNum(0)
one = new OmegaNum(1)
two = new OmegaNum(2)
three = new OmegaNum(3)
four = new OmegaNum(4)
five = new OmegaNum(0)
six = new OmegaNum(1)
sewen = new OmegaNum(2)
eight = new OmegaNum(3)
nine = new OmegaNum(4)
function subToAdd(num) {
    if (num.lte(0)) {
        num = zero.sub(num);
    }
    return num
}
function getTDimMult(num) {
    var ACBD = player.d.BTD[num];
    var dimMult = new OmegaNum(2).pow(ACBD);
    dimMult = dimMult.mul(new OmegaNum(1.5).pow(player.a.achievements.length));
    dimMult = dimMult.mul(player.r12.TDimMult)
    if (hasUpgrade("r21",22)) {
        dimMult = dimMult.mul(player.r21.points.add(1))
    }
    if (hasUpgrade("r21",25)) {
        dimMult = dimMult.pow(1.05)
    }
    return dimMult;
}
function getBDimMult(num) {
    var dimMult = new OmegaNum(2).pow(player.d.BBD[num]);
    dimMult = dimMult.mul(new OmegaNum(1.5).pow(player.a.achievements.length));
    dimMult = dimMult.mul(player.d.TSMult.root(num ** 0.5 + 1))
    dimMult = dimMult.mul(player.r11.dimMult)
    if (hasUpgrade("r21",22)) {
        dimMult = dimMult.mul(player.r21.points.add(1))
    }
    if (hasUpgrade("r21",23)) {
        dimMult = dimMult.mul(player.d.points.add(1).log10().pow(0.5))
    }
    if (hasUpgrade("r21",25)) {
        dimMult = dimMult.pow(1.05)
    }
    return dimMult;
}
function getBotDim(id) {
    var a = getBuyableAmount("d",id)
    if (a.gte(200)) {
        a = a.sub(200).div(2).add(200)
        if (a.gte(300)) {
            a = a.sub(300).div(3).add(300)
        }
    }
    if (hasUpgrade("r21",14)) {
        a = a.mul(16).div(15)
    }
    if (hasUpgrade("r21",24)) {
        a = a.mul(17).div(16)
    }
    return a
}
function buyMax(start,base) {
    var h = player.d.points.log10();
    h = h.sub(start)
    if (h.gte(0)){
        var i = h.div(base).floor().add(1)
        return i
    } else {
        return zero
    }
}
function onClick11() {
    player.d.BD[0] = player.d.BD[0].add(buyMax(1,1).sub(getBuyableAmount("d", 11)));
    setBuyableAmount("d", 11, buyMax(1,1))
    player.d.BBD[0] = getBotDim(11);
    player.d.BDM[0] = getBDimMult(0);
                
    player.d.BD[1] = player.d.BD[1].add(buyMax(3,3).sub(getBuyableAmount("d", 12)));
    setBuyableAmount("d", 12, buyMax(3,3))
    player.d.BBD[1] = getBotDim(12);
    player.d.BDM[1] = getBDimMult(1);
                
    player.d.BD[2] = player.d.BD[2].add(buyMax(16,5).sub(getBuyableAmount("d", 13)));
    setBuyableAmount("d", 13, buyMax(16,5))
    player.d.BBD[2] = getBotDim(13);
    player.d.BDM[2] = getBDimMult(2);
                
    player.d.BD[3] = player.d.BD[3].add(buyMax(25,8).sub(getBuyableAmount("d", 14)));
    setBuyableAmount("d", 14, buyMax(25,8))
    player.d.BBD[3] = getBotDim(14);
    player.d.BDM[3] = getBDimMult(3);
                
    player.d.TD[0] = player.d.TD[0].add(buyMax(16,4).sub(getBuyableAmount("d", 21)));
    setBuyableAmount("d", 21, buyMax(16,4))
    player.d.BTD[0] = getBotDim(21);
    player.d.TDM[0] = getTDimMult(0);
                
    player.d.TD[1] = player.d.TD[1].add(buyMax(16,5).sub(getBuyableAmount("d", 22)));
    setBuyableAmount("d", 22, buyMax(24,9))
    player.d.BTD[1] = getBotDim(22);
    player.d.TDM[1] = getTDimMult(1);
                
    player.d.TD[2] = player.d.TD[2].add(buyMax(36,16).sub(getBuyableAmount("d", 23)));
    setBuyableAmount("d", 23, buyMax(36,16))
    player.d.BTD[2] = getBotDim(23);
    player.d.TDM[2] = getTDimMult(2);
                
    player.d.TD[3] = player.d.TD[3].add(buyMax(48,25).sub(getBuyableAmount("d", 24)));
    setBuyableAmount("d", 24, buyMax(48,25))
    player.d.BTD[3] = getBotDim(24);
    player.d.TDM[3] = getTDimMult(3);
}
/*function buyableBuy(id,num,start,base) {
    player.d.points = player,d.points.sub(new OmegaNum(10).pow(start).mul(new OmegaNum(10).pow(base).pow((buyMax(start,base).sub(1)).max(getBuyableAmount("d", id)))))
    setBuyableAmount("d", id, buyMax(start,base))
    if (id > 10 && id < 20) {
        player.d.BBD[num] = getBotDim(id);
        player.d.BD[num] = player.d.BD[num].add(1);
        player.d.BDM[num] = getBDimMult(num);
    } else if (id > 20) {
        player.d.BTD[num] = getBotDim(id);
        player.d.TD[num] = player.d.BD[num].add(1);
        player.d.TDM[num] = getBDimMult(num);
    }
}*/

addLayer("d", {
    name: "d", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    startData() {
        return {
            //part1
            unlocked: true,
            points: new OmegaNum(0),
            timeShards: new OmegaNum(0),
            TSMult: new OmegaNum(1),
            BD: [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)],
            BBD: [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)],
            BDM: [new OmegaNum(1), new OmegaNum(1), new OmegaNum(1), new OmegaNum(1)],
            TD: [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)],
            BTD: [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)],
            TDM: [new OmegaNum(1), new OmegaNum(1), new OmegaNum(1), new OmegaNum(1)],
            massMult: [new OmegaNum(1), new OmegaNum(1), new OmegaNum(1), new OmegaNum(1)],
            massMultResult: new OmegaNum(1),
            timeMult: [new OmegaNum(0), new OmegaNum(1), new OmegaNum(1), new OmegaNum(1)],
            timeMultResult: new OmegaNum(1),
        }
    },
    color: "#FFFFFF",
    resource: "黑洞质量", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        player.points = player.d.points
        player.d.BDM = [getBDimMult(0), getBDimMult(1), getBDimMult(2), getBDimMult(3)];
        player.d.TDM = [getTDimMult(0), getTDimMult(1), getTDimMult(2), getTDimMult(3)];
        player.d.massMultResult = player.d.massMult[0].mul(player.d.massMult[1]).mul(player.d.massMult[2]).mul(player.d.massMult[3]).pow(player.r12.massExp);
        player.d.timeMultResult = player.d.timeMult[0].mul(player.d.timeMult[1]).mul(player.d.timeMult[2]).mul(player.d.timeMult[3]).pow(player.r11.TSExp);
        player.d.TSMult = (player.d.timeShards.add(1)).root(10);
        if (hasUpgrade("r21",13) && !hasUpgrade("r21",21)) {
            if (player.d.points.gt(new OmegaNum("3.24e616"))) { player.d.points = new OmegaNum("3.24e616")}
        } else if (hasUpgrade("r21",21)) {
            
        } else {
            if (player.d.points.gt(new OmegaNum("1.8e308"))) { player.d.points = new OmegaNum("1.8e308")}
        }
        mult = new OmegaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new OmegaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    
    effectDescription() {
        if (player.r11.points.gt(0)) {
            var word2 = "( " + format(player.d.timeMult[0]) + " x " + format(player.d.timeMult[1]) + " x " + format(player.d.timeMult[2]) + " x " + format(player.d.timeMult[3]) + " ) ^ " + format(player.r11.TSExp,3) + " = +" + format(player.d.timeMultResult) + " /s"
            if (player.r12.points.gt(0)) {
                var word1 = "( " + format(player.d.massMult[0]) + " x " + format(player.d.massMult[1]) + " x " + format(player.d.massMult[2]) + " x " + format(player.d.massMult[3]) + " ) ^ " + format(player.r12.massExp,3) + " = +" + format(player.d.massMultResult)
            } else {
                var word1 = format(player.d.massMult[0]) + " x " + format(player.d.massMult[1]) + " x " + format(player.d.massMult[2]) + " x " + format(player.d.massMult[3]) + " = +" + format(player.d.massMultResult)
            }
        } else {
            var word2 = format(player.d.timeMult[0]) + " x " + format(player.d.timeMult[1]) + " x " + format(player.d.timeMult[2]) + " x " + format(player.d.timeMult[3]) + " = +" + format(player.d.timeMultResult) + " /s"
            if (player.r12.points.gt(0)) {
                var word1 = "( " + format(player.d.massMult[0]) + " x " + format(player.d.massMult[1]) + " x " + format(player.d.massMult[2]) + " x " + format(player.d.massMult[3]) + " ) ^ " + format(player.r12.massExp,3) + " = +" + format(player.d.massMultResult)
            } else {
                var word1 = format(player.d.massMult[0]) + " x " + format(player.d.massMult[1]) + " x " + format(player.d.massMult[2]) + " x " + format(player.d.massMult[3]) + " = +" + format(player.d.massMultResult)
            }
        }
        var word0 = "";
        if (!hasUpgrade("r21",21)){
            if (hasUpgrade("r21",13)) {
                if (player.d.points.gte(new OmegaNum("3.24e616"))) {
                    word0 = "(已达硬上限)"
                }
            } else {
                if (player.d.points.gte(new OmegaNum("1.8e308"))) {
                    word0 = "(已达硬上限)"
                }
            }
        }
        return word0 + "<br>生产倍率："+ word1 + " /s<br><br>您有" + format(player.d.timeShards) + "时间碎片，加成黑洞维度x" + format(player.d.TSMult) + "(对高维效果减弱)<br>生产倍率：" + word2
    },

    //layerShown(){return player.v.total.gte(1)},
    clickables: {
        11: {
            canClick(){return true},
            display() {return "购买最大(M)"},
            onClick(){
                onClick11();
            },
        },
    },
    /*
    upgrades: {
        11: {
            description: "next update is in 5 hours。",
            cost(){return new OmegaNum(5)},
            unlocked(){return true},
            currencyDisplayName:"hours of update time"
        },player[layer].points
    },
    */
    buyables: {
        11: {
            cost() { return new OmegaNum(10).mul(new OmegaNum(10).pow((buyMax(1,1).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "零维引力发生器",
            display() { return "x" + format(player.d.BDM[0]) + "<br>数量：" + format(player.d.BD[0]) + "(" + format(player.d.BBD[0]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(1,1).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(1,1))
                player.d.BBD[0] = getBotDim(11);
                player.d.BD[0] = player.d.BD[0].add(1);
                player.d.BDM[0] = getBDimMult(0);
            },
        },
        12: {
            cost() { return new OmegaNum('e3').mul(new OmegaNum('e3').pow((buyMax(3,3).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "一维引力发生器",
            display() { return "x" + format(player.d.BDM[1]) + "<br>数量：" + format(player.d.BD[1]) + "(" + format(player.d.BBD[1]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(3,3).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(3,3))
                player.d.BBD[1] = getBotDim(12);
                player.d.BD[1] = player.d.BD[1].add(1);
                player.d.BDM[1] = getBDimMult(1);
            },
        },
        13: {
            cost() { return new OmegaNum('e16').mul(new OmegaNum('e5').pow((buyMax(16,5).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "二维引力发生器",
            display() { return "x" + format(player.d.BDM[2]) + "<br>数量：" + format(player.d.BD[2]) + "(" + format(player.d.BBD[2]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(16,5).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(16,5))
                player.d.BBD[2] = getBotDim(13);
                player.d.BD[2] = player.d.BD[2].add(1);
                player.d.BDM[2] = getBDimMult(2);
            }
        },
        14: {
            cost() { return new OmegaNum('e25').mul(new OmegaNum('e8').pow((buyMax(25,8).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "三维引力发生器",
            display() { return "x" + format(player.d.BDM[3]) + "<br>数量：" + format(player.d.BD[3]) + "(" + format(player.d.BBD[3]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(25,8).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(25,8))
                player.d.BBD[3] = getBotDim(14);
                player.d.BD[3] = player.d.BD[3].add((buyMax(25,8).sub(getBuyableAmount(this.layer, this.id))).max(1));
                player.d.BDM[3] = getBDimMult(3);
            },
        },
        21: {
            cost() { return new OmegaNum('e16').mul(new OmegaNum('e4').pow((buyMax(16,4).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "零维时间曲速器",
            display() { return "x" + format(player.d.TDM[0]) + "<br>数量：" + format(player.d.TD[0]) + "(" + format(player.d.BTD[0]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(16,4).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(16,4))
                player.d.BTD[0] = getBotDim(21);
                player.d.TD[0] = player.d.TD[0].add(1);
                player.d.TDM[0] = getBDimMult(0);
            },
        },
        22: {
            cost() { return new OmegaNum('e24').mul(new OmegaNum('e9').pow((buyMax(24,9).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "一维时间曲速器",
            display() { return "x" + format(player.d.TDM[1]) + "<br>数量：" + format(player.d.TD[1]) + "(" + format(player.d.BTD[1]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(14,9).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(24,9))
                player.d.BTD[1] = getBotDim(22);
                player.d.TD[1] = player.d.TD[1].add(1);
                player.d.TDM[1] = getBDimMult(1);
            },
        },
        23: {
            cost() { return new OmegaNum('e36').mul(new OmegaNum('e16').pow((buyMax(36,16).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title: "二维时间曲速器",
            display() { return "x" + format(player.d.TDM[2]) + "<br>数量：" + format(player.d.TD[2]) + "(" + format(player.d.BTD[2]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(36,16).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(36,16))
                player.d.BTD[2] = getBotDim(23);
                player.d.TD[2] = player.d.TD[2].add(1);
                player.d.TDM[2] = getBDimMult(2);
            },
        },
        24: {
            cost() { return new OmegaNum('e48').mul(new OmegaNum('e25').pow((buyMax(48,25).sub(1)).max(getBuyableAmount(this.layer, this.id)))) },
            canAfford() { return player[this.layer].points.gte(this.cost(48,25)) },
            title: "三维时间曲速器",
            display() { return "x" + format(player.d.TDM[3]) + "<br>数量：" + format(player.d.TD[3]) + "(" + format(player.d.BTD[3]) + ")<br>价格：" + format(this.cost()) + "质量<br>(购买" + format((buyMax(48,25).sub(getBuyableAmount(this.layer, this.id))).max(1)) + "个)" },
            buy() {
                setBuyableAmount(this.layer, this.id, buyMax(48,25))
                player.d.BTD[3] = getBotDim(24);
                player.d.TD[3] = player.d.TD[3].add((buyMax(48,25).sub(getBuyableAmount(this.layer, this.id))).max(1));
                player.d.TDM[3] = getBDimMult(3);
            },
        },
    },
    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(OmegaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */

    //inportant!!!
    update(diff) {
        //生产物质/时间碎片
        if (hasUpgrade("r21",13) && !hasUpgrade("r21",21)) {
            if (player.d.points.gt(new OmegaNum("3.24e616"))) { player.d.points = new OmegaNum("3.241e616")} else {player.d.points = player.d.points.add(player.d.massMultResult.mul(diff)) }
        } else if (!hasUpgrade("r21",13)) {
            if (player.d.points.gt(new OmegaNum("1.8e308"))) { player.d.points = new OmegaNum("1.81e308")} else {player.d.points = player.d.points.add(player.d.massMultResult.mul(diff)) }
        } else {
            player.d.points = player.d.points.add(player.d.massMultResult.mul(diff)) 
        }
        player.d.timeShards = player.d.timeShards.add(player.d.timeMultResult.mul(diff))
        //生产 生产倍率
        player.d.massMult[0] = player.d.massMult[0].add(player.d.BD[0].mul(player.d.BDM[0]).mul(diff).mul(2.5))
        player.d.massMult[1] = player.d.massMult[1].add(player.d.BD[1].mul(player.d.BDM[1]).mul(diff).mul(2.5))
        player.d.massMult[2] = player.d.massMult[2].add(player.d.BD[2].mul(player.d.BDM[2]).mul(diff).mul(2.5))
        player.d.massMult[3] = player.d.massMult[3].add(player.d.BD[3].mul(player.d.BDM[3]).mul(diff).mul(2.5))
        player.d.timeMult[0] = player.d.timeMult[0].add(player.d.TD[0].mul(player.d.TDM[0]).mul(diff).mul(2.5))
        player.d.timeMult[1] = player.d.timeMult[1].add(player.d.TD[1].mul(player.d.TDM[1]).mul(diff).mul(2.5))
        player.d.timeMult[2] = player.d.timeMult[2].add(player.d.TD[2].mul(player.d.TDM[2]).mul(diff).mul(2.5))
        player.d.timeMult[3] = player.d.timeMult[3].add(player.d.TD[3].mul(player.d.TDM[3]).mul(diff).mul(2.5))
        //生产维度
        player.d.BD[0] = player.d.BD[0].add(player.d.BD[1].mul(player.d.BDM[1]).root(1.6).mul(diff).mul(0.2))
        player.d.BD[1] = player.d.BD[1].add(player.d.BD[2].mul(player.d.BDM[2]).root(1.6).mul(diff).mul(0.2))
        player.d.BD[2] = player.d.BD[2].add(player.d.BD[3].mul(player.d.BDM[3]).root(1.6).mul(diff).mul(0.2))
        if (hasUpgrade("r21",11)) {
        player.d.BD[3] = player.d.BD[3].add(player.d.BD[0].mul(player.d.BDM[0]).root(40).mul(diff).mul(1.0))
        }
        player.d.TD[0] = player.d.TD[0].add(player.d.TD[1].mul(player.d.TDM[1]).root(1.6).mul(diff).mul(0.2))
        player.d.TD[1] = player.d.TD[1].add(player.d.TD[2].mul(player.d.TDM[2]).root(1.6).mul(diff).mul(0.2))
        player.d.TD[2] = player.d.TD[2].add(player.d.TD[3].mul(player.d.TDM[3]).root(1.6).mul(diff).mul(0.2))
        if (hasUpgrade("r21",15)) {
            player.d.TD[3] = player.d.TD[3].add(player.d.TD[0].mul(player.d.TDM[0]).root(20).mul(diff).mul(1.0))
        }
    },
    hotkeys: [
        {
            key: "m",
            description: "m: 购买最大维度",
            onPress() { onClick11()},
            unlocked() {return true}
        },
    ]
})

function eff2(num) {
    if (num == 1){
        var eff2 = player.r11.points.add(10).log10().log10().div(1.2).root(4);
    } else {
        var eff2 = player.r11.points.add(player.d.points).add(10).log10().log10().div(1.2).root(4);
    }
    if (eff2.gte(1)) {return eff2} else {return new OmegaNum(1)}
}

addLayer('r11', {
    name: "r11", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TW", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches:['d'],
    position: 1,
    row:0,
    startData() {
        return {
            unlocked:false,
            points:new OmegaNum(0),

            dimMult:new OmegaNum(1),
            ARDimMult:new OmegaNum(1),
            TSExp:new OmegaNum(1),
            ARTSExp:new OmegaNum(1)
        }
    },
    passiveGeneration() {
       if (hasAchievement("a",23)) {
           return 0.01
       } else {
           return 0
       }
    },
    gainMult() {
        player.r11.dimMult = player.r11.points.add(1).root(50)
        player.r11.ARDimMult = player.d.points.add(player.r11.points.add(1)).root(50)
        player.r11.TSExp = eff2(1)
        player.r11.ARTSExp = eff2(2)
        if (hasUpgrade("r21",13) && hasUpgrade("r21",21)) {
            player.r11.dimMult = player.r11.points.add(1).root(50).pow(1.1)
            player.r11.ARDimMult = player.d.points.add(player.r11.points.add(1)).root(50).pow(1.1)
            player.r11.TSExp = eff2(1).pow(1.1)
            player.r11.ARTSExp = eff2(2).pow(1.1)
        }
        mult = new OmegaNum("e50")
        return mult
    },
    color: "#FFFFFF",
    resource: "因时间扭曲而重置的黑洞质量",
    baseAmount() {return player.d.points},
    type: "normal", 
    exponent:1,
    baseResource: "黑洞质量", 
    requires: new OmegaNum("e50"),  
    
    effectDescription() { return "<br>给予物质维度x" + format(player.r11.ARDimMult) + "(" + format(player.r11.dimMult) + ")的倍率并给予时间碎片^" + format(player.r11.ARTSExp,3) + "(" + format(player.r11.TSExp,3) + ")的加成<br>但重置您的维度" },
    
})

function eff3(num) {
    if (num == 1){
        var eff3 = player.r12.points.add(10).log10().log10().div(1.85).root(2.5);
    } else {
        var eff3 = player.r12.points.add(player.d.points).add(10).log10().log10().div(1.85).root(2.5);
    }
    if (eff3.gte(1)) {return eff3} else {return new OmegaNum(1)}
}

addLayer('r12', {
    name: "r12", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SC", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches:['r11'],
    position: 2,
    row:0,
    startData() {
        return {
            unlocked:false,
            points:new OmegaNum(0),

            massExp:new OmegaNum(1),
            ARMassExp:new OmegaNum(1),
            TDimMult:new OmegaNum(1),
            ARTDimMult:new OmegaNum(1),
        }
    },
    passiveGeneration() {
        if (hasAchievement("a",23)) {
            return 0.01
        } else {
            return 0
        }
     },
    gainMult() {
        player.r12.massExp = eff3(1)
        player.r12.ARMassExp = eff3(2)
        if (hasUpgrade("r21",12)) {
            player.r12.TDimMult = player.r12.points.add(1).root(150)
            player.r12.ARTDimMult = player.r12.points.add(player.points).root(150)
        }
        if (hasUpgrade("r21",13) && hasUpgrade("r21",21)) {
            player.r12.massExp = eff3(1).pow(1.1)
            player.r12.ARMassExp = eff3(2).pow(1.1)
            if (hasUpgrade("r21",12)) {
                player.r12.TDimMult = player.r12.points.add(1).root(150).pow(1.1)
                player.r12.ARTDimMult = player.r12.points.add(player.points).root(150).pow(1.1)
            }
        }
        mult = new OmegaNum("e150")
        return mult
    },
    color: "#FFFFFF",
    resource: "因空间收缩而重置的黑洞质量",
    baseAmount() {return player.d.points},
    type: "normal", 
    exponent:1,
    baseResource: "黑洞质量", 
    requires: new OmegaNum("e150"),  
    doReset(layer) {
        if (hasAchievement("a",21)) {
            player.d.points = new OmegaNum(10)
        } else {
            player.d.points = new OmegaNum(0)
        }
        player.d.timeShards = new OmegaNum(0);
        player.d.BD = [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)];
        player.d.TD = [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)];
        player.d.BBD = [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)];
        player.d.BTD = [new OmegaNum(0), new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)];
        player.d.massMult = [new OmegaNum(1), new OmegaNum(1), new OmegaNum(1), new OmegaNum(1)];
        player.d.timeMult = [new OmegaNum(1), new OmegaNum(1), new OmegaNum(1), new OmegaNum(1)];
        setBuyableAmount("d", 11, new OmegaNum(0));
        setBuyableAmount("d", 12, new OmegaNum(0));
        setBuyableAmount("d", 13, new OmegaNum(0));
        setBuyableAmount("d", 14, new OmegaNum(0));
        setBuyableAmount("d", 21, new OmegaNum(0));
        setBuyableAmount("d", 22, new OmegaNum(0));
        setBuyableAmount("d", 23, new OmegaNum(0));
        setBuyableAmount("d", 24, new OmegaNum(0));
        if (layer != "r11") {
            player.r11.points = zero;
            if (layer != "r12") {
                player.r12.points = zero;
            }
        }
    },
    effectDescription() { 
        if (hasUpgrade("r21",12)) {
            var word1 = "并给予时间维度x" + format(player.r12.ARTDimMult) + "(" + format(player.r12.TDimMult) + ")的倍率";
        } else {
            var word1 = "";
        }
        return "<br>给予物质获取量^"  + format(player.r12.ARMassExp,3) + "(" + format(player.r12.massExp,3) + ")的加成" + word1 + "<br>但重置您的维度和时间扭曲" 
    },
})

function rowUps(row) {
    var j = 0;
    var rowUps = []
    for (var i = 0; i < player.r21.upgrades.length; i++) {
        if (player.r21.upgrades[i] > row * 10 && i < row * 10 + 10) {
            rowUps[j] = player.r21.upgrades[i]
            j++;
        }
    }
    return rowUps.length;
}

addLayer('r21', {
    name: "r21", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches:["d","r11","r12"],
    position: 0,
    row:1,
    startData() {
        return {
            unlocked:false,
            points:new OmegaNum(0),
            
            r:new OmegaNum(0),
        }
    },
    gainMult() {
        mult = new OmegaNum(1)
        return mult
    },
    color: "#AAFFAA",
    resource: "坍缩点(CP)",
    baseAmount() {return player.d.points},
    type: "normal", 
    exponent:0.0025,
    baseResource: "黑洞质量", 
    requires: new OmegaNum("1.8e308"),  
    //tabFormat: {
    //    升级: {
    //        
    //    }
    //},
    clickables: {
        11: {
            canClick(){return true},
            display() {return "重置所有购买过的升级，不会返还花费的CP"},
            onClick(){
                player.r21.upgrades = []
                r = r.add(1)
            },
        },
    },
    upgrades: {
        11: {
            title: "环",
            cost() { return new OmegaNum(1).mul(two.pow(rowUps(1)))},
            description: "质量零维以极小的指数生产质量三维(^0.025)"
        },
        12: {
            title: "跟第一个重置反一下",
            cost() { return new OmegaNum(1).mul(two.pow(rowUps(1)))},
            description: "因空间收缩而重置的黑洞质量还加成时间维度(^(1/150))"
        },
        13: {
            title: "扩充",
            cost() { return new OmegaNum(1).mul(two.pow(rowUps(1)))},
            description: "物质硬上限^2"
        },
        14: {
            title: "买十五送一",
            cost() { return new OmegaNum(1).mul(two.pow(rowUps(1)))},
            description: "购买一个维度会获得的购买过的维度*(16/15)"
        },
        15: {
            title: "首尾呼应",
            cost() { return new OmegaNum(1).mul(two.pow(rowUps(1)))},
            description: "时间零维以极小的指数生产时间三维(^0.05)"
        },
        21: {
            title: "硬上限？滚",
            cost() { return new OmegaNum(5).mul(five.pow(rowUps(2)))},
            description: "移除物质硬上限，U13效果变为\"两种重置的效果^1.1\""
        },
        22: {
            title: "购买危机",
            cost() { return new OmegaNum(5).mul(five.pow(rowUps(2)))},
            description: "维度倍率乘以(CP+1)"
        },
        23: {
            title: "物维质度",
            cost() { return new OmegaNum(5).mul(five.pow(rowUps(2)))},
            description: "物质加成物质维度(log(x+1)^0.5)"
        },
        24: {
            title: "买十六送一",
            cost() { return new OmegaNum(5).mul(five.pow(rowUps(2)))},
            description: "购买一个维度会获得的购买过的维度*(17/16)"
        },
        25: {
            title: "盲盒",
            cost() { return new OmegaNum(5).mul(three.pow(rowUps(2)))},
            description: "不告诉你具体的buff，反正买了之后会变快"
        },
    }
})

addLayer ("a",{
    name: "a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0,
    row:"side",
    startData() {
        return {
            unlocked:true,
            points:new OmegaNum(0),
        }
    },
    getMult() {
        player.a.points = player.a.achievements.length
    },
    color:"#FFFF00",
    resource: "成就点",
    achievements:{
        11:{
            name:"数组维度?",
            tooltip:"购买第零物质维度，奖励：每一个完成的成就都加成物质维度*1.5，而且购买不花费点数",
            done(){ return player.d.BBD[0].gte(1) },
        },
        12:{
            name:"一维生产massMult,<br>massMult生产物质，不是二维码？",
            tooltip:"购买第一物质维度",
            done(){ return player.d.BBD[1].gte(1) },
        },
        13:{
            name:"这个成就的名字是没有名字的成就",
            tooltip:"购买第二物质维度",
            done(){ return player.d.BBD[2].gte(1) },
        },
        14:{
            name:"3D游戏?",
            tooltip:"购买第三物质维度",
            done(){ return player.d.BBD[3].gte(1) },
        },
        15:{
            name:"new start",
            tooltip:"一阶重置一次(以后简称r11)",
            done(){ return player.r11.points.gte(1) },
        },
        16:{
            name:"new start^2",
            tooltip:"二阶重置一次(以后简称r12)",
            done(){ return player.r12.points.gte(1) },
        },
        21:{
            name:"var bigCrunsh = newStart()",
            tooltip:"r21一次，类……大坍缩一次，奖励：重置会让物质变成10而不是0",
            done(){ return player.r21.points.gte(1) },
        },
        22:{
            name:"概不退货",
            tooltip:"重置CU一次",
            done(){ return player.r21.r.gte(1) },
        },
        23:{
            name:"呜呜呜",
            tooltip:"购买5个CU，奖励：每秒获得当前重置可获得的TW质量和SC质量的1%",
            done(){ return player.r21.upgrades.length >= 5 },
        },
    },
})
