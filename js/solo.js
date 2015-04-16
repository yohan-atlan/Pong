// debut du code 
var BoolSons = true;
var sonVictoire = document.getElementById("sonApplause");
var sonCollision = document.getElementById("sonPingpong");
var sonCollision1 = document.getElementById("sonPingpong");
var sonBord = document.getElementById("sonBord");

/////// variables des MOD a ajouter 
var modeRapide = 0; // double la vitesse de la balle, et la vitesse des raquettes. IA devient très motivée. 
var longueRaquette = 0; // plus grosses raquettes
var courteRaquette = 0; // plus petites raquettes
var modefoot = 0;
///// MOD

var modeSpace = 0;
var multi = 0;
var CODE_TOUCHE_BAS = 83;
var CODE_TOUCHE_HAUT = 90;
var CODE_BARRE_ESPACE = 32;
var CODE_TOUCHE_L = 76;
var CODE_TOUCHE_O = 79;
var ALLER_BAS = false;
var ALLER_HAUT = false;
var ALLER_BAS1 = false;
var ALLER_HAUT1 = false;

var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

var requestAnimId;
var echangeEnCours = false;
var joueurQuiEngage = 1;
var canvasTerrainContext;
var terrainLongueur = 800;
var terrainLargeur = 600;
var filetLargeur = 6;
var couleurTerrain = 'none';
var couleurFilet = "#FFFFFF";
var dessinerTerrain = function () {
    // le filet
    canvasTerrainContext.fillStyle = couleurFilet;
    canvasTerrainContext.fillRect(terrainLongueur / 2 - filetLargeur / 2, 0, filetLargeur, terrainLargeur);
}

var canvasScoreContext;
var scoreJoueur = 0;
var scoreIA = 0;
var positionXScoreJoueur1 = 330;
var positionYScoreJoueur1 = 50;
var positionXScoreJoueur2 = 435;
var positionYScoreJoueur2 = 50;
var couleurScore = "#FFFFFF";
var afficherScore = function (scoreJoueur1, scoreJoueur2) {
    canvasScoreContext.clearRect(0, 0, terrainLongueur, terrainLargeur);
    canvasScoreContext.font = "50pt serif";
    canvasScoreContext.fillStyle = couleurScore;
    canvasScoreContext.fillText(scoreJoueur1, positionXScoreJoueur1, positionYScoreJoueur1);
    canvasScoreContext.fillText(scoreJoueur2, positionXScoreJoueur2, positionYScoreJoueur2);
}


var ballePerdueJoueur = function (positionXBalle, positionXJoueur) {
    var valeurRetour = false;
    if (modefoot == 1) {
        courteRaquette = 1;
        if (positionXBalle < 1 && positionYBalle > 200 && positionYBalle < 400) {
            valeurRetour = true;
            sonVictoire.play();
        }
    } else {
        if (positionXBalle < 1) {
            valeurRetour = true;
            sonVictoire.play();
        }
    }

    return valeurRetour;
}
var ballePerdueIA = function (positionXBalle, positionXIA) {

    var valeurRetour = false;
    if (modefoot == 1) {

        if (positionXBalle - 20 > positionXIA + largeurRaquette && positionYBalle > 200 && positionYBalle < 400) {
            valeurRetour = true;
            sonVictoire.play();
        }
    } else {
        if (positionXBalle - 20 > positionXIA + largeurRaquette) {
            valeurRetour = true;
            sonVictoire.play();
        }
    }
    return valeurRetour;
}

