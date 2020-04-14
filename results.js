
function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] == variable) { return pair[1] }
    }
    return (NaN);
}

function setBarValue(name, value) {
    innerel = document.getElementById(name)
    outerel = document.getElementById("bar-" + name)
    outerel.style.width = (value + "%")
    innerel.innerHTML = (value + "%")
    if (innerel.offsetWidth + 20 > outerel.offsetWidth) {
        innerel.style.visibility = "hidden"
    }
}

econArray = ["共产主义", "社会主义", "偏向平等", "中立", "偏向市场", "资本主义", "自由放任"]
diplArray = ["世界主义", "国际主义", "偏向国际", "中立", "偏向本国", "民族主义", "沙文主义"]
govtArray = ["无政府主义", "自由意志主义", "偏向自由", "中立", "偏向专制", "威权主义", "极权主义"]
sctyArray = ["变革", "进步", "偏向改良", "中立", "偏向保守", "传统", "反动"]
envoArray = ["深绿", "生态主义", "环保优先", "中立", "发展优先", "生产主义", "环保怀疑主义"]
function setLabel(val, ary) {
    if (val > 100) { return "" } else
        if (val > 90) { return ary[0] } else
            if (val > 75) { return ary[1] } else
                if (val > 60) { return ary[2] } else
                    if (val >= 40) { return ary[3] } else
                        if (val >= 25) { return ary[4] } else
                            if (val >= 10) { return ary[5] } else
                                if (val >= 0) { return ary[6] } else { return "" }
}

equality = getQueryVariable("econ")
peace = getQueryVariable("dipl")
liberty = getQueryVariable("govt")
progress = getQueryVariable("scty")
ecology = getQueryVariable("envo")

wealth = (100 - equality).toFixed(1)
might = (100 - peace).toFixed(1)
authority = (100 - liberty).toFixed(1)
tradition = (100 - progress).toFixed(1)
production = (100 - ecology).toFixed(1)
setBarValue("equality", equality)
setBarValue("wealth", wealth)
setBarValue("peace", peace)
setBarValue("might", might)
setBarValue("liberty", liberty)
setBarValue("authority", authority)
setBarValue("progress", progress)
setBarValue("tradition", tradition)
setBarValue("ecology", ecology)
setBarValue("production", production)

document.getElementById("economic-label").innerHTML = setLabel(equality, econArray)
document.getElementById("diplomatic-label").innerHTML = setLabel(peace, diplArray)
document.getElementById("state-label").innerHTML = setLabel(liberty, govtArray)
document.getElementById("society-label").innerHTML = setLabel(progress, sctyArray)
document.getElementById("environment-label").innerHTML = setLabel(ecology, envoArray)

ideology = ""
ideodist = Infinity
for (var i = 0; i < ideologies.length; i++) {
    dist = 0
    dist += Math.pow(Math.abs(ideologies[i].stats.econ - equality), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.govt - liberty), 2)
    dist += Math.pow(Math.abs(ideologies[i].stats.dipl - peace), 1.73856063)
    dist += Math.pow(Math.abs(ideologies[i].stats.scty - progress), 1.73856063)
//            dist += Math.pow(Math.abs(ideologies[i].stats.envo - ecology), 2)
    if (dist < ideodist) {
        ideology = ideologies[i].name
        ideodist = dist
    }
}
document.getElementById("ideology-label").innerHTML = ideology

function createImage(src, x, y, w, h) {
    img = new Image()
    img.src = src
    img.onLoad = function () {
        ctx.drawImage(img, x, y, w, h)
    }
}

