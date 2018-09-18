const menuBall = document.getElementById('menuBall');
const menuDrawer = document.getElementById('menuDrawer');
const menuItems = document.getElementsByClassName('menuItemConatiner');
const socialContainer = document.getElementById('socialContainer');
const contents = document.getElementsByClassName("content");
const aboutMe = document.getElementById("aboutMe");
const aboutMeMenu = document.getElementById("aboutMeMenu");
const initial = document.getElementById("initial");
const logo = document.getElementById("logo");

//Click anywhere except on menu to close menuDrawer
document.addEventListener('click', (event) => {
  const e = event.target || event.srcElement;

  if (e !== menuBall && e !== menuDrawer &&
      e.parentElement !== menuBall && e.parentElement !== menuDrawer) {
    closeMenu();
  }
})

document.addEventListener('wheel', () => highlightMenu());
document.addEventListener('touchmove', () => highlightMenu());

highlightMenu = () => {
  if (!menuBall.classList.contains("highlight")) {
    menuBall.classList.add("highlight");
    setTimeout(() => {
      menuBall.classList.remove("highlight");
    }, 750);
  }
}

closeMenu = () => {
  menuBall.classList.remove("open");
  menuDrawer.classList.remove("open");
  for(var i=0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("open");
  }
  socialContainer.classList.remove("open");
  logo.classList.remove("open");
}

window.onload = () => {
    setTimeout( () => {
        menuBall.classList.remove("offScreen");
        if (window.innerWidth < 580) {
            arrangePortfolioForMobile();
        }
    }, 2500);

    setTimeout( () => hoverProfile(), 8000);

    aboutMe.setAttribute("style", "background: url(https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b237330e1a78d52ec28208cbe21be778&auto=format&fit=crop&w=1950&q=80)");

    initialAnimation();
    createPortfolioBoxes();
    createInitialStars();
    animate();
    createFormEventsListeners();
}

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    c2H = canvas2.height;
    c2W = canvas2.width;
    canvas3.height = window.innerHeight/2;
    canvas3.width = window.innerWidth;
    c3H = canvas3.height;
    c3W = canvas3.width;
    if (window.innerWidth < 580) {
        arrangePortfolioForMobile();
    }
})

initialAnimation = () => {
  const kids = initial.children;
  for(let i = 0; i < kids.length; i++) {
    kids[i].classList.add("in");
  }
  document.getElementById("profile").classList.add("in");
  setTimeout(() => {
    document.getElementById("sigA").classList.add("fade");
    document.getElementById("sigM").classList.add("fade");
  }, 5500)
}

hoverProfile = () => {
  let profContain = document.getElementById("profileImgContainer");
  let profile = document.getElementById("profile");
  let origSrc = profile.src;

  profContain.addEventListener("mouseover", () => {
    profile.src = "img/profile.jpg";;
  })

  profContain.addEventListener("mouseleave", () => {
    profile.src = origSrc;
  })
}

var createElem = (num, elem) => {
  var elems = "";
  for(i=0; i<num; i++) {
    elems += "<" + elem + "></" + elem + ">"
  }
  return elems;
}

// Create the spans for the menuBall
menuBall.innerHTML = createElem(6, "span");

// Create the divs for the aboutMeMenu & fill in text
aboutMeMenu.innerHTML = createElem(10, "div");
console.log(aboutMeMenu.children)
for(let i=0; i < aboutMeMenu.children.length; i++) {
    const text = ["DESK", "/", "HEAD", "/", "HEART"];
    const kids = aboutMeMenu.children;
    if (i < text.length) {
        kids[i].textContent = text[i];
        let id = text[i] === "/" ? "slash" : text[i].toLowerCase();
        kids[i].setAttribute("id", id);
        aboutMeMenu
    } else {
        let imgId = text[i-text.length] === "/" ? "slashImg" : text[i-text.length].toLowerCase()+"Img";
        kids[i].setAttribute("id", imgId);
        kids[i].classList.add("img1");
        console.log(kids[i-text.length].offsetLeft);
        let style = `
            position: absolute;
            height: 50px;
            width:`+ kids[i-text.length].clientWidth +`px;
            top: 50px;
            left:`+ kids[i-text.length].offsetLeft +`px;
        `
        kids[i].setAttribute("style", style);
    }
}


menuBall.addEventListener("click", () => {
  menuBall.classList.remove("highlight");
  menuBall.classList.toggle("open");
  menuDrawer.classList.toggle("open");
  logo.classList.add("open");
  for(var i=0; i < menuItems.length; i++) {
    menuItems[i].classList.toggle("open");
  }

  if (socialContainer.classList.contains("open")) {
    socialContainer.classList.remove("open");
    logo.classList.remove("open");
  } else {
    setTimeout(() => {
      if (menuDrawer.classList.contains("open")) {
        socialContainer.classList.add("open");
      }
    }, 250)
  }
  checkLocationForMenu();
  //Scroll to location when menuItem is clicked
  let behave = { behavior: "smooth", block: "start"};

  logo.addEventListener("click", () => {
    initial.scrollIntoView(behave);
    closeMenu();
  })

  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", (event) => {
      let e = event.target || event.srcElement;
      if (e.textContent === "portfolio") {
        document.getElementById("portfolioContainer").scrollIntoView(behave);
      } else if (e.textContent === "about me") {
        document.getElementById("aboutMe").scrollIntoView(behave);
      } else if (e.textContent === "say hello") {
        document.getElementById("sayHello").scrollIntoView(behave);
      }
    })
  }
});

checkLocationForMenu = () => {
  for(let i = 0; i < contents.length; i++) {
    let box = contents[i].getBoundingClientRect();
    // if (box.height/2 )
  }
}


//Create portfolio boxes
var portfolioItems = [
  {
    img: {
      name: "Witwars",
      src: "img/witwars.png"
    },
    tech: ["React-Native", "Redux", "Router-Flux", "Node.js", "Express", "Pug", "CSS", "jQuery", "AdMob"],
    desc: "Co-founder, sole UI Engineer for React-Native app, sole designer, sole content creator, and co-developer of web app.",
    btn: {
      text: "More Info",
      name: "witwars"
    }
  },
  {
    img: {
      name: "Voyager",
      src: "img/voyager.png"
    },
    tech: ["Wordpress", "HTML", "CSS", "SEO", "Google Ads", "Facebook Ads", "GIMP", "Sketch 3", "Final Cut Pro"],
    desc: "Designed website and online marketing strategy, plus created most video, written, and graphic content for manufacturing company.",
    btn: {
      text: "Visit Site",
      link: "http://www.mtcvoyager.com"
    }
  },
  {
    img: {
      name: "Witwars Admin",
      src: "img/witwars_admin.png"
    },
    tech: ["React", "Redux", "Router", "Node.js", "Express", "Postgres", "Sequelize", "Axios"],
    desc: "Full stack development of console for Witwars app allowing admin accounts to manage premises on a secure local server.",
    btn: {
      text: "More Info",
      name: "witwars_admin"
    }
  },
  {
    img: {
      name: "Ottawa Recreation",
      src: "img/ottawa_rec.png"
    },
    tech: ["Wordpress", "HTML", "CSS"],
    desc: "As a member of the Ottawa, IL Playgrounds & Recreation Board, I voluntarily built them a new website, but do not maintain it regularly.",
    btn: {
      text: "Visit Site",
      link: "http://www.ottawarecreation.org"
    }
  }
]