var canvasRaquettesContext;
var largeurRaquette = 20;
var longueurRaquette = 70;
var positionXRaquetteA = 30;
var positionYRaquetteA = terrainLargeur / 2;
var positionXRaquetteB = 750;
var positionYRaquetteB = terrainLargeur / 2;
var incrementRaquetteB = 6;
if (modeRapide == 1) {
    incrementRaquetteB = 15;
}
if (modeRapide == 2) {
    incrementRaquetteB = 7;
}
var milieuRaquetteB = positionYRaquetteB - longueurRaquette / 2;
var couleurRaquette = "#FFFFFF";
var dessinerRaquettes = function () {
    // la raquette A
    canvasRaquettesContext.fillStyle = couleurRaquette;
    canvasRaquettesContext.fillRect(positionXRaquetteA, positionYRaquetteA, largeurRaquette, longueurRaquette);
    // la raquette B       
    canvasRaquettesContext.fillStyle = couleurRaquette;
    canvasRaquettesContext.fillRect(positionXRaquetteB, positionYRaquetteB, largeurRaquette, longueurRaquette);
}
var animerRaquetteA = function () {
    if (ALLER_HAUT && positionYRaquetteA > 0) {
        positionYRaquetteA -= 5;
        if (modeRapide == 1) {
            positionYRaquetteA -= 5;
        }
        if (modeRapide == 2) {
            positionYRaquetteA -= 3;
        }
    } else if (ALLER_BAS && positionYRaquetteA < terrainLargeur - longueurRaquette) {
        positionYRaquetteA += 5;
        if (modeRapide == 1) {
            positionYRaquetteA += 5;
        }
        if (modeRapide == 2) {
            positionYRaquetteA += 3;
        }
    }
}

var largeurBalle = 10;
var positionXBalle = 100;
var positionYBalle = 100;
var dessinerBalle = function () {
    canvasRaquettesContext.fillStyle = couleurRaquette;
    canvasRaquettesContext.fillRect(positionXBalle, positionYBalle, largeurBalle, largeurBalle);
}

var vitesseBalle = 1;
if (modeRapide == 1) {
    vitesseBalle = 15;
}
if (modeRapide == 2) {
    vitesseBalle = 7;
}

var incrementXBalle = 2 * vitesseBalle;
var incrementYBalle = 2 * vitesseBalle;
var animerBalle = function () { //  COLISION  BALLE MUR  Sur X      
    if (modeSpace == 1) {
        positionXBalle += incrementXBalle;
        if (positionXBalle > terrainLongueur || positionXBalle < 0) {
            // incrementXBalle = -incrementXBalle;
        }
        positionYBalle += incrementYBalle; //  COLISION MUR  Sur Y

        if (positionYBalle > terrainLargeur || positionYBalle < 0)

        {
            //  incrementYBalle = -incrementYBalle;
            if (positionYBalle > terrainLargeur)
                positionYBalle = 0;
            if (positionYBalle < 0)
                positionYBalle = terrainLargeur;
        }
        if (positionYBalle < 0)
            positionYBalle = terrainLargeur;
        dessinerBalle();
    } else {
        positionXBalle += incrementXBalle;
        if (positionXBalle > terrainLongueur || positionXBalle < 0) {
            incrementXBalle = -incrementXBalle;
            if (BoolSons == true) {
                sonBord.play();
            }
        }
        positionYBalle += incrementYBalle; //  COLISION MUR  Sur Y
        if (positionYBalle > terrainLargeur - 10 || positionYBalle < 0) {
            incrementYBalle = -incrementYBalle;
            if (BoolSons == true) {
                sonBord.play();
            }
        }
        dessinerBalle();
    }

}



var directionHorizontaleBalle = function () {
    if (incrementXBalle > 0 && echangeEnCours) {
        return "DROITE";
    } else if (incrementXBalle < 0 && echangeEnCours) {
        return "GAUCHE";
    }
    return "INERTE";
}

var accelererBalle = function () {
    vitesseBalle = vitesseBalle + .2;
}


var animerRaquetteB_IA = function () {
    if (multi == 1) { // Condition si le mode multi est actif ou non
        if (ALLER_HAUT1 && positionYRaquetteB > 0) {
            positionYRaquetteB -= 5;
            if (modeRapide == 1) {
                positionYRaquetteB -= 5;
            }
            if (modeRapide == 2) {
                positionYRaquetteB -= 3;
            }
        } else if (ALLER_BAS1 && positionYRaquetteB < terrainLargeur - longueurRaquette) {
            positionYRaquetteB += 5;
            if (modeRapide == 1) {
                positionYRaquetteB += 5;
            }
            if (modeRapide == 2) {
                positionYRaquetteB += 3;
            }
        }
    } else {
        centreRaquetteB = positionYRaquetteB + longueurRaquette / 2;
        if (directionHorizontaleBalle() == 'DROITE') {
            if (positionYBalle < centreRaquetteB) {
                // la position de la balle est sur l'écran, au dessus de celle de la raquette
                positionYRaquetteB -= incrementRaquetteB;
            } else if (positionYBalle > centreRaquetteB) {
                positionYRaquetteB += incrementRaquetteB;
            }
        } else {
            // se recentrer sur le terrain
            if (centreRaquetteB >= terrainLargeur / 2) {
                positionYRaquetteB -= incrementRaquetteB;
            } else if (centreRaquetteB < terrainLargeur / 2) {
                positionYRaquetteB += incrementRaquetteB;
            }
        }
    }
}


