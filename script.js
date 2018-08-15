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
    }, 500)
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