openInNewTab = (url) => {
  let win = window.open(url, "_blank");
  win.focus();
}

createPortfolioBoxes = () => {
  const p = document.getElementById("portfolio");
  const pI = portfolioItems;
  for (let i = 0; i < pI.length; i++) {
    let div = document.createElement('div');
    div.className = 'portfolioBox';
    div.innerHTML = `
      <div class="img1stHalf" style="background: url(` + pI[i].img.src + `) 0 0"></div>
      <div class="img2ndHalf" style="background: url(` + pI[i].img.src + `) -125px 0"></div>
      <div class="portfolioInfo">
        <p class="portfolioDesc">` + pI[i].desc + `</p>
        <div class="portfolioTechContainer">
          <div class="portfolioTech"></div>
        </div>
        <div class="portfolioBtnContainer">
          <div class="portfolioBtn">` + pI[i].btn.text + `</div>
        </div>
      </div>
    `
    p.appendChild(div);
  }

  //Add links to portfolio info buttons
  let btns = p.querySelectorAll(".portfolioBtn");
  for (let j = 0; j < btns.length; j++) {
    const desc = btns[j].parentElement.parentElement
                  .querySelector(".portfolioDesc").textContent;
    const index = portfolioItems.findIndex( p => p.desc === desc );
    btns[j].addEventListener("click", () => {
      if (portfolioItems[index].btn.link) {
          openInNewTab(portfolioItems[index].btn.link);
      } else {
          console.log("no link found");
      }
    })
  }
}

//Portfolio box open animation
let portfolioBoxes;

const openPortfolioBox = (event) => {
  let e = event.target || event.srcElement;

  if (e.classList.contains("portfolioInfo") || e.classList.contains("portfolioDesc") ||
      e.classList.contains("portfolioTech") || e.classList.contains("portfolioBtn") ||
      e.classList.contains("portfolioTechContainer") || e.classList.contains("portfolioTechItem") ||
      e.classList.contains("portfolioBtnContainer")) {
        return null;
  } else {

    if (e.classList.contains("img1stHalf") || e.classList.contains("img2ndHalf")) {
      e = e.parentElement;
    }

    e.children[0].classList.add("open-left");
    e.children[1].classList.add("open-right");

    const tech = e.querySelector(".portfolioTech");
    if (!tech.querySelector(".portfolioTechItem")) {
      const desc = e.querySelector(".portfolioDesc").textContent;
      const index = portfolioItems.findIndex( p => p.desc === desc );

      for (let i = 0; i < portfolioItems[index].tech.length; i++) {
        let div = document.createElement("DIV");
        let text = document.createTextNode(portfolioItems[index].tech[i]);
        div.appendChild(text);
        div.classList.add("portfolioTechItem");
        tech.appendChild(div);
      }
    }
  }
}

const closePortfolioBox = (event) => {
  const e = event.target || event.srcElement;

  if (e.classList.contains("portfolioInfo") || e.classList.contains("portfolioDesc") ||
      e.classList.contains("portfolioTech") || e.classList.contains("portfolioBtn")) {
        return null;
  } else {

    if (e.classList.contains("img1stHalf") || e.classList.contains("img2ndHalf")) {
      e = e.parentElement;
    }

    e.children[0].classList.remove("open-left");
    e.children[1].classList.remove("open-right");
  }
}

setTimeout(() => {
  portfolioBoxes = document.querySelectorAll(".portfolioBox");
  for (let i=0; i < portfolioBoxes.length; i++) {
    portfolioBoxes[i].addEventListener('mouseover', openPortfolioBox);
    portfolioBoxes[i].addEventListener('mouseleave', closePortfolioBox);
  }
}, 1000)


let pBIndex = 0;
arrangePortfolioForMobile = () => {
    let pC = document.getElementById("portfolioContainer");
    //TODO click portfolio box, check index, move to that index in carousel
    //TODO create element on bottom that has arrows

    let left = "icon ion-md-arrow-dropleft-circle noclick";
    let right = "icon ion-md-arrow-dropright-circle";
    let div = document.createElement('div');
    if (!document.getElementById("leftArrowBtn")) {
        div.classList.add("profileMobile");
        let btns = `
            <div class="mobileBtns">
              <i id="leftArrowBtn" class="`+left+`"></i>
              <p id="mobileBtnsText">1 of 4</p>
              <i id="rightArrowBtn" class="`+right+`"></i>
            </div>
            <p>Tap an item for more information.</p>
        `
        div.innerHTML = btns;
        pC.appendChild(div);
    }
    portfolioBoxCarousel();

    for(let i = 0; i < portfolioBoxes.length; i++) {
        portfolioBoxes[i].addEventListener("touchstart", (e) => {
            pBIndex = i;
            portfolioBoxCarousel();
            closePortfolioBox(e);
            //TODO make sure this is working
        })
    }

    document.getElementById("leftArrowBtn").addEventListener("click", () => {
        if (pBIndex !== 0) {
            pBIndex--;
            portfolioBoxCarousel();
        }
    })
    document.getElementById("rightArrowBtn").addEventListener("click", () => {
        if (pBIndex !== portfolioBoxes.length - 1) {
            pBIndex++;
            portfolioBoxCarousel();
        }
    })
}

portfolioBoxCarousel = () => {
    let pB = portfolioBoxes;
    let leftArrow = document.getElementById("leftArrowBtn");
    let rightArrow = document.getElementById("rightArrowBtn");

    document.getElementById("mobileBtnsText").textContent = (pBIndex + 1) + " of " + pB.length;

    if (pBIndex === 0) {
        leftArrow.classList.add("noclick");
    } else if (pBIndex === pB.length - 1) {
        rightArrow.classList.add("noclick");
    } else {
        leftArrow.classList.remove("noclick");
        rightArrow.classList.remove("noclick");
    }

    for(let i = 0; i < pB.length; i++) {
        let x = pB[i].offsetWidth;

        if (i < pBIndex) {
            x *= (pBIndex - i) * -1.05;
        } else if (i > pBIndex) {
            x *= (i - pBIndex) * 1.05;
        } else {
            x *= 0;
        }

        let inlineStyle = "transform: translateX(" + x + "px)";
        pBIndex !== i ? inlineStyle += "scale(0.85)" : null;
        pB[i].setAttribute("style", inlineStyle);
    }
}