var positionBalleSurRaquette = function (positionYBalle, positionYRaquette, longueurRaquette) {
    var valeurRetour = "CENTRE";
    var taillePositionRaquette = longueurRaquette / 5;
    if (positionYBalle > positionYRaquette && positionYBalle < positionYRaquette + taillePositionRaquette) {
        valeurRetour = "HAUT";
    } else if (positionYBalle >= positionYRaquette + taillePositionRaquette && positionYBalle < positionYRaquette + taillePositionRaquette * 2) {
        valeurRetour = "MIHAUT";
    } else if (positionYBalle >= positionYRaquette + longueurRaquette - taillePositionRaquette * 2 && positionYBalle < positionYRaquette + longueurRaquette - taillePositionRaquette) {
        valeurRetour = "MIBAS";
    } else if (positionYBalle >= positionYRaquette + longueurRaquette - taillePositionRaquette && positionYBalle < positionYRaquette + longueurRaquette) {
        valeurRetour = "BAS";
    }
    console.log(valeurRetour);
    return valeurRetour;
}

var changerTrajectoireBalle = function (positionYBalle, longueurRaquette, positionYRaquetteA, positionYRaquetteB) {
    if (testerCollisionBalleRaquette(positionXRaquetteA, positionYRaquetteA, largeurRaquette, longueurRaquette, positionXBalle, positionYBalle, largeurBalle)) {
        if (BoolSons == true) {
            sonCollision.play();
        }
        switch (positionBalleSurRaquette(positionYBalle, positionYRaquetteA, longueurRaquette)) {
        case "HAUT":
            incrementXBalle = 2 * vitesseBalle;
            incrementYBalle = -3 * vitesseBalle;
            break;
        case "MIHAUT":
            incrementXBalle = 2 * vitesseBalle;
            incrementYBalle = -2 * vitesseBalle;
            break;
        case "CENTRE":
            incrementXBalle = 3 * vitesseBalle;
            incrementYBalle = 0;
            break;
        case "MIBAS":
            incrementXBalle = 2 * vitesseBalle;
            incrementYBalle = 2 * vitesseBalle;
            break;
        case "BAS":
            incrementXBalle = 2 * vitesseBalle;
            incrementYBalle = 3 * vitesseBalle;
            break;
        }
    } else if (testerCollisionBalleRaquette(positionXRaquetteB, positionYRaquetteB, largeurRaquette, longueurRaquette, positionXBalle, positionYBalle, largeurBalle)) {
        if (BoolSons == true) {
            sonCollision1.play();
        }
        switch (positionBalleSurRaquette(positionYBalle, positionYRaquetteB, longueurRaquette)) {
        case "HAUT":
            incrementXBalle = -2 * vitesseBalle;
            incrementYBalle = -3 * vitesseBalle;
            break;
        case "MIHAUT":
            incrementXBalle = -2 * vitesseBalle;
            incrementYBalle = -2 * vitesseBalle;
            break;
        case "CENTRE":
            incrementXBalle = -3 * vitesseBalle;
            incrementYBalle = 0;
            break;
        case "MIBAS":
            incrementXBalle = -2 * vitesseBalle;
            incrementYBalle = 2 * vitesseBalle;
            break;
        case "BAS":
            incrementXBalle = -2 * vitesseBalle;
            incrementYBalle = 3 * vitesseBalle;
            break;
        }
    }
}

var creerCanvasContext = function (name, width, height, zindex, color) {
    var canvas = window.document.createElement("canvas");
    canvas.id = name;
    canvas.style.position = "absolute";
    if (color != undefined)
        canvas.style.background = color;
    canvas.style.zIndex = zindex;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas.getContext('2d');
}

