const menuBall = document.getElementById('menuBall');
const menuDrawer = document.getElementById('menuDrawer');
const menuItems = document.getElementsByClassName('menuItemConatiner');
const socialContainer = document.getElementById('socialContainer');
let lastScrollTop = 0;
const contents = document.getElementsByClassName("content");

//Click anywhere except on menu to close menuDrawer
document.addEventListener('click', (event) => {
  const e = event.target || event.srcElement;

  if (e !== menuBall && e !== menuDrawer &&
      e.parentElement !== menuBall && e.parentElement !== menuDrawer) {
    menuBall.classList.remove("open");
    menuDrawer.classList.remove("open");
    for(var i=0; i < menuItems.length; i++) {
      menuItems[i].classList.remove("open");
    }
    socialContainer.classList.remove("open");
  }
})

window.onload = () => {
  setTimeout( () => {
    menuBall.classList.remove("offScreen");
  }, 2500)

  initialAnimation();
  createPortfolioBoxes();
  createStars();
}

initialAnimation = () => {
  const kids = document.getElementById("initial").children;
  for(let i = 0; i < kids.length; i++) {
    kids[i].classList.add("in");
  }
}

var createSpans = num => {
  var spans = "";
  for(i=0; i<num; i++) {
    spans += "<span></span>"
  }
  return spans;
}

menuBall.innerHTML = createSpans(6);

menuBall.addEventListener("click", () => {
  menuBall.classList.toggle("open");
  menuDrawer.classList.toggle("open");
  for(var i=0; i < menuItems.length; i++) {
    menuItems[i].classList.toggle("open");
  }

  if (socialContainer.classList.contains("open")) {
    socialContainer.classList.remove("open");
  } else {
    setTimeout(() => {
      if (menuDrawer.classList.contains("open")) {
        socialContainer.classList.add("open");
      }
    }, 250)
  }
  checkLocationForMenu();
  //Scroll to location when menuItem is clicked
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", (event) => {
      let e = event.target || event.srcElement;
      if (e.textContent === "portfolio") {
        document.getElementById("portfolio").scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      } else if (e.textContent === "about me") {
        //TODO
      } else {
        //TODO
      }
    })
  }
});

checkLocationForMenu = () => {
  for(let i = 0; i < contents.length; i++) {
    console.log(contents[i].getBoundingClientRect());
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
    desc: "Sole UI Engineer for mobile app, designer, digital content creator, and developer for web app.",
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
    desc: "Full stack development of console for Witwars app allowing admin accounts to manage premises.",
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
    desc: "As a member of the Ottawa, IL Playgrounds & Recreation Board, I voluntarily built them a new website.",
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


//CANVAS ANIMATIONS FOR STARS, SHOOTINGSTARS, & PLANETS
const canvas = document.getElementById("stars");
const box = canvas.getBoundingClientRect();
canvas.width = box.width;
canvas.height = box.height;
let maxStarSize = 3;
let numStars = 500;

var c = canvas.getContext('2d');

function Star(x, y, size, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = Math.random() > 0.49 ? dy : -dy;

    this.draw = () => {
        c.beginPath();
        c.shadowBlur = this.size * 5;
        c.shadowColor = "white";
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

for (let i = 0; i < numStars; i++) {
  let x = Math.random() * box.width - 50;
  let y = Math.random() * box.height;
  let size = Math.random() * maxStarSize + 0.2;
  let dx = Math.random() * (size/3) + 1;
  let dy = Math.random() * (size/10);
  starArray.push(new Star(x, y, size, dx, dy));
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

function Planet(x, y, fill) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.dx = this.size;
    this.fill = fill;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
    }

    this.grow = (growth) => {
      this.size = growth;
      this.dx = growth/5;
      this.draw();
    }

    this.update = () => {
        this.x += this.dx;
        this.draw();
    }
}

let planetArray = [];
let planetGrow;
let growing = false;
let growth = 1;

document.getElementById("portfolioContainer").addEventListener("mousedown", (e) => {
    growing = true;
    let fill = randomGradient();
    planetArray.push(new Planet(e.x, e.y, fill));
    planetGrow = setInterval(() => {
        growth += (growth * 0.35);
    }, 1)
})

document.addEventListener("mouseup", () => {
    growing = false;
    growth = 1;
    clearInterval(planetGrow);
});

animate = () => {
    if (Math.random() < 0.5) {
        let x = -50;
        let y = Math.random() * box.height;
        let size = Math.random() * maxStarSize + 0.2;
        let dx = Math.random() * (size/3) + 0.5;
        let dy = Math.random() * (size/10);
        starArray.push(new Star(x, y, size, dx, dy));
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, box.width, box.height);

    if (shootingStarArray.length < 1) {
        if (Math.random() < 0.1) {
            let x = -50;
            let y = Math.random() * box.height;
            let size = Math.random() * maxStarSize + 2;
            let tailLen = Math.floor(size) * 60;
            let dx = Math.random() * (size) + 10;
            let d = Math.random() < 0.5 ? -6 : 6;
            let dy = Math.random() * (size * d);

            for (let i = 0; i < tailLen; i++) {
                let factor = (tailLen - i) / tailLen;
                let fill = "rgba(255, 255, 255, " + (factor/2) + ")";
                shootingStarArray.push(
                  new ShootingStar(x-(i * dx/8), y-(i * dy/8), size * factor, dx, dy, fill)
                );
            }
        }
    } else {
        for (let i = 0; i < shootingStarArray.length; i++) {
            shootingStarArray[i].update();
            if (i + 1 === shootingStarArray.length &&
                shootingStarArray[i].x > box.width) {
                  shootingStarArray = [];
            }
        }
    }


    for(let i = 0; i < starArray.length; i++) {
        starArray[i].update();
        starArray[i].x > box.width && starArray[i].pop;
    }

    if (planetArray.length > 0) {
        for (let i = 0; i < planetArray.length; i++) {
            if (i+1 === planetArray.length && growing) {
                planetArray[i].grow(growth);
            } else {
                planetArray[i].update();
                if (planetArray[i].x > box.width) {
                    planetArray[i].pop;
                }
            }
        }
    }
}

animate();

createStars = () => {


  // for(let i = 0; i < num; i++) {
  //   // const a = Math.random() * 2 * Math.PI;
  //   // const R = box.width >= box.height ? box.height : box.width;
  //   // const r = R * Math.sqrt(Math.random());
  //   // const y = r * Math.sin(a);
  //   // const x = r * Math.cos(a);
  //
  //   const x = canvas.width * Math.random();
  //   const y = canvas.height * Math.random();
  //
  //   c.beginPath();
  //   const size = Math.random() * 2;
  //   c.shadowBlur = size * 10;
  //   c.shadowColor = "white";
  //   c.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
  //   c.fillStyle = 'white';
  //   c.fill();
  //
  //
  // }
}

randomGradient = () => {

  var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];

  function populate(a) {
    for ( var i = 0; i < 6; i++ ) {
      var x = Math.round( Math.random() * 14 );
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

  var color1 = populate('#');
  var color2 = populate('#');
  var color3 = populate('#');
  var angle = Math.round( Math.random() * 360 );
  console.log("linear-gradient(" + angle + "deg, " + color1 + ", " + color2 + ", " + color3 + ")")
  return "linear-gradient(" + angle + "deg, " + color1 + ", " + color2 + ", " + color3 + ")";
}