window.onload = function () {
    var c = document.createElement("canvas")
    var ctx = c.getContext("2d")
    c.width = 800;
    c.height = 650;
    ctx.fillStyle = "#EEEEEE"
    ctx.fillRect(0, 0, 800, 650);

    img = document.getElementById("img-equality")
    ctx.drawImage(img, 20, 170, 100, 100);
    img = document.getElementById("img-wealth")
    ctx.drawImage(img, 680, 170, 100, 100)
    img = document.getElementById("img-might")
    ctx.drawImage(img, 20, 290, 100, 100)
    img = document.getElementById("img-peace")
    ctx.drawImage(img, 680, 290, 100, 100)
    img = document.getElementById("img-liberty")
    ctx.drawImage(img, 20, 410, 100, 100)
    img = document.getElementById("img-authority")
    ctx.drawImage(img, 680, 410, 100, 100)
    img = document.getElementById("img-tradition")
    ctx.drawImage(img, 20, 530, 100, 100)
    img = document.getElementById("img-progress")
    ctx.drawImage(img, 680, 530, 100, 100)

    ctx.fillStyle = "#222222"
    ctx.fillRect(120, 180, 560, 80)
    ctx.fillRect(120, 300, 560, 80)
    ctx.fillRect(120, 420, 560, 80)
    ctx.fillRect(120, 540, 560, 80)
    ctx.fillStyle = "#f44336"
    ctx.fillRect(120, 184, 5.6 * equality - 2, 72)
    ctx.fillStyle = "#00897b"
    ctx.fillRect(682 - 5.6 * wealth, 184, 5.6 * wealth - 2, 72)
    ctx.fillStyle = "#ff9800"
    ctx.fillRect(120, 304, 5.6 * might - 2, 72)
    ctx.fillStyle = "#03a9f4"
    ctx.fillRect(682 - 5.6 * peace, 304, 5.6 * peace - 2, 72)
    ctx.fillStyle = "#ffeb3b"
    ctx.fillRect(120, 424, 5.6 * liberty - 2, 72)
    ctx.fillStyle = "#3f51b5"
    ctx.fillRect(682 - 5.6 * authority, 424, 5.6 * authority - 2, 72)
    ctx.fillStyle = "#8bc34a"
    ctx.fillRect(120, 544, 5.6 * tradition - 2, 72)
    ctx.fillStyle = "#9c27b0"
    ctx.fillRect(682 - 5.6 * progress, 544, 5.6 * progress - 2, 72)
    ctx.fillStyle = "#222222"
    ctx.font = "700 80px Montserrat"
    ctx.textAlign = "left"
    ctx.fillText("8values", 20, 90)
    ctx.font = "50px Montserrat"
    ctx.fillText(ideology, 20, 140)

    ctx.textAlign = "left"
    if (equality > 30) { ctx.fillText(equality + "%", 130, 237.5) }
    if (might > 30) { ctx.fillText(might + "%", 130, 357.5) }
    if (liberty > 30) { ctx.fillText(liberty + "%", 130, 477.5) }
    if (tradition > 30) { ctx.fillText(tradition + "%", 130, 597.5) }
    ctx.textAlign = "right"
    if (wealth > 30) { ctx.fillText(wealth + "%", 670, 237.5) }
    if (peace > 30) { ctx.fillText(peace + "%", 670, 357.5) }
    if (authority > 30) { ctx.fillText(authority + "%", 670, 477.5) }
    if (progress > 30) { ctx.fillText(progress + "%", 670, 597.5) }

    ctx.font = "300 30px Montserrat"
    ctx.fillText("8values.github.io", 780, 60)
    ctx.fillText(version, 780, 90)
    ctx.textAlign = "center"
    ctx.fillText("Economic Axis: " + document.getElementById("economic-label").innerHTML, 400, 175)
    ctx.fillText("Diplomatic Axis: " + document.getElementById("diplomatic-label").innerHTML, 400, 295)
    ctx.fillText("Civil Axis: " + document.getElementById("state-label").innerHTML, 400, 415)
    ctx.fillText("Societal Axis: " + document.getElementById("society-label").innerHTML, 400, 535)

    document.getElementById("banner").src = c.toDataURL();
}