var initialisation = function () {
    // le code de l'initialisation
    canvasTerrainContext = creerCanvasContext("canvasTerrain", terrainLongueur, terrainLargeur, 0, couleurTerrain);
    dessinerTerrain();

    canvasScoreContext = creerCanvasContext("canvasScore", terrainLongueur, terrainLargeur, 1);
    afficherScore(0, 0);
    canvasRaquettesContext = creerCanvasContext("canvasRaquettes", terrainLongueur, terrainLargeur, 1);
    dessinerRaquettes();
    dessinerBalle();


    setInterval(accelererBalle, 5000);

    requestAnimId = window.requestAnimationFrame(principale); // premier appel de principale au rafraichissement de la page
}

var testerCollisionBalleRaquette = function (positionRaquetteAxeX, positionRaquetteAxeY,
    largeurRaquette, hauteurRaquette,
    positionBalleAxeX, positionBalleAxeY,
    tailleBalle) {
    if (!(positionRaquetteAxeX >= positionBalleAxeX + tailleBalle || positionRaquetteAxeX <= positionBalleAxeX - largeurRaquette || positionRaquetteAxeY >= positionBalleAxeY + tailleBalle || positionRaquetteAxeY <= positionBalleAxeY - hauteurRaquette)) {
        // Collision
        return true;
    }
    return false;
}

var testerBallePerdue = function () {
    if (ballePerdueJoueur(positionXBalle, positionXRaquetteA)) {
        scoreIA++;
        afficherScore(scoreJoueur, scoreIA);
        echangeEnCours = false;
        joueurQuiEngage = 1;
    }
    if (ballePerdueIA(positionXBalle, positionXRaquetteB)) {
        scoreJoueur++;
        afficherScore(scoreJoueur, scoreIA);
        echangeEnCours = false;
        joueurQuiEngage = 2;
    }
}

var initialiserEngagementJoueur = function () {
    positionXBalle = positionXRaquetteA + largeurRaquette;
    positionYBalle = positionYRaquetteA;
    vitesseBalle = 1;
    if (modeRapide == 1) {
        vitesseBalle = 7;
    }
    if (modeRapide == 2) {
        vitesseBalle = 2;
    }
    incrementXBalle = 2 * vitesseBalle;
    incrementYBalle = 2 * vitesseBalle;
}

var initialiserEngagementJoueurIA = function () {
    echangeEnCours = true;
    positionXBalle = positionXRaquetteB;
    positionYBalle = positionYRaquetteB;
    vitesseBalle = 1;
    if (modeRapide == 1) {
        vitesseBalle = 7;
    }
    if (modeRapide == 2) {
        vitesseBalle = 2;
    }
    incrementXBalle = -2 * vitesseBalle;
    incrementYBalle = 2 * vitesseBalle;
}


var principale = function () {
    // le code du jeu
    canvasRaquettesContext.clearRect(0, 0, terrainLongueur, terrainLargeur);
    if (echangeEnCours) {
        animerBalle();
        testerBallePerdue();
    }
    animerRaquetteA();
    animerRaquetteB_IA();
    dessinerRaquettes();
    changerTrajectoireBalle(positionYBalle, longueurRaquette, positionYRaquetteA, positionYRaquetteB);

    requestAnimId = window.requestAnimationFrame(principale); // rappel de principale au prochain rafraichissement de la page
}

var onKeyDown = function (event) { // Fait bouger la raquette 1 et 2 grace aux fontions et aux touches
    if (event.keyCode == CODE_TOUCHE_BAS) {
        ALLER_BAS = true;
    } else if (event.keyCode == CODE_TOUCHE_HAUT) {
        ALLER_HAUT = true;
    } else if (event.keyCode == CODE_BARRE_ESPACE && !echangeEnCours && joueurQuiEngage == 1) {
        echangeEnCours = true;
        initialiserEngagementJoueur();
    } else if (event.keyCode == CODE_TOUCHE_L) {
        ALLER_BAS1 = true;
    } else if (event.keyCode == CODE_TOUCHE_O) {
        ALLER_HAUT1 = true;
    } else if (event.keyCode == CODE_BARRE_ESPACE && !echangeEnCours && joueurQuiEngage == 2) {
        echangeEnCours = true;
        initialiserEngagementJoueurIA();
    }
}

var onKeyUp = function (event) { // Permet de détecter la fin de pression des touches
    if (event.keyCode == CODE_TOUCHE_BAS) {
        ALLER_BAS = false;
    } else if (event.keyCode == CODE_TOUCHE_HAUT) {
        ALLER_HAUT = false;
    } else if (event.keyCode == CODE_TOUCHE_L) {
        ALLER_BAS1 = false;
    } else if (event.keyCode == CODE_TOUCHE_O) {
        ALLER_HAUT1 = false;
    }
}