//CANVAS ANIMATIONS FOR STARS, SHOOTINGSTARS, & PLANETS
const canvas = document.getElementById("stars");
const box = canvas.getBoundingClientRect();
canvas.width = box.width;
canvas.height = box.height;
let maxStarSize = 2.8;
let numStars = 200;

var c = canvas.getContext('2d');

function Star(x, y, size, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = Math.random() > 0.49 ? dy : -dy;

    this.draw = () => {
        c.beginPath();
        // c.shadowBlur = this.size * 5;
        // c.shadowColor = "white";
        c.arc(this.x, this.y, size, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }

    this.update = () => {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let starArray = [];

createInitialStars = () => {
  for (let i = 0; i < numStars; i++) {
    let x = Math.random() * box.width - 50;
    let y = Math.random() * box.height;
    let size = createStarSize(i < numStars-100);
    let dx = Math.random() * (size/6) + 0.05;
    let dy = Math.random() * (size/10);
    starArray.push(new Star(x, y, size, dx, dy));
  }
}

createStarSize = d => {
    if (d) {
      return Math.random() * 0.4 + 0.35;
    } else {
      return Math.random() * maxStarSize + 0.2;
    }
}

function ShootingStar(x, y, size, dx, dy, fill) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this. dy = dy;
    this.fill = fill;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // c.shadowBlur = this.size/4;
        // c.shadowColor = "gold";
        c.fillStyle = fill;
        c.fill();
        c.closePath();
    }

    this.update = () => {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let shootingStarArray = [];

function Planet(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dx = this.size;
    this.colorized = false;
    this.grd = c.createRadialGradient(this.x, this.y, 10, this.x, this.y, 100);
    this.grd.addColorStop(0, "orange");
    this.grd.addColorStop(1, "gold");


    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.grd;
        // c.shadowBlur = this.size/4;
        // c.shadowColor = "gray";
        c.fill();
        c.closePath();
    }

    this.grow = (growth) => {
        this.size = growth;
        this.dx = growth > (box.height/10) ? 750/growth : (growth/20) + 1;
        this.draw();
    }

    this.speedUp = (factor) => {
        this.dx = this.dx * factor;
    }

    this.colorize = () => {
        let y1 = this.y - this.size * 1.05,
            y2 = this.y + this.size * 1.05;
        this.grd = c.createLinearGradient(0, y1, 0, y2);
        let trns = Math.random() > 0.51 && this.size > box.height/15 ? 2 : 1;
        for (let i = 0; i <= trns; i++) {
            let location = (i/trns === 0.5) ?
                    (Math.random() * 0.6 + 0.2) : (0 + i/trns);
            this.grd.addColorStop(location, randomColor());
        }
        this.colorized = true;
    }

    this.update = () => {
        this.x += this.dx;
        this.draw();
    }
}

const portContain = document.getElementById("portfolioContainer");
const planetInstructions = document.getElementById("planetInstructions");
const originalPlanetInstructions = planetInstructions.textContent;
let planetArray = [];
let planetGrow;
let growing = false;
let growth = 5;
let onDown;
let onUp;

// TODO: Disable right click conctext prevention
// window.oncontextmenu = function(event) {
//      event.preventDefault();
//      event.stopPropagation();
//      return false;
// };

portContain.addEventListener("mousedown", (e) => {
    growPlanet(e, false);
})

portContain.addEventListener("touchstart", (e) => {
    growPlanet(e, true);
    console.log(e)
})

growPlanet = (e, touch) => {
    planetInstructions.textContent = "Drag right to increase the planet's speed.";
    if (e.button === 0 || touch) {
        growing = true;
        onDown = touch ? e.changedTouches[0] : e;
        growth > 5 ? growth = 5 : null;
        let x = touch ? e.changedTouches[0].pageX : e.pageX;
        let y = touch ? e.changedTouches[0].pageY - initial.offsetHeight : e.pageY - portContain.clientHeight;
        planetArray.push(new Planet(x, y));
        planetGrow = setInterval(() => {
            growth += (growth * 0.02);
        }, 1)
    }
}

document.addEventListener("mouseup", (e) => {
    releasePlanet(e, false);
});

document.addEventListener("touchend", (e) => {
    releasePlanet(e, true);
})

releasePlanet = (e, touch) => {
    planetInstructions.textContent = originalPlanetInstructions;
    growing = false;
    growth = 5;
    clearInterval(planetGrow);
    onUp = touch ? e.changedTouches[0] : e;
}

animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    let starChance = Math.random();
    if (starChance < 0.04) {
        let x = -50;
        let y = Math.random() * canvas.height;
        let size = createStarSize(starChance > 0.075);
        let dx = Math.random() * (size/6) + 0.05;
        let dy = Math.random() * (size/10);
        starArray.push(new Star(x, y, size, dx, dy));
    }

    if (shootingStarArray.length < 1) {
        if (Math.random() < 0.05) {
            let x = -50;
            let y = Math.random() * box.height;
            let size = Math.random() * maxStarSize + 2;
            let tailLen = Math.floor(size) * 60;
            let dx = Math.random() * (size) + 8;
            let d = Math.random() < 0.5 ? -3 : 3;
            let dy = Math.random() * (size * d);

            for (let i = 0; i < tailLen; i++) {
                let factor = (tailLen - i) / tailLen;
                let fill = "rgba(255, 233, 122, " + (factor/2) + ")";
                shootingStarArray.push(
                  new ShootingStar(x-(i * dx/8), y-(i * dy/8), size * factor, dx, dy, fill)
                );
            }
        }
    } else {
        for (let i = 0; i < shootingStarArray.length; i++) {
            shootingStarArray[i].update();
            if (i + 1 === shootingStarArray.length &&
                (shootingStarArray[i].x > canvas.width ||
                 shootingStarArray[i].y > canvas.height)) {
                      shootingStarArray = [];
            }
        }
    }


    for(let i = 0; i < starArray.length; i++) {
        starArray[i].update();
        starArray[i].x > canvas.width && starArray.splice(i, 1);
    }

    if (planetArray.length > 0) {
        for (let i = 0; i < planetArray.length; i++) {
            if (i+1 === planetArray.length && growing) {
                if (growth > canvas.height || growth > canvas.width) {
                    growing = false;
                    growth = 1;
                    clearInterval(planetGrow);
                } else {
                    planetArray[i].grow(growth);
                }
            } else {
                if (!planetArray[i].colorized) {
                    planetArray[i].colorize();
                    if (onUp.pageX > onDown.pageX &&
                       Math.abs(onUp.pageX - onDown.pageX) / canvas.width > 0.099) {
                        let factor = ((onUp.pageX - onDown.pageX) / canvas.width) + 1.5;
                        planetArray[i].speedUp(factor);
                    }
                }
                planetArray[i].update();
                if (planetArray[i].x > canvas.width * 2) {
                    planetArray.splice(i, 1);
                }
            }
        }
    }

    c3.clearRect(0, 0, c3W, c3H);
    if (sparksArray.length > 0) {
       for(let i = 0; i < sparksArray.length; i++) {
           sparksArray[i].update();
           if (sparksArray[i].y - 100 > c3H || sparksArray[i].size < 0.1) {
               sparksArray.splice(i, 1);
           }
       }
    }
}

randomColor = () => {

  var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

  function populate(a) {
    for ( var i = 0; i < 6; i++ ) {
      var x = Math.round( Math.random() * 14 );
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

  return populate("#");
}

const aBKids = document.getElementById("aboutMeMenu").children;

for (let i=0; i < aBKids.length; i++) {
    if (true) {
        aBKids[i].addEventListener("click", (e) => {
            const div = e.target || e.srcElement;
            if (div.id.indexOf("Img") < 0) {
                const xSt = c2W * 0.6 * Math.random() + c2W * 0.3;
                boltArray.push(new Bolt(xSt, -10, e.x, e.y));
                canvas2.classList.remove("grayBg");
                canvas2.classList.add("whiteBg");
                animateLightning(e);
            }
        })
    }
}

// CANVAS FOR LIGHTNING
const canvas2 = document.getElementById("lightning");
const box2 = canvas2.getBoundingClientRect();
canvas2.width = box2.width;
canvas2.height = box2.height;
c2W = canvas2.width;
c2H = canvas2.height;

let c2 = canvas2.getContext('2d');

let sparksCreated = false;

animateLightning = (e) => {

  let div = e.target || e.srcElement;
  let lowerDiv;

  if (boltArray.length > 0) {
      hideAllAboutMeContent();
      setTimeout(() => {
          canvas2.classList.remove("whiteBg");
          canvas2.classList.add("grayBg");
      }, 100)

      setTimeout(() => {
          canvas2.classList.remove("grayBg");
      }, 900)

      // setTimeout(() => {
          let boltInterval = setInterval(() => {
              c2.clearRect(0, 0, c2W, c2H);
              boltArray[0].update( done => {
                  if (done) {
                      clearInterval(boltInterval);
                      setTimeout(() => {
                          c2.clearRect(0, 0, c2W, c2H);
                          boltArray = [];
                      }, 300)

                      if (div.id !== "slash" && div.id !== "slashImg" && div.id !== imgID) {
                          for (let i = 0; i < aBKids.length; i++) {
                              imgID = div.id;
                              aBKids[i].classList.remove("aBUp");
                              if (aBKids[i].id === div.id && i < 5) {
                                  lowerDiv = aBKids[i+5];
                              }
                          }
                      } else {
                          div.classList.toggle("aBUp");
                      }
                      setTimeout(() => {
                          div.classList.add("aBUp");
                          if (animatingImg) {
                              clearInterval(animateImgIDInterval);
                              removeImgsFromSiblings(div);
                          }
                          animateImgID();
                          if (!sparksCreated) {
                              createSparks(e);
                          }
                          lowerDiv.classList.add("aBUp");
                          lowerDiv.classList.add("img1");
                          revealAboutMeContent(div.id);
                      }, 10);
                  }
              })
          }, 1)
      // }, 35)
    }
}

removeImgsFromSiblings = div => {
    let kids = div.parentNode.children;
    for(let i = 0; i < kids.length; i++) {
        if (kids[i].classList.contains("img2")) {
            kids[i].classList.remove("img2");
        }
    }
}

//ANIMATION OF ABOUT ME MENU IMAGES
let imgID;
let currAnimatingID;
let animatingImg = false;
let animateImgIDInterval;

animateImgID = () => {
    animatingImg = true;
    let num = 1;
    let elem = document.getElementById(imgID + "Img");
    animateImgIDInterval = setInterval(() => {
        num < 2 ? num++ : num = 1;
        if (num === 1) {
            elem.classList.remove("img2");
            elem.classList.add("img1");
        } else {
            elem.classList.remove("img1");
            elem.classList.add("img2");
        }
    }, 500)
}

let boltArray = [];

function Bolt(xStart, yStart, xDest, yDest) {
    this.x = xStart;
    this.y = yStart;

    c2.beginPath();
    c2.moveTo(this.x, this.y);

    const len = Math.random() * c2H/5 + c2H/5;
    const xRange = ((yDest - this.y) / yDest) * (c2W * 0.7);
    this.x = Math.random() * xRange  + (c2W * 0.05);
    this.y += len;
    c2.lineTo(this.x, this.y);


    let grad = c2.createLinearGradient(0,0,0,c2H);
    grad.addColorStop("0", "white");
    c2.lineWidth = 6;
    c2.strokeStyle = grad;

    this.draw = () => c2.stroke();

    this.update = (next) => {
        if (this.y < yDest - 201) {
            next(false);
            const len = Math.random() * 150 + 50;
            const xRange = ((yDest - this.y) / yDest) * (c2W * 0.75);
            this.x = Math.random() * xRange  + (c2W * 0.05);
            this.y += len;
            c2.lineWidth = 5 * ((yDest - this.y) / yDest);
            c2.lineTo(this.x, this.y);
        } else {
            next(true);
            grad.addColorStop("0.5", "white");
            grad.addColorStop("0.95", "gray");
            c2.lineWidth = 2;
            c2.strokeStyle = grad;
            c2.lineTo(xDest, yDest);
        }
        this.draw();
    }
}

// CANVAS FOR SPARKS
const canvas3 = document.getElementById("sparks");
const box3 = canvas3.getBoundingClientRect();
canvas3.width = box3.width;
canvas3.height = box3.height;
c3W = canvas3.width;
c3H = canvas3.height;

let c3 = canvas3.getContext('2d');

let sparksArray = [];

function Spark(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.h = y - 100;
    this.down = false;
    this.size = 3;
    let grd = c3.createRadialGradient(x, y, 20, x, y, 60);
    grd.addColorStop(0, "gold");
    grd.addColorStop(0.7, "orange");
    grd.addColorStop(1, "#484a46");

    this.draw = () => {
        c3.beginPath();
        c3.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c3.fillStyle = grd;
        c3.fill();
        c3.closePath();
    }

    this.update = () => {
        this.dx = this.dy < 0 ? this.dx : this.dx * 0.98;
        this.dy = this.changeDY(this.y ,this.dy);
        this.x += this.dx;
        this.y += this.dy;
        this.size *= 0.95;
        this.draw();
    }

    this.changeDY = (y, dy) => {
        if (y < this.h || this.down) {
            this.down = true;
            return Math.abs(dy * 1.1 + 20);
        } else {
            return dy * 0.98 + 0.2;
        }
    }
}

createSparks = (e) => {
    sparksCreated = true;
    const numSparks = Math.random() * 30 + 15;
    for(let i = 0; i < numSparks; i++) {
        const rate = Math.random() * 3;
        const dx = Math.random() < 0.5 ? rate : -rate;
        const dy = Math.random() * -5 - 0.2;
        sparksArray.push(new Spark(e.x, e.y - c3H, dx, dy))
    }
    setTimeout(() => sparksCreated = false, 500);
}

hideAllAboutMeContent = () => {
    let divs = document.querySelectorAll(".aboutMeInfoContainer");
    for(let i = 0; i < divs.length; i++) {
        divs[i].classList.add("hidden");
        divs[i].classList.remove("appear");
    }
}

revealAboutMeContent = (id) => {
    let newId = id + "Container";
    let div = document.getElementById(newId);
    div.classList.remove("hidden");
    if (id === "desk") {
        aboutMe.setAttribute("style", "background-image: url(./img/eduBg.jpeg)");
        changeDeskContent("aBMeHTML");
    }
    if (id === "head") {
      aboutMe.setAttribute("style", "background-image: url(./img/headBg.jpeg)");
      turnOnLightBulb();
    }
    if (id === "heart") {
      aboutMe.setAttribute("style", "background-image: url(./img/heartBg.jpeg)");
      populateHeartContent();
    }
    setTimeout(() => div.classList.add("appear"), 500);

}

let tabs = document.querySelectorAll(".tab");
let editor = document.getElementById("editor");

for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", (e) => {
        let id = e.target.id || e.srcElement.id;
        changeDeskContent(id);
    })
}

