window.addEventListener("load", sidenVises);

// global variabler
let point;
let life;
let speed;

// global konstanter
const good1 = document.querySelector("#tun_container1");
const good2 = document.querySelector("#tun_container2");

const bad1 = document.querySelector("#madrest_container1");
const bad2 = document.querySelector("#madrest_container2");

function sidenVises() {
  console.log("sidenVises");

  // Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");

  // Vis start skærm
  document.querySelector("#start").classList.remove("hide");

  // Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startSpil);
}

function startSpil() {
  console.log("startSpil");

  // Skjul alle skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  // Nulstil point og liv og udskriv
  point = 0;
  console.log("points:", point);
  document.querySelector("#points").textContent = point.toString().padStart(2, "0");

  life = 3;
  console.log("lives:", life);
  document.querySelector("#lives").textContent = life;

  //Nulstil speed
  speed = 1;

  // Start timer -animation
  document.querySelector("#time_fyld").classList.add("timer");

  // Når timer slut, fører det til stopSpil
  document.querySelector("#time_container").addEventListener("animationend", stopSpil);

  // Start flyve -animationer på elementer + random position og delay
  good1.classList.add("flyve", "pos" + ranNum(5), "del" + ranNum(3), "speed" + speed);
  //Lyt efter flyve -animationen er kørt en gang
  good1.addEventListener("animationiteration", tunReset);
  //Klik på good
  good1.addEventListener("mousedown", clickTun);

  //good2 -||-
  good2.classList.add("flyve", "pos" + ranNum(5), "del" + ranNum(3), "speed" + speed);
  good2.addEventListener("animationiteration", tunReset);
  good2.addEventListener("mousedown", clickTun);

  // bad1 -||-
  bad1.classList.add("flyve", "pos" + ranNum(5), "del" + ranNum(3), "speed" + speed);
  bad1.addEventListener("animationiteration", madrestReset);
  bad1.addEventListener("mousedown", clickMadrest);

  // bad2 -||-
  bad2.classList.add("flyve", "pos" + ranNum(5), "del" + ranNum(3), "speed" + speed);
  bad2.addEventListener("animationiteration", madrestReset);
  bad2.addEventListener("mousedown", clickMadrest);
}

function clickTun() {
  console.log("clickTun");
  // Afspil lyd meow
  // så lyden afspilles fra start, så hvert klik resets lyden
  document.querySelector("#meow").currentTime = 0;

  // lyd afspiller til good
  document.querySelector("#meow").play();

  // Ikke klikbar
  this.removeEventListener("mousedown", clickTun);

  // Start paused -animation
  this.classList.add("paused");

  // Få 1 point og udskriv
  point++;
  console.log("points:", point);
  document.querySelector("#points").textContent = point.toString().padStart(2, "0");

  // Start fade -animation
  this.firstElementChild.classList.add("fade");

  // good -animation færdig
  this.addEventListener("animationend", tunReset);

  // hastighed
  if (point >= 6) {
    speed = 3;
  } else if (point >= 3) {
    speed = 2;
  }
  console.log("Speed = " + speed);
}

function tunReset() {
  console.log("tunReset");

  //Fjern alt på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  // Vis element igen
  this.offsetLeft;

  // Ny random position og speed + Genstart flyve -animation
  this.classList.add("flyve", "pos" + ranNum(5), "speed" + speed);

  // Good er klikbar igen
  this.addEventListener("mousedown", clickTun);
}

function clickMadrest() {
  console.log("clickMadrest");
  // Afspil lyd sur meow
  document.querySelector("#sur_meow").currentTime = 0;
  document.querySelector("#sur_meow").play();

  // Ikke klikbar
  this.removeEventListener("mousedown", clickMadrest);

  // Start paused -animation
  this.classList.add("paused");

  // Start eeh -animation
  this.firstElementChild.classList.add("eeh");

  // bad -animation færdig
  this.addEventListener("animationend", madrestReset);

  // træk 1 liv fra og udskriv
  life--;
  console.log("lives:", life);
  document.querySelector("#lives").textContent = life;
  if (life == 0) {
    stopSpil();
  }
}

function madrestReset() {
  console.log("madrestReset");

  //Fjern alt på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  // Vis element igen
  this.offsetLeft;

  // Ny random position og speed + Genstart flyve -animation
  this.classList.add("flyve", "pos" + ranNum(5), "speed" + speed);

  // bad er klikbar igen
  this.addEventListener("mousedown", clickMadrest);
}

function stopSpil() {
  console.log("stopSpil");

  // Reset timer
  document.querySelector("#time_fyld").classList.remove("timer");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpil);

  // Slet/fjern alle classes og eventlistener
  good1.classList = "";
  good1.firstElementChild.classList = "";
  good1.removeEventListener("mousedown", clickTun);
  good1.removeEventListener("animationiteration", tunReset);
  good1.removeEventListener("animationend", tunReset);

  good2.classList = "";
  good2.firstElementChild.classList = "";
  good2.removeEventListener("mousedown", clickTun);
  good2.removeEventListener("animationiteration", tunReset);
  good2.removeEventListener("animationend", tunReset);

  bad1.classList = "";
  bad1.firstElementChild.classList = "";
  bad1.removeEventListener("mousedown", clickMadrest);
  bad1.removeEventListener("animationiteration", madrestReset);
  bad1.removeEventListener("animationend", madrestReset);

  bad2.classList = "";
  bad2.firstElementChild.classList = "";
  bad2.removeEventListener("mousedown", clickMadrest);
  bad2.removeEventListener("animationiteration", madrestReset);
  bad2.removeEventListener("animationend", madrestReset);

  if (life == 0) {
    gameOver();
  } else if (point >= 9) {
    levelComplete();
  } else {
    gameOver();
  }
}

function levelComplete() {
  console.log("Vundetskærm");

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  //Klik på genstart eller gå til start_screen (home)
  document.querySelector("#genstart2").addEventListener("click", startSpil);
  document.querySelector("#home2").addEventListener("click", sidenVises);

  // udskriver point, liv og tekst
  document.querySelector("#lvlc_point").textContent = point.toString().padStart(2, "0");
  document.querySelector("#lvlc_life").textContent = life;
  document.querySelector("#lvlc_txt").textContent = "Ralfie loves you ♡";
}

function gameOver() {
  console.log("Tabtskærm");
  document.querySelector("#game_over").classList.remove("hide");

  document.querySelector("#genstart1").addEventListener("click", startSpil);
  document.querySelector("#home1").addEventListener("click", sidenVises);

  document.querySelector("#game_overpoint").textContent = point.toString().padStart(2, "0");
  document.querySelector("#game_overlife").textContent = life;
  document.querySelector("#game_overtxt").textContent = "Ralfie is going to remember this...";
}

function ranNum(max) {
  return Math.floor(Math.random() * max) + 1;
}

//  good1.classList = "";
//  document.querySelector("#tun").classList = "";
//  good1.offsetLeft;
// =
// betyder i diagram, at det bliver "vist igen, elementet"

// note: bevægelse henover skærm: container og forsvindingsanimation = sprite

// man behøver ikke console.log, men det er rart nok at have dem
// if (liv == 0) {
//   console.log("Det er rigtigt");
//   stopSpillet();
// } else {
//   console.log("Det er forkert");
// }

// ctrl + d = tage fat i flere

// this = lav const, kopiere startværdier, udskift this ved click og reset, kopiere ved stopspil