// onKeyDown = à l'appui de la touche
// onKeyUp = au relèvement de la touche
window.onkeydown = onKeyDown;
window.onkeyup = onKeyUp;

window.onload = initialisation; // appel de la fonction initialisation au chargement de la page



function change() {
    modeSpace = 1;
    modefoot = 0;

    courteRaquette = 0;
    longueRaquette = 1;
    sonCollision = document.getElementById("sonRaquette1");
    sonCollision1 = document.getElementById("sonRaquette2");
    sonVictoire = document.getElementById("sonWin");
    animerBalle();
    console.log('change');
    document.getElementById("carre").style.backgroundImage = 'none';
    document.getElementById("jeua").style.backgroundImage = 'url("img/space.png")';
    document.getElementById("space").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("foot").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("original").setAttribute("class", ""); // enlève le soulignement

}

function change1() {
    modeSpace = 0;
    modefoot = 1;
    modeRapide = 0;
    courteRaquette = 1;
    longueRaquette = 0;
    sonCollision = document.getElementById("sonFoot1");
    sonCollision1 = document.getElementById("sonFoot2");
    sonVictoire = document.getElementById("sonWinF");
    animerBalle();
    console.log('change1');
    document.getElementById("carre").style.backgroundImage = 'url("img/foot.jpg")';
    document.getElementById("jeua").style.backgroundImage = 'url("img/footbg.jpg")';
    document.getElementById("foot").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("space").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("original").setAttribute("class", ""); // enlève le soulignement

}


function original() {
    modeSpace = 0;
    modefoot = 0;
    longueRaquette = 0;
    courteRaquette = 0;
    sonVictoire = document.getElementById("sonApplause");
    sonCollision = document.getElementById("sonPingpong");
    sonCollision1 = document.getElementById("sonPingpong");
    document.getElementById("carre").style.backgroundImage = "none";
    document.getElementById("jeua").style.backgroundImage = "none";
    document.getElementById("original").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("space").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("foot").setAttribute("class", ""); // enlève le soulignement
}

function multiplayers() {
    multi = 1;
    document.getElementById("difmulti").style.display = "block";
    document.getElementById("difsolo").style.display = "none";
    document.getElementById("solo").setAttribute("class", "");
    document.getElementById("multi").setAttribute("class", "activePage");
}

function solo() {
    multi = 0;
    document.getElementById("difmulti").style.display = "none";
    document.getElementById("difsolo").style.display = "block";
    document.getElementById("solo").setAttribute("class", "activePage");
    document.getElementById("multi").setAttribute("class", "");
}



function difficulte() {

    var lol = document.getElementsByClassName("mdr");
    lol.className = "activePage wow fadeIn";
    document.getElementById("easy").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("middle").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("hard").setAttribute("class", ""); // enlève le soulignement

}

function difficulte2() {

    modeRapide = 2;
    document.getElementById("middle").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("easy").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("hard").setAttribute("class", ""); // enlève le soulignement
}

function difficulte3() {
    modeRapide = 1;
    document.getElementById("hard").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("middle").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("easy").setAttribute("class", ""); // enlève le soulignement
}

function difficultem() {

    modeRapide = 0;
    document.getElementById("easym").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("middlem").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("hardm").setAttribute("class", ""); // enlève le soulignement
}

function difficultem2() {

    modeRapide = 2;
    document.getElementById("middlem").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("easym").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("hardm").setAttribute("class", ""); // enlève le soulignement
}

function difficultem3() {
    modeRapide = 1;
    document.getElementById("hardm").setAttribute("class", "activePage"); // ajoute le soulignement
    document.getElementById("middlem").setAttribute("class", ""); // enlève le soulignement
    document.getElementById("easym").setAttribute("class", ""); // enlève le soulignement
}

function activeSon() {
    if (BoolSons == true) {
        BoolSons = false;
        document.getElementById("sonOn").style.display = "none";
        document.getElementById("sonOff").style.display = "block";
    } else if (BoolSons == false) {
        BoolSons = true;
        document.getElementById("sonOn").style.display = "block";
        document.getElementById("sonOff").style.display = "none";
    }
}
// fin du code