const deskContent = {
    "aBMeHTML": `
        <div id="informalEducation">
          <code>&lt;<span class="htmlTag">self-taught</span>&gt;<br/></code>
          <div style="padding-left: 50px; position: relative">
            <code>I've received no formal education in my development journey. Special thanks to Codecademy, Derrick Bannas, YouTube, GitHub, StackOverflow, the React-Native community, and &lt;em&gt;my patient wife&lt;/em&gt;.<br/></code>
          </div>
          <code>&lt;/<span class="htmlTag">self-taught</span>&gt;</code>
        </div>
    `,
    "aBMeCSS": `
        <div id="confidenceLevels">
          <code><span style="color: lightblue; background: transparent">.confidenceLevels</span> {<br/></code>
          <div style="padding-left: 50px; position: relative">
            <code>
              react-native: <span class="cssPerc">90%</span>;<br/>
              wordpress: <span class="cssPerc">90%</span>;<br/>
              javascript: <span class="cssPerc">90%</span>;<br/>
              redux: <span class="cssPerc">85%</span>;<br/>
              html: <span class="cssPerc">80%</span>;<br/>
              css: <span class="cssPerc">80%</span>;<br/>
              react: <span class="cssPerc">75%</span>;<br/>
              express: <span class="cssPerc">70%</span>;<br/>
              sequelize: <span class="cssPerc">60%</span>;<br/>
            </code>
          </div>
          <code>}</code>
        </div>
    `,
    "aBMeJS": `
        <div id="jsInfo">
          <code><span class="fnPurple">const</span> <span class="fnBlue">myGoal</span> = () <span class="fnPurple">=></span> {<br/></code>
          <code><span class="fnPurple">while</span> (awake) {<br/></code>
          <code><span class="fnBlue">keepLearning</span>();<br/></code>
          <code><span class="fnBlue">exploreEverything</span>();<br/></code>
          <code><span class="fnBlue">challengeMyself</span>();<br/></code>
          <code>}<br/></code>
          <code>}<br/></code>
        </div>
    `
}

changeDeskContent = (id) => {
    editor.innerHTML = deskContent[id];
    for(let i = 0; i < tabs.length; i++) {
        if (tabs[i].id === id) {
            let onStyle = "background: #484a46; color: white; opacity: 1";
            tabs[i].setAttribute("style", onStyle);
        } else {
            let offStyle = "background: lightgray; color: black; opacity: 0.8";
            tabs[i].setAttribute("style", offStyle);
        }
    }
}

turnOnLightBulb = () => {
    let bulb = document.getElementById("bulb");
    bulb.addEventListener("click", () => turnOnLightBulb());
    let num;
    const wIW = window.innerWidth;

    if (wIW < 330) {
        num = 100;
    } else if (wIW < 580) {
        num = 200;
    } else {
        num = 300;
    }

    bulb.width = num;
    bulb.height = num;
    let bctx = bulb.getContext("2d");
    let unlit = document.getElementById("unlit");
    let partial = document.getElementById("partial");
    let lit = document.getElementById("lit");

    bctx.drawImage(unlit, 0, 0, num, num);
    setTimeout(() => {
            let count = 0;
            let int = setInterval(() => {
                bctx.clearRect(0, 0, bulb.width, bulb.height);
                bctx.drawImage(partial, 0, 0, num, num);
                setTimeout(() => {
                    bctx.clearRect(0, 0, bulb.width, bulb.height);
                    bctx.drawImage(unlit, 0, 0, num, num);;
                    count++
                    if (count > 2) {
                        clearInterval(int);
                        bctx.clearRect(0, 0, bulb.width, bulb.height);
                        bctx.drawImage(lit, 0, 0, num, num);
                    }
                }, 100)
            }, 250);
        }, 2500)
}

createFormEventsListeners = () => {
    let formKids = document.getElementById("sHForm").children
    for(let i = 0; i < formKids.length; i++) {
        formKids[i].children[1].addEventListener("focusin", () => {
            formKids[i].children[0].classList.add("selected")
        })
        formKids[i].children[1].addEventListener("focusout", () => {
            console.log(formKids[i].children[1].value)
            if (formKids[i].children[1].value.length < 1) {
                formKids[i].children[0].classList.remove("selected")
            }
        })
        formKids[i].children[0].addEventListener("click", () => {
            formKids[i].children[1].focus();
        })
    }

}

let heartContent = [
    {
        name: "family",
        svg: `
            <svg id="family" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="dad" transform="translate(69.000000, 19.000000)" fill="white">
                        <ellipse cx="96" cy="46.7528517" rx="46.6788991" ry="46.7528517"></ellipse>
                        <path d="M36.9908257,303.21673 L73.9816514,303.21673 L73.9816514,454 C73.9816514,458.418278 70.3999294,462 65.9816514,462 L44.9908257,462 C40.5725477,462 36.9908257,458.418278 36.9908257,454 L36.9908257,303.21673 Z" id="Rectangle-2"></path>
                        <path d="M118.018349,303.21673 L155.009174,303.21673 L155.009174,454 C155.009174,458.418278 151.427452,462 147.009174,462 L126.018349,462 C121.600071,462 118.018349,458.418278 118.018349,454 L118.018349,303.21673 Z" id="Rectangle-2-Copy"></path>
                        <path d="M41.4678899,100.326996 L150.53211,100.326996 C154.950388,100.326996 158.53211,103.908718 158.53211,108.326996 L158.53211,294.395437 L33.4678899,294.395437 L33.4678899,108.326996 C33.4678899,103.908718 37.0496119,100.326996 41.4678899,100.326996 Z"></path>
                        <rect x="0" y="107.38403" width="28.1834862" height="171.13308" rx="14"></rect>
                        <rect x="163.816514" y="107.38403" width="28.1834862" height="171.13308" rx="14"></rect>
                    </g>
                    <g id="kid" transform="translate(233.000000, 309.000000)" fill="white">
                        <ellipse cx="33.6174896" cy="24.8571429" rx="24.7102915" ry="24.8571429"></ellipse>
                        <path d="M15.9672814,122.285714 L28.3224271,122.285714 L28.3224271,168 C28.3224271,170.209139 26.5315661,172 24.3224271,172 L19.9672814,172 C17.7581424,172 15.9672814,170.209139 15.9672814,168 L15.9672814,122.285714 Z" id="Rectangle-2-Copy-2"></path>
                        <path d="M40.6775729,122.285714 L53.0327186,122.285714 L53.0327186,168 C53.0327186,170.209139 51.2418576,172 49.0327186,172 L44.6775729,172 C42.4684339,172 40.6775729,170.209139 40.6775729,168 L40.6775729,122.285714 Z" id="Rectangle-2-Copy-4"></path>
                        <path d="M20.4372397,53.0408163 L48.5627603,53.0408163 C52.9810383,53.0408163 56.5627603,56.6225383 56.5627603,61.0408163 L56.5627603,118.734694 L12.4372397,118.734694 L12.4372397,61.0408163 C12.4372397,56.6225383 16.0189617,53.0408163 20.4372397,53.0408163 Z"></path>
                        <rect x="0" y="56.9183673" width="10.097561" height="49.7142857" rx="5.04878049"></rect>
                        <rect x="58.4098751" y="56.9183673" width="10.097561" height="49.7142857" rx="5.04878049"></rect>
                    </g>
                    <g id="mom" transform="translate(282.000000, 66.000000)" fill="white">
                        <path d="M90,291.313559 L116.470588,291.313559 L116.470588,410 C116.470588,412.761424 114.232012,415 111.470588,415 L95,415 C92.2385763,415 90,412.761424 90,410 L90,291.313559 Z" id="Rectangle-2-Copy-3"></path>
                        <path d="M33.5294118,291.313559 L60,291.313559 L60,410 C60,412.761424 57.7614237,415 55,415 L38.5294118,415 C35.767988,415 33.5294118,412.761424 33.5294118,410 L33.5294118,291.313559 Z"></path>
                        <ellipse cx="74.1176471" cy="42.4067797" rx="42.3529412" ry="42.4067797"></ellipse>
                        <path d="M27.4221423,91.6483085 L121.010201,91.6483033 C125.428482,91.6483033 129.010206,95.2300277 129.010206,99.6483085 C129.010206,100.11738 128.968951,100.585543 128.886918,101.047385 C120.933507,145.824594 116.956802,180.788387 116.956802,205.938766 C116.956802,232.822709 121.500613,259.51403 130.588235,286.012729 L17.6470588,286.012729 C25.6677362,270.726902 29.6780749,244.035581 29.6780749,205.938766 C29.6780749,171.013971 26.3077525,136.089173 19.5671076,101.16437 L19.5671035,101.164371 C18.7298078,96.8261526 21.5678662,92.6305696 25.9060843,91.7932739 C26.4056771,91.6968502 26.9133295,91.6483085 27.4221423,91.6483085 Z"></path>
                        <rect x="0" y="100.483051" width="17.6470588" height="136.055085" rx="8"></rect>
                        <rect x="132.352941" y="100.483051" width="17.6470588" height="136.055085" rx="8"></rect>
                    </g>
                </g>
            </svg>
        `
    },
    {
        name: "music",
        svg: `
            <svg id="music" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M432.40167,60.6074122 L433,60 L433,361 C432.695292,395.839903 400.800526,424 361.5,424 C322.01164,424 290,395.570082 290,360.5 C290,325.429918 322.01164,297 361.5,297 C378.322581,297 393.788231,302.159679 406,310.794336 L406,136.760781 C370.349964,156.673207 334.675608,168.771398 298.976931,173.055354 C263.283841,177.338639 227.624864,176.493034 192,170.51854 L192,392 C191.695292,426.839903 159.800526,455 120.5,455 C81.0116404,455 49,426.570082 49,391.5 C49,356.429918 81.0116404,328 120.5,328 C137.322581,328 152.788231,333.159679 165,341.794336 L165,100.445312 L165.391587,100.64713 C166.596129,96.4770066 170.441933,93.4274459 175,93.4274459 C175.714606,93.4274459 176.427153,93.5040445 177.125431,93.655929 C218.789733,102.718454 259.406899,104.638483 298.976931,99.4160156 C337.601233,94.3183658 377.235395,79.6547104 417.879419,55.4250495 C422.623274,52.5970287 428.761491,54.1501226 431.589509,58.8939793 C431.915242,59.44038 432.186718,60.0142661 432.40167,60.6074122 Z" fill="white"></path>
                </g>
            </svg>
        `
    },
    {
        name: "exercise",
        svg: `
            <svg id="exercise" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M280.103529,280.563232 L396.269147,333.15402 C398.057838,333.9638 399.207017,335.745519 399.207017,337.708975 L399.207017,453.132547 C399.207017,455.893971 396.96844,458.132547 394.207017,458.132547 C393.704596,458.132547 393.205046,458.056822 392.725197,457.907922 L341.372584,441.972978 C339.280377,441.323757 337.854404,439.388223 337.854404,437.197603 L337.854404,373.06098 C337.854404,370.893732 336.458188,368.973229 334.396608,368.304762 L242.724254,338.580001 L193.949709,430.590047 C193.359138,431.704121 192.369447,432.553925 191.17888,432.969237 L88.6468529,468.73603 C86.0395145,469.645562 83.1885281,468.269218 82.2789963,465.66188 C82.0943145,465.132456 82,464.575738 82,464.015027 L82,419.651463 C82,417.656841 83.1854972,415.853031 85.0164474,415.061744 L157.670321,383.662701 C158.934809,383.116223 159.917822,382.072273 160.387353,380.777242 L192.937787,290.998644 C192.999874,290.8274 193.071272,290.659676 193.151662,290.496224 L240.568133,194.087186 C240.755589,193.706042 240.990847,193.350339 241.268224,193.028668 L282.182008,145.581345 C282.237743,145.516709 282.295125,145.45351 282.354096,145.391812 L318.107889,107.984227 C319.549295,106.476149 321.775525,106.021475 323.692837,106.843586 L363.986128,124.120658 C366.524083,125.20889 367.699316,128.148496 366.611084,130.686451 C366.563641,130.797097 366.512217,130.905994 366.456914,131.012927 C359.110638,145.217457 355.4375,157.043877 355.4375,166.492188 C355.4375,176.37404 359.45546,194.958401 367.49138,222.245272 C368.271479,224.894221 371.051278,226.409214 373.700226,225.629105 C373.787466,225.603413 373.873989,225.575346 373.959699,225.544934 L423.544325,207.951188 C426.002666,207.078913 428.71851,208.24307 429.781938,210.624965 L440.475545,234.576801 C441.581742,237.054491 440.509882,239.962262 438.060209,241.12919 L349.325108,283.399111 C346.832093,284.586685 343.848385,283.528417 342.66081,281.035401 C342.622415,280.9548 342.586185,280.873185 342.55216,280.790644 L323.832876,235.379435 C322.780477,232.826414 319.857706,231.60992 317.304685,232.662319 C316.481915,233.001479 315.764576,233.554089 315.226723,234.263098 L280.103529,280.563232 Z M366.679612,110.359224 C344.765167,110.359224 327,92.5940563 327,70.6796118 C327,48.7651673 344.765167,31 366.679612,31 C388.594056,31 406.359224,48.7651673 406.359224,70.6796118 C406.359224,92.5940563 388.594056,110.359224 366.679612,110.359224 Z" id="Combined-Shape" fill="white"></path>
                    <rect fill="white" x="60" y="111" width="196" height="12" rx="6"></rect>
                    <rect fill="white" x="60" y="148" width="169" height="12" rx="6"></rect>
                    <rect fill="white" x="60" y="185" width="135" height="12" rx="6"></rect>
                </g>
            </svg>
        `
    },
    {
        name: "cooking",
        svg: `
            <svg id="cooking" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M294.455102,350.46052 C293.105441,356.387881 290.732835,360.503883 287.982964,361.102084 L287.982964,415.241882 C287.982964,422.973868 281.71495,429.241882 273.982964,429.241882 L47.8231685,429.241882 C40.091182,429.241882 33.8231685,422.973868 33.8231685,415.241882 L33.8231685,313.565722 L24.8036245,299.63634 C23.3027252,297.318418 23.965053,294.222651 26.282975,292.721752 C27.0924517,292.1976 28.0362348,291.918721 29.0005935,291.918721 L290.200395,291.918721 C292.961819,291.918721 295.200395,294.157297 295.200395,296.918721 C295.200395,297.646141 295.041675,298.364801 294.73531,299.024558 L287.982964,313.565722 L287.982964,317.0704 C290.274414,317.568877 292.303899,320.510037 293.697815,324.906499 L466.810378,288.110288 C469.511458,287.536156 472.166542,289.260388 472.740674,291.961468 L475.960442,307.109282 C476.534574,309.810362 474.810342,312.465446 472.109262,313.039578 L296.28346,350.412506 C295.663376,350.544309 295.045717,350.554984 294.455102,350.46052 Z" fill="white"></path>
                    <path d="M99.9434066,71 L104.072224,71 C105.828435,71 107.252125,72.4236901 107.252125,74.1799009 C107.252125,74.8284043 107.053847,75.461405 106.683878,75.9940212 C98.0017457,88.4930327 95.0079373,100.67797 97.7024481,112.548828 C102.280725,132.71875 124.630925,172.837891 124.630925,205.558594 C124.630925,226.656963 120.206434,247.755332 111.357453,268.853702 L111.35746,268.853705 C110.812118,270.153949 109.539819,271 108.129843,271 L103.937026,271.000002 C102.004028,271.000002 100.437024,269.432998 100.437024,267.5 C100.437024,266.931116 100.575692,266.370806 100.841021,265.867587 C107.724798,252.811941 111.166687,232.708943 111.166687,205.558594 C111.166687,159.053711 88.750882,128.242887 87.1804988,112.548828 C86.1754912,102.505007 89.367355,89.3400502 96.7560901,73.0539577 L96.756098,73.0539613 C97.3235234,71.8032542 98.5700022,71 99.9434066,71 Z" fill="white"></path>
                    <path d="M148.943407,74 L153.072224,74 C154.828435,74 156.252125,75.4236901 156.252125,77.1799009 C156.252125,77.8284043 156.053847,78.461405 155.683878,78.9940212 C147.001746,91.4930327 144.007937,103.67797 146.702448,115.548828 C151.280725,135.71875 173.630925,175.837891 173.630925,208.558594 C173.630925,229.656963 169.206434,250.755332 160.357453,271.853702 L160.35746,271.853705 C159.812118,273.153949 158.539819,274 157.129843,274 L152.937026,274.000002 C151.004028,274.000002 149.437024,272.432998 149.437024,270.5 C149.437024,269.931116 149.575692,269.370806 149.841021,268.867587 C156.724798,255.811941 160.166687,235.708943 160.166687,208.558594 C160.166687,162.053711 137.750882,131.242887 136.180499,115.548828 C135.175491,105.505007 138.367355,92.3400502 145.75609,76.0539577 L145.756098,76.0539613 C146.323523,74.8032542 147.570002,74 148.943407,74 Z" fill="white"></path>
                    <path d="M197.943407,74 L202.072224,74 C203.828435,74 205.252125,75.4236901 205.252125,77.1799009 C205.252125,77.8284043 205.053847,78.461405 204.683878,78.9940212 C196.001746,91.4930327 193.007937,103.67797 195.702448,115.548828 C200.280725,135.71875 222.630925,175.837891 222.630925,208.558594 C222.630925,229.656963 218.206434,250.755332 209.357453,271.853702 L209.35746,271.853705 C208.812118,273.153949 207.539819,274 206.129843,274 L201.937026,274.000002 C200.004028,274.000002 198.437024,272.432998 198.437024,270.5 C198.437024,269.931116 198.575692,269.370806 198.841021,268.867587 C205.724798,255.811941 209.166687,235.708943 209.166687,208.558594 C209.166687,162.053711 186.750882,131.242887 185.180499,115.548828 C184.175491,105.505007 187.367355,92.3400502 194.75609,76.0539577 L194.756098,76.0539613 C195.323523,74.8032542 196.570002,74 197.943407,74 Z" fill="white"></path>
                    <path d="M347.259645,116.112087 C335.110805,111.101912 326.259645,95.6293154 326.259645,77.3185627 C326.259645,54.9510303 339.467245,36.8185627 355.759645,36.8185627 C372.052046,36.8185627 385.259645,54.9510303 385.259645,77.3185627 C385.259645,95.1230565 376.891157,110.244164 365.259645,115.672688 L365.259645,292.818563 C365.259645,296.684556 362.125639,299.818563 358.259645,299.818563 L354.259645,299.818563 C350.393652,299.818563 347.259645,296.684556 347.259645,292.818563 L347.259645,116.112087 Z" fill="white" transform="translate(355.759645, 168.318563) scale(-1, -1) rotate(51.000000) translate(-355.759645, -168.318563) "></path>
                </g>
            </svg>
        `
    },
    {
        name: "video games",
        svg: `
            <svg id="videoGames" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M135.143921,174.309189 L135.143921,158.081541 C135.143921,155.872402 133.35306,154.081541 131.143921,154.081541 L122.961802,154.081541 C120.752663,154.081541 118.961802,155.872402 118.961802,158.081541 L118.961802,174.309189 L102.734154,174.309189 C100.525015,174.309189 98.7341543,176.10005 98.7341543,178.309189 L98.7341543,186.491308 C98.7341543,188.700447 100.525015,190.491308 102.734154,190.491308 L118.961802,190.491308 L118.961802,206.718956 C118.961802,208.928095 120.752663,210.718956 122.961802,210.718956 L131.143921,210.718956 C133.35306,210.718956 135.143921,208.928095 135.143921,206.718956 L135.143921,190.491308 L151.371569,190.491308 C153.580708,190.491308 155.371569,188.700447 155.371569,186.491308 L155.371569,178.309189 C155.371569,176.10005 153.580708,174.309189 151.371569,174.309189 L135.143921,174.309189 Z M379.882472,304.974767 C336.351146,311.074922 293.056989,314.125 250,314.125 C207.049194,314.125 164.239094,311.089947 121.569701,305.019842 C104.237868,365.713016 77.1704164,407.639389 55.502788,403.427628 C29.6514359,398.402635 21.2758707,329.604942 36.7954396,249.763682 C50.1674555,180.970624 76.9160671,126.424621 100.598979,115.860356 C102.632775,114.072331 105.194711,112.863283 108.036749,112.494178 C154.566755,106.451184 201.887839,103.429687 250,103.429687 C298.06387,103.429687 344.207831,106.445122 388.431883,112.475991 C390.12733,112.7072 391.722941,113.237867 393.164868,114.012753 C418.401783,114.993151 449.275824,172.384848 463.761017,246.904702 C478.973665,325.166991 470.349291,392.684675 444.497939,397.709669 C423.264508,401.837029 397.013357,362.520403 379.882472,304.974767 Z M190.047537,287.006085 C205.368344,287.006085 217.788311,274.586118 217.788311,259.265311 C217.788311,243.944504 205.368344,231.524536 190.047537,231.524536 C174.72673,231.524536 162.306763,243.944504 162.306763,259.265311 C162.306763,274.586118 174.72673,287.006085 190.047537,287.006085 Z M309.101694,287.006085 C324.422501,287.006085 336.842469,274.586118 336.842469,259.265311 C336.842469,243.944504 324.422501,231.524536 309.101694,231.524536 C293.780887,231.524536 281.36092,243.944504 281.36092,259.265311 C281.36092,274.586118 293.780887,287.006085 309.101694,287.006085 Z M367.472907,171.419525 C373.537393,171.419525 378.45363,166.503288 378.45363,160.438802 C378.45363,154.374316 373.537393,149.458079 367.472907,149.458079 C361.408421,149.458079 356.492184,154.374316 356.492184,160.438802 C356.492184,166.503288 361.408421,171.419525 367.472907,171.419525 Z M389.434354,193.380972 C395.49884,193.380972 400.415077,188.464734 400.415077,182.400248 C400.415077,176.335762 395.49884,171.419525 389.434354,171.419525 C383.369868,171.419525 378.45363,176.335762 378.45363,182.400248 C378.45363,188.464734 383.369868,193.380972 389.434354,193.380972 Z M367.472907,215.342418 C373.537393,215.342418 378.45363,210.426181 378.45363,204.361695 C378.45363,198.297209 373.537393,193.380972 367.472907,193.380972 C361.408421,193.380972 356.492184,198.297209 356.492184,204.361695 C356.492184,210.426181 361.408421,215.342418 367.472907,215.342418 Z M345.511461,193.380972 C351.575947,193.380972 356.492184,188.464734 356.492184,182.400248 C356.492184,176.335762 351.575947,171.419525 345.511461,171.419525 C339.446975,171.419525 334.530737,176.335762 334.530737,182.400248 C334.530737,188.464734 339.446975,193.380972 345.511461,193.380972 Z" fill="white"></path>
                </g>
            </svg>
        `
    },
    {
        name: "travel",
        svg: `
            <svg id="travel" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M250.5,26 L250.5,26 C266.240115,26 279,38.7598846 279,54.5 L279,426 L222,426 L222,54.5 C222,38.7598846 234.759885,26 250.5,26 Z" fill="white"></path>
                    <path d="M223.288337,189 L33.0394673,295.978194 C31.779672,296.686585 31,298.019481 31,299.464784 L31,317.287366 C31,319.496505 32.790861,321.287366 35,321.287366 C35.3629819,321.287366 35.7242747,321.237959 36.0739296,321.140504 L223.288337,268.960938 L223.288337,189 Z" fill="white"></path>
                    <path d="M277,189 L467.182362,295.940797 C468.49642,296.6797 469.288337,297.938435 469.288337,299.288199 L469.288337,317.052705 C469.288337,319.261844 467.204946,321.052705 464.634953,321.052705 C464.147604,321.052705 463.663279,320.986897 463.19969,320.857687 L277,268.960938 L277,189 Z" fill="white"></path>
                    <path d="M250.71686,402.103207 L331.612228,459.818552 C332.664455,460.569271 333.289062,461.782183 333.289062,463.074763 L333.289062,469.237199 C333.289062,471.446338 331.498201,473.237199 329.289062,473.237199 C328.834755,473.237199 328.383768,473.159805 327.955454,473.008338 L250.644531,445.668462 L173.333608,473.008338 C172.905294,473.159805 172.454307,473.237199 172,473.237199 C169.790861,473.237199 168,471.446338 168,469.237199 L168,463.074763 C168,461.782183 168.624607,460.569271 169.676835,459.818552 L250.572202,402.103207 L250.572202,402 L250.644531,402.051604 L250.71686,402 L250.71686,402.103207 Z" fill="white"></path>
                </g>
            </svg>
        `
    }
]

populateHeartContent = () => {

}
