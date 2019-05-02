const menuBall = document.getElementById('menuBall');
const menuDrawer = document.getElementById('menuDrawer');
const menuItems = document.getElementsByClassName('menuItemConatiner');
const socialContainer = document.getElementById('socialContainer');
const contents = document.getElementsByClassName("content");
const aboutMe = document.getElementById("aboutMe");
const aboutMeMenu = document.getElementById("aboutMeMenu");
const initial = document.getElementById("initial");
const logo = document.getElementById("logo");
const pC = document.getElementById("portfolioContainer");

//Lock screen orientation to "portrait"
// let locOrientation = screen.lockOrientation ||
//                      screen.mozLockOrientation ||
//                      screen.msLockOrientation ||
//                      screen.orientation.lock;
// locOrientation('portrait');

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

let recentlyHighlighted = false;

highlightMenu = () => {
  if (!menuBall.classList.contains("highlight") && !recentlyHighlighted) {
    recentlyHighlighted = true;
    menuBall.classList.add("highlight");
    setTimeout(() => {
      menuBall.classList.remove("highlight");
    }, 900);
    setTimeout(() => recentlyHighlighted = false, 2500);
  }
}

closeMenu = () => {
  menuBall.classList.remove("open");
  menuDrawer.classList.remove("open");
  for(let i=0; i < menuItems.length; i++) {
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

    initialAnimation();
    createPortfolioBoxes();
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
    } else {
        let portfolio = document.getElementById("portfolio");
        if (document.querySelector(".profileMobile")) {
            document.querySelector(".profileMobile").remove();
        }
        while (portfolio.firstChild) {
            portfolio.removeChild(portfolio.firstChild);
        }
        eventListenersAttached = false;
        createPortfolioBoxes();
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

let createElem = (num, elem) => {
    let elems = "";
    for(i=0; i < num; i++) {
        elems += "<" + elem + "></" + elem + ">"
    }
    return elems;
}

// Create the spans for the menuBall
menuBall.innerHTML = createElem(6, "span");

// Create the divs for the aboutMeMenu & fill in text
aboutMeMenu.innerHTML = createElem(10, "div");
for(let i=0; i < aboutMeMenu.children.length; i++) {
    const text = ["DESK", "/", "HEAD", "/", "HEART"];
    const kids = aboutMeMenu.children;
    if (i < text.length) {
        kids[i].textContent = text[i];
        let id = text[i] === "/" ? "slash" : text[i].toLowerCase();
        kids[i].setAttribute("id", id);
        aboutMeMenu
    } else {
        let imgId = text[i-text.length] === "/" ?
                "slashImg" : text[i-text.length].toLowerCase()+"Img";
        kids[i].setAttribute("id", imgId);
        kids[i].classList.add("img1");
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
  for(let i=0; i < menuItems.length; i++) {
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
  let behave = { behavior: "smooth", block: "start" };

  logo.addEventListener("click", () => {
    initial.scrollIntoView(behave);
    closeMenu();
  })

  //Add event listeners to main menu items
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", (event) => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      starArray = [];
      cancelAnimationFrame(starsSparksAnimation);
      let e = event.target || event.srcElement;
      if (e.textContent === "portfolio") {
          createInitialStars();
          animate();
          pC.scrollIntoView(behave);
          let div = document.getElementsByClassName('portfolioMoreInfo')[0];
          if (div) {
            galleryIndex = 0;
            for(let i = 0; i < div.children.length; i++) {
                div.children[i].classList.remove("minimize");
                div.children[i].classList.remove("blur");
                if (div.children[i].querySelector(".infoSection")) {
                    div.children[i].querySelector(".infoSection").classList.remove("hide");
                }
            }
            if (document.querySelector(".detailedInfo")) {
              document.querySelector(".detailedInfo").remove();
            }
            for(let i = div.children.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    div.children[i].classList.remove("in");
                }, i * 100)
            }
            setTimeout(() => {
                div.remove();
            }, (div.children.length + 1) * 100)
          }
      } else if (e.textContent === "about me") {
          animate();
          let kids = aboutMeMenu.children;
          for(let i = 0; i < kids.length; i++) {
            kids[i].classList.remove("aBUp");
            kids[i].classList.remove("img1");
            kids[i].classList.remove("img2");
          }
          imgID = null;
          document.getElementById("aboutMe").scrollIntoView(behave);
          startAboutMeAnimations();
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
let portfolioItems = [
  {
    img: {
        name: "Fiveable",
        src: "img/fiveable.png"
    },
    tech: ["React", "React-Native", "Redux", "Router-Flux", "React-Router-DOM", "Firebase", "Braintree"],
    desc: "Sole front-end developer for React and React-Native platform. Built backend on Firebase using Braintree for payment processing.",
    btn: {
        text: "More Info",
        name: "fiveable"
    }
  },
  {
    img: {
        name: "Witwars",
        src: "img/witwars.png"
    },
    tech: ["React-Native", "Redux", "Router-Flux", "Node.js", "Express", "Pug", "CSS", "jQuery", "AdMob"],
    desc: "Co-founder, front-end developer, designer, content creator, and marketing strategist.",
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
    desc: "Designed and built website and online marketing strategy, plus created most video, written, and graphic content.",
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
        name: "admin"
    }
  },
  // {
  //   img: {
  //       name: "Ottawa Recreation",
  //       src: "img/ottawa_rec.png"
  //   },
  //   tech: ["Wordpress", "HTML", "CSS"],
  //   desc: "As a member of the Ottawa, IL Playgrounds & Recreation Board, I voluntarily built them a new website, but do not maintain it regularly.",
  //   btn: {
  //       text: "Visit Site",
  //       link: "http://www.ottawarecreation.org"
  //   }
  // }
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

  // Add events to portfolio box buttons
  let btns = p.querySelectorAll(".portfolioBtn");
  for (let j = 0; j < btns.length; j++) {
      const desc = btns[j].parentElement.parentElement
                    .querySelector(".portfolioDesc").textContent;
      const index = portfolioItems.findIndex( p => p.desc === desc );
      btns[j].addEventListener("click", () => {
          if (portfolioItems[index].btn.link) {
              openInNewTab(portfolioItems[index].btn.link);
          } else {
              if (portfolioItems[index].btn.name === "witwars") {
                  populateMoreInfo(witwarsInfo);
              } else if (portfolioItems[index].btn.name === "admin") {
                  populateMoreInfo(adminConsoleInfo);
              } else if (portfolioItems[index].btn.name === "fiveable") {
                  populateMoreInfo(fiveableInfo);
              }
          }
      })
  }

  createPortfolioBoxEventListeners();
}

let badgeHeight = window.innerWidth < 580 ? 28 : 40;

const fiveableInfo = [
  {
    name: "Web App",
    desc: "Mobile-friendly React app.",
    id: "5web",
    statements: [
      "Web app built on React.",
      "Global state managed with Redux.",
      "Persistance managed with Redux-Persist.",
      "Navigation structure uses React-Router-DOM.",
      "Maintained with error boundaries.",
      "Built to accommodate all screen sizes.",
      "Integrated with Firebase, Braintree, and Google Analytics.",
      "Embedded Vimeo and Crowdcast for live and recorded events.",
      "Built using custom and Material UI."
    ],
    bgImage: "./img/fiveableWebBg.jpg",
    images: [
      "img/5web1.jpg",
      "img/5web2.jpg",
      "img/5web3.jpg",
    ],
    // TODO: Add linked app store badges
    extraHTML: `
      <p>Check it out at <a target="_blank" href="https://app.fiveable.me/">app.fiveable.me</a>!</p>
    `
  },
  {
    name: "Mobile App",
    desc: "Available on iOS & Android",
    id: "5mobile",
    statements: [
      "Built for iOS & Android with React-Native.",
      "Global state managed with Redux.",
      "Persistance managed with Redux-Persist.",
      "Navigation structure uses React-Native-Router-Flux.",
      "Scaling functions used to accommodate all screen sizes.",
      "Integrated with Firebase, Cloud Messaging, and Firebase Analytics."
    ],
    bgImage: "img/fiveableMobileBg.jpg",
    images: [
      "img/5mobile1.jpg",
      "img/5mobile2.jpg",
      "img/5mobile3.jpg",
    ],
    extraHTML: `
    <p>Download Fiveable today!</p>
    <div class="appStoreBadges">
      <a target="_blank" href="https://itunes.apple.com/us/app/fiveable/id1451826219?ls=1&mt=8">
        <img src="img/apple_app_store_badge.png" height="`+ badgeHeight +`">
      </a>
      <a target="_blank" href="https://play.google.com/store/apps/details?id=com.fiveableapp">
        <img src="img/google_play_badge.png" height="`+ badgeHeight +`">
      </a>
    </div>
    `
  },
  {
    name: "Firebase",
    desc: "A secure and scalable backend.",
    id: "5firebase",
    statements: [
      "Architecture uses Firestore and Real-Time DB.",
      "Singular and hooked updates to both databases.",
      "Secure, scalable, and balanced.",
      "Google, Facebook, and email authentication.",
      "Scalable custom algorithms using Functions.",
      "Crashlytics used for mobile maintenance.",

    ],
    bgImage: "./img/firebaseBg.jpeg",
    images: [
      "img/firebase1.jpg",
      "img/firebase2.jpg",
    ]
  }
];

const witwarsInfo = [
  {
    name: "Mobile App",
    desc: "Available on iOS & Android.",
    id: "wwInfoMobile",
    statements: [
      "Sole developer from init to app stores.",
      "Global state managed with Redux.",
      "Persistance managed with AsyncStorage.",
      "Navigation structure uses React-Native-Router-Flux.",
      "Experience setting up and using the Facebook SDK.",
      "Scaling functions used to accommodate all screen sizes.",
      "Works with a RESTful API.",
      "Integrated AdMob banner and insterstitial ads.",
      "Runs background tasks for local push notifications."
    ],
    bgImage: "./img/mobileAppBg1.jpg",
    images: [
      "img/mobileApp1.png",
      "img/mobileApp2.png",
      "img/mobileApp3.png",
    ],
    // TODO: Add linked app store badges
    extraHTML: `
      <p>Download Witwars today!</p>
      <div class="appStoreBadges">
        <a target="_blank" href="https://itunes.apple.com/us/app/witwars/id1363163894?ls=1&mt=8">
          <img src="img/apple_app_store_badge.png" height="`+ badgeHeight +`">
        </a>
        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.witwarsapp">
          <img src="img/google_play_badge.png" height="`+ badgeHeight +`">
        </a>
      </div>
    `
  },
  {
    name: "Web App",
    desc: "Tool converting users to mobile.",
    id: "wwInfoWeb",
    statements: [
      "An entry version of the game, used mostly as a landing page.",
      "Also, used to handle forgetten passwords and war sharing.",
      "Works with a RESTful API.",
      "Uses Express and renders via Pug (formerly Jade).",
      "Co-developed web app with former business partner.",
      "Priority was to get users on the mobile app by offering limited features."
    ],
    bgImage: "img/witwarsWebBg.jpg",
    images: [
      "img/witwarsWeb2.png",
      "img/witwarsWeb3.png",
      "img/witwarsWeb4.png",
    ],
    extraHTML: `
      <p>Check it out at <a target="_blank" href="https://www.witwars.com/">www.witwars.com</a>!</p>
    `
  },
  {
    name: "Design",
    desc: "Sketch & GIMP used for all assets.",
    id: "wwInfoDesign",
    statements: [
      "Sole designer.",
      "Prototyped mobile and web apps prior to development.",
      "Designed the logo and most in-game assets.",
    ],
    bgImage: "./img/designBg.jpg",
    images: [
      "img/witwars_design_1.jpg",
      "img/witwars_design_2.jpg"
    ]
  },
  {
    name: "Everything Else",
    desc: "An array of other necessary work.",
    id: "wwInfoEE",
    statements: [
      "Write or approve all public premises.",
      "Wrote, animated, voiced, and edited the explainer video.",
      "Implement and maintain all marketing strategy."
    ],
    bgImage: "./img/eElseBg.jpg",
    video: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/j8ePo-VeOSo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  }
];

const adminConsoleInfo = [
  {
    name: "Front End",
    desc: "React, React Router DOM, Redux",
    id: "adminInfoFE",
    statements: [
      "React-Router-DOM",
      "Redux, Thunk",
      "Styled-Components",
      "All premise and user mangement needs in one place.",
      "Allows admin to navigate without losing current work.",
      "Duplicates custom components for efficient building."

    ],
    bgImage: "img/admin_frontend.jpg",
    images: [
      "img/witwars_admin_1.jpg",
      "img/witwars_admin_2.jpg",
      "img/witwars_admin_3.jpg",
    ],
    extraHTML: `

    `
  },
  {
    name: "Back End",
    desc: "Express, Sequelize, Postgres",
    id: "adminInfoBE",
    statements: [
      "Express, Axios",
      "Sequilize, Postgres",
      "Nodemailer, AWS SES",
      "Receives and handles requests from front-end.",
      "Database management made simple.",
      "Custom mass emails sent inexpensively."
    ],
    bgImage: "img/admin_backend.jpg",
    images: [
      "img/witwars_admin_backend_1.jpg",
      "img/witwars_admin_backend_2.jpg"
    ],
    extraHTML: `

    `
  },
  {
    name: "Uses",
    desc: "Manage premises, mass emails, and social media images.",
    id: "adminInfoU",
    statements: [
      "Create premises and fills for variable premises.",
      "Generate premises to be used in game.",
      "Send premises to main database and record them locally.",
      "View premises of all statuses within main database.",
      "Snap an image of the daily winner to share socially.",
      "Send out mass emails to all subscribed users."
    ],
    bgImage: "img/admin_uses.jpg",
    images: [
      "img/witwars_admin_uses_1.jpg",
      "img/witwars_admin_uses_2.jpg"
    ]
  }
];

let galleryIndex = 0;

populateMoreInfo = (data) => {
    let div = document.createElement('div');
    div.className = 'portfolioMoreInfo';

    let closeIcon = document.createElement('i');
    closeIcon.className = "moreInfoClose icon ion-md-close";
    div.appendChild(closeIcon);
    closeIcon.addEventListener("click", (e) => {
        if (e.target.classList.contains("minimize") ||
            e.srcElement.classList.contains("minimize")) {
              galleryIndex = 0;
              for(let i = 0; i < div.children.length; i++) {
                  div.children[i].classList.remove("minimize");
                  div.children[i].classList.remove("blur");
                  if (div.children[i].querySelector(".infoSection")) {
                      div.children[i].querySelector(".infoSection").classList.remove("hide");
                  }
              }
              document.querySelector(".detailedInfo").remove();
        } else {
            for(let i = div.children.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    div.children[i].classList.remove("in");
                }, i * 100)
            }
            setTimeout(() => {
                div.remove();
            }, (div.children.length + 1) * 100)
        }
    });

    for(let i = 0; i < data.length; i++) {
        let bgNode = document.createElement('div');
        bgNode.className = 'infoSectionBg';
        bgNode.setAttribute("style",
            "background-image: url(" + data[i].bgImage + ")");

        let node = document.createElement('div');
        node.className = 'infoSection';
        node.id = data[i].id;

        node.innerHTML = `
            <div class="infoSectionText">
                <h2>`+ data[i].name +`</h2>
                <p>`+ data[i].desc +`</p>
            </div>
            <span><p>Click/tap for more info.</p></span>
        `

        bgNode.appendChild(node);
        div.appendChild(bgNode);

        setTimeout(() => {
            bgNode.classList.add("in");
            if (i === data.length-1) {
                closeIcon.classList.add("in");
            }
        }, (i + 1) * 100);

        bgNode.addEventListener("click", () => {
            for(let j = 0; j < div.children.length; j++) {
                if (bgNode !== div.children[j]) {
                    div.children[j].classList.add("minimize");
                } else {
                    div.children[j].children[0].classList.add("hide");

                    detailedInfo = document.createElement('div');
                    detailedInfo.className = 'detailedInfo';

                    detailedInfoGallery = document.createElement('div');

                    if (!data[i].images && data[i].video) {
                      detailedInfoGallery.className = 'videoGallery'
                      detailedInfoGallery.innerHTML = `
                        <div class='videoContainer'>
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/j8ePo-VeOSo"
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
                          picture-in-picture" allowfullscreen></iframe>
                        </div>
                      `
                    } else {
                      data[i].images.forEach((img, index) => {
                        let div = document.createElement('div');
                        div.id = "preload-" + i + index;
                        div.style = 'background: url(' + img + ') no-repeat -9999px -9999px';
                        console.log(div);
                      })
                      detailedInfoGallery.className = 'detailedInfoGallery';
                      let iLeft = document.createElement('i');
                        iLeft.className = "icon ion-md-arrow-dropleft hidden";
                        detailedInfoGallery.appendChild(iLeft);
                      let galleryImg = document.createElement('img');
                        galleryImg.src = data[i].images[galleryIndex];
                        galleryImg.style = "max-height:" + pC.offsetHeight * 0.5 + "px; max-width:" + pC.offsetWidth * 0.9 + "px";
                        detailedInfoGallery.appendChild(galleryImg);
                      let iRight = document.createElement('i');
                        iRight.className = "icon ion-md-arrow-dropright"
                        detailedInfoGallery.appendChild(iRight);

                      iLeft.addEventListener("click", () => moveLeft());

                      iRight.addEventListener("click", () => moveRight());

                      let touchStart = 0;
                      let touchEnd = 0;

                      galleryImg.addEventListener("touchstart", (e) => {
                        touchStart = e.changedTouches[0].screenX;
                      })
                      galleryImg.addEventListener("touchmove", (e) => {
                        console.log(e.changedTouches[0].screenX - touchStart)
                        let change = e.changedTouches[0].screenX - touchStart;
                        let halfWidth = window.innerWidth / 2;
                        galleryImg.style.transform = 'translateX(' + change + 'px) rotate(' + (change/halfWidth) * 20 + 'deg)'
                      })
                      galleryImg.addEventListener("touchend", (e) => {
                        touchEnd = e.changedTouches[0].screenX;
                        handleSwipe();
                      })

                      handleSwipe = () => {
                        console.log(touchStart, touchEnd)
                        if (touchEnd - 65 > touchStart && galleryIndex !== 0) {
                          moveLeft();
                        } else if (touchEnd + 65 < touchStart && galleryIndex !== data[i].images.length - 1) {
                          moveRight();
                        } else {
                          touchStart = 0;
                          touchEnd = 0;
                          galleryImg.style.transform = 'translateX(0px) rotate(0deg)';
                        }
                      }

                      let moveRight = () => {
                        galleryIndex++;
                        iLeft.classList.remove("hidden");
                        if (galleryIndex === data[i].images.length - 1) {
                            iRight.classList.add("hidden");
                        }
                        galleryImg.style.transform = 'translateX(' + window.innerWidth * -1 + 'px) rotate(-25deg)';
                        galleryImg.style.opacity = 0;
                        setTimeout(() => {
                          galleryImg.style.transform = 'translateX(' + window.innerWidth + 'px) rotate(25deg)';
                          setTimeout(() => {
                            galleryImg.style.opacity = 1;
                            galleryImg.src = data[i].images[galleryIndex];
                            galleryImg.style.transform = 'translateX(0px) rotate(0deg)';
                            touchStart = 0;
                            touchEnd = 0;
                          }, 150)
                        }, 150)
                      }

                      let moveLeft = () => {
                        galleryIndex--;
                        iRight.classList.remove("hidden");
                        if (galleryIndex === 0) {
                            iLeft.classList.add("hidden");
                        }
                        galleryImg.style.transform = 'translateX(' + window.innerWidth + 'px) rotate(25deg)';
                        galleryImg.style.opacity = 0;
                        setTimeout(() => {
                          galleryImg.style.transform = 'translateX(' + window.innerWidth * -1 + 'px) rotate(-25deg)';
                          setTimeout(() => {
                            galleryImg.style.opacity = 1;
                            galleryImg.src = data[i].images[galleryIndex];
                            galleryImg.style.transform = 'translateX(0px) rotate(0deg)';
                            touchStart = 0;
                            touchEnd = 0;
                          }, 300)
                        }, 300)
                      }
                    }


                    detailedInfoStatements = document.createElement('div');
                    detailedInfoStatements.className = 'detailedInfoStatements';
                    let statementsArray = data[i].statements.map( (text, index) => {
                        let textNode = document.createElement('div');
                        textNode.className = "infoStatement";
                        textNode.innerHTML = text;

                        return textNode;
                    });

                    for (let a = 0; a < statementsArray.length; a++) {
                        detailedInfoStatements.appendChild(statementsArray[a]);
                        setTimeout(() => statementsArray[a].classList.add("in"), (a + 1) * 50);
                    }

                    detailedInfo.appendChild(detailedInfoGallery);
                    detailedInfo.appendChild(detailedInfoStatements);
                    if (data[i].extraHTML) {
                        detailedInfoExtra = document.createElement('div');
                        detailedInfoExtra.className = 'detailedInfoExtra';
                        detailedInfoExtra.innerHTML = data[i].extraHTML;
                        detailedInfo.appendChild(detailedInfoExtra);
                    }
                    bgNode.classList.add("blur");
                    div.appendChild(detailedInfo);

                    let dIs = detailedInfo.children;

                    for(let x = 0; x < dIs.length; x++) {
                        setTimeout(() => {
                            dIs[x].classList.add("in");
                        }, 300 * (x + 1));
                    }
                }
            }
        })

    }

    pC.appendChild(div);
}

const imageGalleryMove = (num, index, arr, img) => {
    let newNum = index + num;
    img.src = arr[newNum];
    if (arr.length - 1 === newNum) {

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
  let e = event.target || event.srcElement;

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

createPortfolioBoxEventListeners = () => {
    let events = [
        ['mouseover', openPortfolioBox],
        ['mouseleave', closePortfolioBox],
        ['touchstart', openPortfolioBox]
    ];
    setTimeout(() => {
        portfolioBoxes = document.querySelectorAll(".portfolioBox");
        for (let i=0; i < portfolioBoxes.length; i++) {
            events.forEach( evt => {
                portfolioBoxes[i].addEventListener(evt[0], e => evt[1](e));
            })
        }
    }, 1000)
}

let pBIndex = 0;
let eventListenersAttached = false;
let pBTouchStart = 0;
let pBTouchEnd = 0;
let pBTXArray = [];

arrangePortfolioForMobile = () => {
    pBIndex = 0;

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

    if (!eventListenersAttached) {
        for(let i = 0; i < portfolioBoxes.length; i++) {
            portfolioBoxes[i].addEventListener("touchstart", (e) => {
                for(let j = 0; j < portfolioBoxes.length; j++) {
                  let tX = portfolioBoxes[j].style.getPropertyValue("transform").split('translateX(')[1].split('px')[0];
                  pBTXArray[j] = tX;
                }
                pBIndex = i;
                // portfolioBoxCarousel();
                pBTouchStart = e.changedTouches[0].screenX;
                closePortfolioBox(e);
                //TODO make sure this is working
            })

            portfolioBoxes[i].addEventListener("touchmove", (e) => {
                closePortfolioBox(e);
                let change = e.changedTouches[0].screenX - pBTouchStart;
                for(let j = 0; j < portfolioBoxes.length; j++) {
                  let tX = parseFloat(pBTXArray[j]) + parseFloat(change);
                  portfolioBoxes[j].style.transform = 'translateX(' + tX + 'px)'
                }
            })

            portfolioBoxes[i].addEventListener("touchend", (e) => {
                pBTouchEnd = e.changedTouches[0].screenX;
                if (pBTouchEnd - 65 > pBTouchStart) {
                    if (pBIndex !== 0) {
                        pBIndex--;
                        portfolioBoxCarousel();
                    }
                } else if (pBTouchEnd + 65 < pBTouchStart) {
                    if (pBIndex !== portfolioBoxes.length - 1) {
                        pBIndex++;
                        portfolioBoxCarousel();
                    }
                }
                portfolioBoxCarousel();
                pBTXArray = [];
                pBTouchStart = 0;
                pBTouchEnd = 0;
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
        eventListenersAttached = true;
    }

    createPortfolioBoxEventListeners();
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

//TODO: CREATE SAY HELLO CONTACT FORM LOAD ANIMATIONS

//CANVAS ANIMATIONS FOR STARS, SHOOTINGSTARS, & PLANETS
const canvas = document.getElementById("stars");
const box = canvas.getBoundingClientRect();
canvas.width = box.width;
canvas.height = box.height;
let maxStarSize = 2.8;
let numStars = 200;

let c = canvas.getContext('2d');

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

pC.addEventListener("mousedown", (e) => {
    growPlanet(e, false);
})

pC.addEventListener("touchstart", (e) => {
    growPlanet(e, true);
})

growPlanet = (e, touch) => {
    planetInstructions.textContent = "Drag right to increase the planet's speed.";
    if (e.button === 0 || touch) {
        growing = true;
        onDown = touch ? e.changedTouches[0] : e;
        growth > 5 ? growth = 5 : null;
        let x = touch ? e.changedTouches[0].pageX : e.pageX;
        let y = touch ? e.changedTouches[0].pageY - initial.offsetHeight : e.pageY - pC.clientHeight;
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

let starsSparksAnimation;

animate = () => {
    starsSparksAnimation = requestAnimationFrame(animate);

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

  let hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

  function populate(a) {
    for ( let i = 0; i < 6; i++ ) {
      let x = Math.round( Math.random() * 14 );
      let y = hexValues[x];
      a += y;
    }
    return a;
  }

  return populate("#");
}


// Add event listeners to About Me menu items and animate lightning
const aBKids = document.getElementById("aboutMeMenu").children;
for (let i=0; i < aBKids.length; i++) {
    //TODO: Figure out why I have this if(true) statement
    if (true) {
        aBKids[i].addEventListener("click", (e) => {
            let theoryKids = document.getElementById("theory").children;
            for(let i = 0; i < theoryKids.length; i++) {
                theoryKids[i].classList.remove("in");
            }
            document.getElementById("menuArrow").classList.remove("in");

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
              canvas3.style.height = "50vh";
              canvas3.parentNode.style.height = "50vh";
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

startAboutMeAnimations = () => {
    canvas2.classList.remove("grayBg");
    let initContain = document.getElementById("initialContainer");

    let aBKids = initContain.parentNode.children;
    for(let i = 0; i < aBKids.length; i++) {
        if (aBKids[i].classList.contains("appear")) {
            aBKids[i].classList.remove("appear");
            aBKids[i].classList.add("hidden");
        }
    }

    initContain.classList.remove("hidden");

    aboutMe.setAttribute("style", "background-image: url(./img/einstein.jpg)");

    setTimeout(() => {
        initContain.classList.add("appear");
        let theoryKids = document.getElementById("theory").children;
        for(let i = 0; i < theoryKids.length; i++) {
            theoryKids[i].classList.add("in");
        }
        document.getElementById("menuArrow").classList.add("in");
        positionDivAboveAboutMeMenu();
    }, 500);
}

positionDivAboveAboutMeMenu = () => {
    const menuArrow = document.getElementById("menuArrow");
    const parent = menuArrow.parentNode;
    const text = menuArrow.children[0];
    const icon = menuArrow.children[1];

    let contentBottom = window.innerHeight - parent.offsetHeight - parent.offsetTop;
    let aBMenuTop = window.innerHeight - aboutMeMenu.offsetTop;
    let left = aboutMeMenu.offsetLeft - parent.offsetLeft;
    let bottom = aBMenuTop - contentBottom + 15;
    let center = aboutMeMenu.offsetLeft + aboutMeMenu.clientWidth/2;

    menuArrow.style.left = left + "px";
    menuArrow.style.bottom = bottom + "px";
    menuArrow.style.width = aboutMeMenu.clientWidth + "px";
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
      setTimeout(() => {
          canvas3.style.height = 0;
          canvas3.parentNode.style.height = 0;
      }, 1500)
      let heartNode = document.getElementById("heartContainer");
      while (heartNode.firstChild) {
          heartNode.removeChild(heartNode.firstChild);
      }
      if (document.getElementById("heartContainer").children.length === 0) {
          populateHeartContent();
      }
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
            <code>I've received no formal education in my development journey. Special thanks to Codecademy, Derrick Bannas, YouTube, GitHub, StackOverflow, the React-Native community, and &lt;<span class="htmlTag">em</span>&gt;my patient wife&lt;/<span class="htmlTag">em</span>&gt;.<br/></code>
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
              react: <span class="cssPerc">90%</span>;<br/>
              firebase: <span class="cssPerc">90%</span>;<br/>
              javascript: <span class="cssPerc">90%</span>;<br/>
              css: <span class="cssPerc">90%</span>;<br/>
              redux: <span class="cssPerc">85%</span>;<br/>
              html: <span class="cssPerc">80%</span>;<br/>
              wordpress: <span class="cssPerc">75%</span>;<br/>
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
    for(let i = 0; i < formKids.length - 1; i++) {
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
        name: "Exercise",
        id: "exercise",
        svg: `
            <svg id="exercise" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M280.103529,280.563232 L396.269147,333.15402 C398.057838,333.9638 399.207017,335.745519 399.207017,337.708975 L399.207017,453.132547 C399.207017,455.893971 396.96844,458.132547 394.207017,458.132547 C393.704596,458.132547 393.205046,458.056822 392.725197,457.907922 L341.372584,441.972978 C339.280377,441.323757 337.854404,439.388223 337.854404,437.197603 L337.854404,373.06098 C337.854404,370.893732 336.458188,368.973229 334.396608,368.304762 L242.724254,338.580001 L193.949709,430.590047 C193.359138,431.704121 192.369447,432.553925 191.17888,432.969237 L88.6468529,468.73603 C86.0395145,469.645562 83.1885281,468.269218 82.2789963,465.66188 C82.0943145,465.132456 82,464.575738 82,464.015027 L82,419.651463 C82,417.656841 83.1854972,415.853031 85.0164474,415.061744 L157.670321,383.662701 C158.934809,383.116223 159.917822,382.072273 160.387353,380.777242 L192.937787,290.998644 C192.999874,290.8274 193.071272,290.659676 193.151662,290.496224 L240.568133,194.087186 C240.755589,193.706042 240.990847,193.350339 241.268224,193.028668 L282.182008,145.581345 C282.237743,145.516709 282.295125,145.45351 282.354096,145.391812 L318.107889,107.984227 C319.549295,106.476149 321.775525,106.021475 323.692837,106.843586 L363.986128,124.120658 C366.524083,125.20889 367.699316,128.148496 366.611084,130.686451 C366.563641,130.797097 366.512217,130.905994 366.456914,131.012927 C359.110638,145.217457 355.4375,157.043877 355.4375,166.492188 C355.4375,176.37404 359.45546,194.958401 367.49138,222.245272 C368.271479,224.894221 371.051278,226.409214 373.700226,225.629105 C373.787466,225.603413 373.873989,225.575346 373.959699,225.544934 L423.544325,207.951188 C426.002666,207.078913 428.71851,208.24307 429.781938,210.624965 L440.475545,234.576801 C441.581742,237.054491 440.509882,239.962262 438.060209,241.12919 L349.325108,283.399111 C346.832093,284.586685 343.848385,283.528417 342.66081,281.035401 C342.622415,280.9548 342.586185,280.873185 342.55216,280.790644 L323.832876,235.379435 C322.780477,232.826414 319.857706,231.60992 317.304685,232.662319 C316.481915,233.001479 315.764576,233.554089 315.226723,234.263098 L280.103529,280.563232 Z M366.679612,110.359224 C344.765167,110.359224 327,92.5940563 327,70.6796118 C327,48.7651673 344.765167,31 366.679612,31 C388.594056,31 406.359224,48.7651673 406.359224,70.6796118 C406.359224,92.5940563 388.594056,110.359224 366.679612,110.359224 Z" id="Combined-Shape" fill="#484a46"></path>
                    <rect fill="#484a46" x="60" y="111" width="196" height="12" rx="6"></rect>
                    <rect fill="#484a46" x="60" y="148" width="169" height="12" rx="6"></rect>
                    <rect fill="#484a46" x="60" y="185" width="135" height="12" rx="6"></rect>
                </g>
            </svg>
        `,
        text: [
            "Exercise sustains my health, confidence, energy, focus, and wild animal instincts.",
            "I prefer playing basketball or tennis, but a lack of time and friends sometimes forces me to run.",
            "Lunch time workouts increase my daily productivity."
        ]
    },
    {
        name: "Cooking",
        id: "cooking",
        svg: `
            <svg id="cooking" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M294.455102,350.46052 C293.105441,356.387881 290.732835,360.503883 287.982964,361.102084 L287.982964,415.241882 C287.982964,422.973868 281.71495,429.241882 273.982964,429.241882 L47.8231685,429.241882 C40.091182,429.241882 33.8231685,422.973868 33.8231685,415.241882 L33.8231685,313.565722 L24.8036245,299.63634 C23.3027252,297.318418 23.965053,294.222651 26.282975,292.721752 C27.0924517,292.1976 28.0362348,291.918721 29.0005935,291.918721 L290.200395,291.918721 C292.961819,291.918721 295.200395,294.157297 295.200395,296.918721 C295.200395,297.646141 295.041675,298.364801 294.73531,299.024558 L287.982964,313.565722 L287.982964,317.0704 C290.274414,317.568877 292.303899,320.510037 293.697815,324.906499 L466.810378,288.110288 C469.511458,287.536156 472.166542,289.260388 472.740674,291.961468 L475.960442,307.109282 C476.534574,309.810362 474.810342,312.465446 472.109262,313.039578 L296.28346,350.412506 C295.663376,350.544309 295.045717,350.554984 294.455102,350.46052 Z" fill="#484a46"></path>
                    <path d="M99.9434066,71 L104.072224,71 C105.828435,71 107.252125,72.4236901 107.252125,74.1799009 C107.252125,74.8284043 107.053847,75.461405 106.683878,75.9940212 C98.0017457,88.4930327 95.0079373,100.67797 97.7024481,112.548828 C102.280725,132.71875 124.630925,172.837891 124.630925,205.558594 C124.630925,226.656963 120.206434,247.755332 111.357453,268.853702 L111.35746,268.853705 C110.812118,270.153949 109.539819,271 108.129843,271 L103.937026,271.000002 C102.004028,271.000002 100.437024,269.432998 100.437024,267.5 C100.437024,266.931116 100.575692,266.370806 100.841021,265.867587 C107.724798,252.811941 111.166687,232.708943 111.166687,205.558594 C111.166687,159.053711 88.750882,128.242887 87.1804988,112.548828 C86.1754912,102.505007 89.367355,89.3400502 96.7560901,73.0539577 L96.756098,73.0539613 C97.3235234,71.8032542 98.5700022,71 99.9434066,71 Z" fill="#484a46"></path>
                    <path d="M148.943407,74 L153.072224,74 C154.828435,74 156.252125,75.4236901 156.252125,77.1799009 C156.252125,77.8284043 156.053847,78.461405 155.683878,78.9940212 C147.001746,91.4930327 144.007937,103.67797 146.702448,115.548828 C151.280725,135.71875 173.630925,175.837891 173.630925,208.558594 C173.630925,229.656963 169.206434,250.755332 160.357453,271.853702 L160.35746,271.853705 C159.812118,273.153949 158.539819,274 157.129843,274 L152.937026,274.000002 C151.004028,274.000002 149.437024,272.432998 149.437024,270.5 C149.437024,269.931116 149.575692,269.370806 149.841021,268.867587 C156.724798,255.811941 160.166687,235.708943 160.166687,208.558594 C160.166687,162.053711 137.750882,131.242887 136.180499,115.548828 C135.175491,105.505007 138.367355,92.3400502 145.75609,76.0539577 L145.756098,76.0539613 C146.323523,74.8032542 147.570002,74 148.943407,74 Z" fill="#484a46"></path>
                    <path d="M197.943407,74 L202.072224,74 C203.828435,74 205.252125,75.4236901 205.252125,77.1799009 C205.252125,77.8284043 205.053847,78.461405 204.683878,78.9940212 C196.001746,91.4930327 193.007937,103.67797 195.702448,115.548828 C200.280725,135.71875 222.630925,175.837891 222.630925,208.558594 C222.630925,229.656963 218.206434,250.755332 209.357453,271.853702 L209.35746,271.853705 C208.812118,273.153949 207.539819,274 206.129843,274 L201.937026,274.000002 C200.004028,274.000002 198.437024,272.432998 198.437024,270.5 C198.437024,269.931116 198.575692,269.370806 198.841021,268.867587 C205.724798,255.811941 209.166687,235.708943 209.166687,208.558594 C209.166687,162.053711 186.750882,131.242887 185.180499,115.548828 C184.175491,105.505007 187.367355,92.3400502 194.75609,76.0539577 L194.756098,76.0539613 C195.323523,74.8032542 196.570002,74 197.943407,74 Z" fill="#484a46"></path>
                    <path d="M347.259645,116.112087 C335.110805,111.101912 326.259645,95.6293154 326.259645,77.3185627 C326.259645,54.9510303 339.467245,36.8185627 355.759645,36.8185627 C372.052046,36.8185627 385.259645,54.9510303 385.259645,77.3185627 C385.259645,95.1230565 376.891157,110.244164 365.259645,115.672688 L365.259645,292.818563 C365.259645,296.684556 362.125639,299.818563 358.259645,299.818563 L354.259645,299.818563 C350.393652,299.818563 347.259645,296.684556 347.259645,292.818563 L347.259645,116.112087 Z" fill="#484a46" transform="translate(355.759645, 168.318563) scale(-1, -1) rotate(51.000000) translate(-355.759645, -168.318563) "></path>
                </g>
            </svg>
        `,
        text: [
            "My daily stress relief. Mangia mangia!",
            "I'm confident in Italian, Mexican, and American dishes. Also, I'm partially-married to olive oil.",
            "In cooking, I get to learn, experiment, and enjoy...except when I cook fish."
        ]
    },
    {
        name: "Video Games",
        id: "videoGames",
        svg: `
            <svg id="videoGames" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M135.143921,174.309189 L135.143921,158.081541 C135.143921,155.872402 133.35306,154.081541 131.143921,154.081541 L122.961802,154.081541 C120.752663,154.081541 118.961802,155.872402 118.961802,158.081541 L118.961802,174.309189 L102.734154,174.309189 C100.525015,174.309189 98.7341543,176.10005 98.7341543,178.309189 L98.7341543,186.491308 C98.7341543,188.700447 100.525015,190.491308 102.734154,190.491308 L118.961802,190.491308 L118.961802,206.718956 C118.961802,208.928095 120.752663,210.718956 122.961802,210.718956 L131.143921,210.718956 C133.35306,210.718956 135.143921,208.928095 135.143921,206.718956 L135.143921,190.491308 L151.371569,190.491308 C153.580708,190.491308 155.371569,188.700447 155.371569,186.491308 L155.371569,178.309189 C155.371569,176.10005 153.580708,174.309189 151.371569,174.309189 L135.143921,174.309189 Z M379.882472,304.974767 C336.351146,311.074922 293.056989,314.125 250,314.125 C207.049194,314.125 164.239094,311.089947 121.569701,305.019842 C104.237868,365.713016 77.1704164,407.639389 55.502788,403.427628 C29.6514359,398.402635 21.2758707,329.604942 36.7954396,249.763682 C50.1674555,180.970624 76.9160671,126.424621 100.598979,115.860356 C102.632775,114.072331 105.194711,112.863283 108.036749,112.494178 C154.566755,106.451184 201.887839,103.429687 250,103.429687 C298.06387,103.429687 344.207831,106.445122 388.431883,112.475991 C390.12733,112.7072 391.722941,113.237867 393.164868,114.012753 C418.401783,114.993151 449.275824,172.384848 463.761017,246.904702 C478.973665,325.166991 470.349291,392.684675 444.497939,397.709669 C423.264508,401.837029 397.013357,362.520403 379.882472,304.974767 Z M190.047537,287.006085 C205.368344,287.006085 217.788311,274.586118 217.788311,259.265311 C217.788311,243.944504 205.368344,231.524536 190.047537,231.524536 C174.72673,231.524536 162.306763,243.944504 162.306763,259.265311 C162.306763,274.586118 174.72673,287.006085 190.047537,287.006085 Z M309.101694,287.006085 C324.422501,287.006085 336.842469,274.586118 336.842469,259.265311 C336.842469,243.944504 324.422501,231.524536 309.101694,231.524536 C293.780887,231.524536 281.36092,243.944504 281.36092,259.265311 C281.36092,274.586118 293.780887,287.006085 309.101694,287.006085 Z M367.472907,171.419525 C373.537393,171.419525 378.45363,166.503288 378.45363,160.438802 C378.45363,154.374316 373.537393,149.458079 367.472907,149.458079 C361.408421,149.458079 356.492184,154.374316 356.492184,160.438802 C356.492184,166.503288 361.408421,171.419525 367.472907,171.419525 Z M389.434354,193.380972 C395.49884,193.380972 400.415077,188.464734 400.415077,182.400248 C400.415077,176.335762 395.49884,171.419525 389.434354,171.419525 C383.369868,171.419525 378.45363,176.335762 378.45363,182.400248 C378.45363,188.464734 383.369868,193.380972 389.434354,193.380972 Z M367.472907,215.342418 C373.537393,215.342418 378.45363,210.426181 378.45363,204.361695 C378.45363,198.297209 373.537393,193.380972 367.472907,193.380972 C361.408421,193.380972 356.492184,198.297209 356.492184,204.361695 C356.492184,210.426181 361.408421,215.342418 367.472907,215.342418 Z M345.511461,193.380972 C351.575947,193.380972 356.492184,188.464734 356.492184,182.400248 C356.492184,176.335762 351.575947,171.419525 345.511461,171.419525 C339.446975,171.419525 334.530737,176.335762 334.530737,182.400248 C334.530737,188.464734 339.446975,193.380972 345.511461,193.380972 Z" fill="#484a46"></path>
                </g>
            </svg>
        `,
        text: [
            "Video games are a complex art form.",
            "Reprioritization has interfered with time played, but I revere the complicated work put into these games.",
            "I occasionally squeeze in time for competitive online gaming. Such a rush!",
        ]
    },
    {
        name: "Travel",
        id: "travel",
        svg: `
            <svg id="travel" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M250.5,26 L250.5,26 C266.240115,26 279,38.7598846 279,54.5 L279,426 L222,426 L222,54.5 C222,38.7598846 234.759885,26 250.5,26 Z" fill="#484a46"></path>
                    <path d="M223.288337,189 L33.0394673,295.978194 C31.779672,296.686585 31,298.019481 31,299.464784 L31,317.287366 C31,319.496505 32.790861,321.287366 35,321.287366 C35.3629819,321.287366 35.7242747,321.237959 36.0739296,321.140504 L223.288337,268.960938 L223.288337,189 Z" fill="#484a46"></path>
                    <path d="M277,189 L467.182362,295.940797 C468.49642,296.6797 469.288337,297.938435 469.288337,299.288199 L469.288337,317.052705 C469.288337,319.261844 467.204946,321.052705 464.634953,321.052705 C464.147604,321.052705 463.663279,320.986897 463.19969,320.857687 L277,268.960938 L277,189 Z" fill="#484a46"></path>
                    <path d="M250.71686,402.103207 L331.612228,459.818552 C332.664455,460.569271 333.289062,461.782183 333.289062,463.074763 L333.289062,469.237199 C333.289062,471.446338 331.498201,473.237199 329.289062,473.237199 C328.834755,473.237199 328.383768,473.159805 327.955454,473.008338 L250.644531,445.668462 L173.333608,473.008338 C172.905294,473.159805 172.454307,473.237199 172,473.237199 C169.790861,473.237199 168,471.446338 168,469.237199 L168,463.074763 C168,461.782183 168.624607,460.569271 169.676835,459.818552 L250.572202,402.103207 L250.572202,402 L250.644531,402.051604 L250.71686,402 L250.71686,402.103207 Z" fill="#484a46"></path>
                </g>
            </svg>
        `,
        text: [
            "I love traveling with my wife. She's the other half of a wonderful puzzle.",
            "We often commute on foot through exploritory or gastronomical adventures.",
            "My most deared trip thus far is Italy, where everyone overloads on carbs and wears tight pants... Life is about choices, people!"
        ]
    },
    {
        name: "Family",
        id: "family",
        svg: `
            <svg id="family" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="dad" transform="translate(69.000000, 19.000000)" fill="#484a46">
                        <ellipse cx="96" cy="46.7528517" rx="46.6788991" ry="46.7528517"></ellipse>
                        <path d="M36.9908257,303.21673 L73.9816514,303.21673 L73.9816514,454 C73.9816514,458.418278 70.3999294,462 65.9816514,462 L44.9908257,462 C40.5725477,462 36.9908257,458.418278 36.9908257,454 L36.9908257,303.21673 Z" id="Rectangle-2"></path>
                        <path d="M118.018349,303.21673 L155.009174,303.21673 L155.009174,454 C155.009174,458.418278 151.427452,462 147.009174,462 L126.018349,462 C121.600071,462 118.018349,458.418278 118.018349,454 L118.018349,303.21673 Z" id="Rectangle-2-Copy"></path>
                        <path d="M41.4678899,100.326996 L150.53211,100.326996 C154.950388,100.326996 158.53211,103.908718 158.53211,108.326996 L158.53211,294.395437 L33.4678899,294.395437 L33.4678899,108.326996 C33.4678899,103.908718 37.0496119,100.326996 41.4678899,100.326996 Z"></path>
                        <rect x="0" y="107.38403" width="28.1834862" height="171.13308" rx="14"></rect>
                        <rect x="163.816514" y="107.38403" width="28.1834862" height="171.13308" rx="14"></rect>
                    </g>
                    <g id="kid" transform="translate(233.000000, 309.000000)" fill="#484a46">
                        <ellipse cx="33.6174896" cy="24.8571429" rx="24.7102915" ry="24.8571429"></ellipse>
                        <path d="M15.9672814,122.285714 L28.3224271,122.285714 L28.3224271,168 C28.3224271,170.209139 26.5315661,172 24.3224271,172 L19.9672814,172 C17.7581424,172 15.9672814,170.209139 15.9672814,168 L15.9672814,122.285714 Z" id="Rectangle-2-Copy-2"></path>
                        <path d="M40.6775729,122.285714 L53.0327186,122.285714 L53.0327186,168 C53.0327186,170.209139 51.2418576,172 49.0327186,172 L44.6775729,172 C42.4684339,172 40.6775729,170.209139 40.6775729,168 L40.6775729,122.285714 Z" id="Rectangle-2-Copy-4"></path>
                        <path d="M20.4372397,53.0408163 L48.5627603,53.0408163 C52.9810383,53.0408163 56.5627603,56.6225383 56.5627603,61.0408163 L56.5627603,118.734694 L12.4372397,118.734694 L12.4372397,61.0408163 C12.4372397,56.6225383 16.0189617,53.0408163 20.4372397,53.0408163 Z"></path>
                        <rect x="0" y="56.9183673" width="10.097561" height="49.7142857" rx="5.04878049"></rect>
                        <rect x="58.4098751" y="56.9183673" width="10.097561" height="49.7142857" rx="5.04878049"></rect>
                    </g>
                    <g id="mom" transform="translate(282.000000, 66.000000)" fill="#484a46">
                        <path d="M90,291.313559 L116.470588,291.313559 L116.470588,410 C116.470588,412.761424 114.232012,415 111.470588,415 L95,415 C92.2385763,415 90,412.761424 90,410 L90,291.313559 Z" id="Rectangle-2-Copy-3"></path>
                        <path d="M33.5294118,291.313559 L60,291.313559 L60,410 C60,412.761424 57.7614237,415 55,415 L38.5294118,415 C35.767988,415 33.5294118,412.761424 33.5294118,410 L33.5294118,291.313559 Z"></path>
                        <ellipse cx="74.1176471" cy="42.4067797" rx="42.3529412" ry="42.4067797"></ellipse>
                        <path d="M27.4221423,91.6483085 L121.010201,91.6483033 C125.428482,91.6483033 129.010206,95.2300277 129.010206,99.6483085 C129.010206,100.11738 128.968951,100.585543 128.886918,101.047385 C120.933507,145.824594 116.956802,180.788387 116.956802,205.938766 C116.956802,232.822709 121.500613,259.51403 130.588235,286.012729 L17.6470588,286.012729 C25.6677362,270.726902 29.6780749,244.035581 29.6780749,205.938766 C29.6780749,171.013971 26.3077525,136.089173 19.5671076,101.16437 L19.5671035,101.164371 C18.7298078,96.8261526 21.5678662,92.6305696 25.9060843,91.7932739 C26.4056771,91.6968502 26.9133295,91.6483085 27.4221423,91.6483085 Z"></path>
                        <rect x="0" y="100.483051" width="17.6470588" height="136.055085" rx="8"></rect>
                        <rect x="132.352941" y="100.483051" width="17.6470588" height="136.055085" rx="8"></rect>
                    </g>
                </g>
            </svg>
        `,
        text: [
            "I never thought fatherhood would be this fun or exhausting.",
            "Chasing my 1-year-old son around the house is the highlight of my day.",
            "My family is everything to me. Without them, I'm nothing."
        ]
    },
    {
        name: "Music",
        id: "music",
        svg: `
            <svg id="music" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M432.40167,60.6074122 L433,60 L433,361 C432.695292,395.839903 400.800526,424 361.5,424 C322.01164,424 290,395.570082 290,360.5 C290,325.429918 322.01164,297 361.5,297 C378.322581,297 393.788231,302.159679 406,310.794336 L406,136.760781 C370.349964,156.673207 334.675608,168.771398 298.976931,173.055354 C263.283841,177.338639 227.624864,176.493034 192,170.51854 L192,392 C191.695292,426.839903 159.800526,455 120.5,455 C81.0116404,455 49,426.570082 49,391.5 C49,356.429918 81.0116404,328 120.5,328 C137.322581,328 152.788231,333.159679 165,341.794336 L165,100.445312 L165.391587,100.64713 C166.596129,96.4770066 170.441933,93.4274459 175,93.4274459 C175.714606,93.4274459 176.427153,93.5040445 177.125431,93.655929 C218.789733,102.718454 259.406899,104.638483 298.976931,99.4160156 C337.601233,94.3183658 377.235395,79.6547104 417.879419,55.4250495 C422.623274,52.5970287 428.761491,54.1501226 431.589509,58.8939793 C431.915242,59.44038 432.186718,60.0142661 432.40167,60.6074122 Z" fill="#484a46"></path>
                </g>
            </svg>
        `,
        text: [
            "As Nietzsche said, 'Without music, life would be a mistake.'",
            "I love how music emphasizes your emotional state and sparks your imagination.",
            "I search for new artists regularly and even enjoy creating some tunes of my own.",
            "Right now I'm obsessed with Oscar Peterson, The Districts, The Wood Brothers, and The Bad Plus."
        ]
    }
]

const hC = document.getElementById("heartContainer");

populateHeartContent = () => {
    let innerHc = document.createElement("div");
    innerHc.classList.add("heartIconsContainer");

    let size = hC.clientWidth >= hC.clientHeight ? hC.clientHeight : hC.clientWidth;
    size *= 0.9;
    innerHc.setAttribute("style", "height:" + size + "px; width:" + size + "px;");
    hC.appendChild(innerHc);

    //create an inner div that says "The Things I Love"
    //needs to be within the confounds of the orbiting divs

    let s = size / 7;
    let len = heartContent.length;

    for (let i = 0; i < len; i++) {
        let div = document.createElement("div");
        div.classList.add("heartIcon");
        div.id = heartContent[i].name + "Container";

        let x = (size/2 - s/2 ) + (size/2 * 0.8) * Math.cos(2 * Math.PI * i / len);
        let y = (size/2 - s/2 ) + (size/2 * 0.8) * Math.sin(2 * Math.PI * i / len);

        let num = 90 + i * 60;

        div.setAttribute("style", `
            top:` + y + `px;
            left:` + x + `px;
            height:` + s + `px;
            width:` + s + `px;
        `)

        div.innerHTML = heartContent[i].svg;
        div.children[0].setAttribute("height", s * 0.8 + "px");
        div.children[0].setAttribute("width", s * 0.8 + "px");

        //create divs with svgs inside equally around a circle
        //create event listeners to stop the rotation of the circled divs
        //make sure the hover also adds a class to make the div glow
        div.addEventListener("mouseenter", () => {
            svgDiv.innerHTML = `
              <h2>` + heartContent[i].name + `</h2>
              <p>Click/tap for more detail.</p>
            `
            for(let i = 0; i < svgDiv.children.length; i++) {
                setTimeout(() => svgDiv.children[i].classList.add("in"), 125);
            }
        })

        div.addEventListener("mouseleave", () => {
            svgDiv.innerHTML = thingsILove;
            for(let i = 0; i < svgDiv.children.length; i++) {
                svgDiv.children[i].classList.remove("in");
            }
        })

        div.addEventListener("click", () => {
            div.classList.add("focus");
            svgDiv.classList.add("hide");
            div.parentNode.classList.add("focus");

            let details = document.createElement("div");
            details.id = "heartDetails";
            details.innerHTML = createHeartDetails(heartContent[i]);
            div.parentNode.appendChild(details);

            let closeBtn = document.createElement("div");
            closeBtn.id = "close";
            closeBtn.innerHTML = "<span></span><span></span>";
            div.parentNode.appendChild(closeBtn);

            closeBtn.addEventListener("click", () => {
                closeHeartDetails(div, svgDiv, closeBtn, details);
            });

            let kids = div.parentNode.children;

            for(let q = 0; q < kids.length; q++) {
                kids[q].classList.remove("in");
            }
        })

        innerHc.appendChild(div);

        setTimeout(() => {
            setTimeout(() => {
                div.classList.add("in");
            }, 100 * (i + 1));
        }, 1000)


    }

    let svgDiv = document.createElement("div");
    svgDiv.classList.add("thingsILoveContainer");
    svgDiv.innerHTML = thingsILove;
    innerHc.appendChild(svgDiv);
}

createHeartDetails = content => {
    let html = "<h2>" + content.name + "</h2><span></span>";

    for (let i = 0; i < content.text.length; i++) {
        html = html + "<div class='detailTextContainer'>" +
                content.svg +
                "<p>" + content.text[i] + "</p></div>";
    }

    return html;
}

const closeBtn = "<div id='close'><span></span><span></span></div>";

closeHeartDetails = (div, svgDiv, closeBtn, details) => {
  closeBtn.remove();
  details.remove();
  div.classList.remove("focus");
  svgDiv.classList.remove("hide");
  div.parentNode.classList.remove("focus");

  let kids = div.parentNode.children;

  for(let q = 0; q < kids.length; q++) {
      kids[q].classList.add("in");
  }
}

const thingsILove = `
  <svg id="thingsILove" viewBox="0 0 576 576" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="things" transform="translate(226.909664, 249.681904) rotate(-24.000000) translate(-226.909664, -249.681904) translate(19.409664, 195.181904)" fill="white">
              <path d="M7.21002838,48.6958094 C8.19509806,48.6958094 53.369017,44.5228217 56.3565172,41.9555985 C57.7212986,40.7828125 57.6978251,35.5022528 58.1518976,24.0014653 C58.2909438,20.4796923 58.7144073,13.7554343 59.422288,3.82869123 C61.5870795,1.27623041 63.2899685,0 64.530955,0 C65.7719415,0 67.6179663,1.27623041 70.0690296,3.82869123 C71.1050019,7.46394764 71.4939891,11.2950199 71.2359912,15.321908 C70.9779933,19.3487961 69.891397,26.4061598 67.9762023,36.4939991 C78.5097712,31.6636912 88.4955198,26.6475818 97.9334481,21.445671 C107.371376,16.2437602 116.017544,10.8350196 123.871952,5.21944903 C123.994622,2.99577506 124.46017,1.59168351 125.268597,1.00717437 C126.077024,0.422665235 127.7685,0.422665235 130.343025,1.00717437 C133.467172,2.41135496 135.309868,3.81544651 135.871114,5.21944903 C136.432359,6.62345155 136.060016,8.89757033 134.754083,12.0418054 C134.389177,26.6555674 133.928622,37.2289935 133.372418,43.7620836 C132.816214,50.2951737 131.806416,56.992288 130.343025,63.8534266 C134.106128,58.7679532 137.31337,54.8385446 139.964752,52.0652006 C143.941825,47.9051846 151.295673,40.4856604 153.732189,39.3883753 C156.168705,38.2910903 160.562053,38.2910903 162.413071,41.9555985 C164.264089,45.6201067 160.562053,69.2107371 162.413071,69.2107371 C163.105214,69.2107371 166.523051,64.2005169 172.210983,59.2968554 C176.663977,55.4578555 187.603441,47.7161322 189.935105,45.8300055 C192.266768,43.9438787 189.869481,41.8277374 193.346113,40.8491353 C194.853437,40.4248541 199.168926,40.0006509 202.882957,43.7620836 C205.586371,46.5 202.882957,52.0652006 202.882957,54.1245507 C202.882957,56.1839009 203.49497,71.5058089 210.074465,69.2107371 C212.984976,68.1954873 219.903571,54.9215256 226.347018,46.5 C228.525184,43.6531563 230.598277,41.2826148 232.566295,39.3883753 C236.446049,38.2395672 239.407915,39.0953083 241.451895,41.9555985 C244.517864,46.2460339 247.178281,61.823363 248.598465,61.823363 C249.248544,61.823363 254.632123,49.0715846 263.768966,39.3883753 C267.939224,34.9687438 271.133806,31.0138276 278.441583,31.0138276 C281.264141,31.0138276 286.33883,33.178547 289.048379,36.4939991 C290.359875,38.0987683 291.914397,41.2107704 293.711946,45.8300055 C297.950657,48.8538867 300.721121,51.6187351 302.023338,54.1245507 C303.325554,56.6303663 303.325554,59.1966371 302.023338,61.823363 C296.201555,62.7512496 291.876569,61.9090804 289.048379,59.2968554 C284.806094,55.3785179 281.789108,41.9555985 280.513011,41.9555985 C279.883253,41.9555985 277.802482,40.0025482 267.837639,52.0652006 C266.026436,54.2577003 262.303042,63.7859298 257.096028,71.7922464 C256.099751,73.3241257 254.536906,74.3851113 252.407496,74.9752031 C248.394306,75.2145496 245.218449,74.153564 242.879925,71.7922464 C240.541401,69.4309288 238.004662,64.7236387 235.269709,57.670376 C234.902428,57.4473486 234.313003,57.9895084 233.501434,59.2968554 C229.697147,65.4251355 224.558711,74.5408268 222.341115,77.0052667 C219.4139,80.2583156 216.716906,81.5997862 214.250134,81.0296783 C207.197375,81.2256601 202.17264,79.8841895 199.175928,77.0052667 C196.179217,74.1263438 193.098942,67.6813802 189.935105,57.670376 L167.784233,81.0296783 C166.090062,83.7692878 164.299675,85.1390926 162.413071,85.1390926 C160.526467,85.1390926 157.258594,84.1066793 152.609452,82.0418528 C150.902376,75.6380377 149.830522,70.7814571 149.393888,67.4721112 C148.957254,64.1627653 148.957254,60.8955202 149.393888,57.670376 C137.331205,76.0399272 130.980917,85.569273 130.343025,86.2584133 C129.386187,87.2921238 125.229114,87.2716452 122.93182,86.2584133 C120.634527,85.2451815 118.487951,83.159745 118.487951,81.0296783 C118.487951,78.8996117 120.276466,61.8189913 121.507357,47.7293506 C122.327951,38.3362568 122.802772,28.7502426 122.93182,18.9713079 C115.23969,24.2016673 107.558857,28.80824 99.8893215,32.791026 C92.2197859,36.7738121 80.8207488,42.0754066 65.6922102,48.6958094 L61.7690507,89.6356619 C60.3585472,91.598259 59.1528295,92.6982934 58.1518976,92.9357651 C57.1509658,93.1732369 55.4944414,92.7522714 53.1823245,91.6728685 C51.5693116,89.3388272 50.7628051,85.7910971 50.7628051,81.0296783 C50.7628051,76.2682595 51.5693116,67.2998836 53.1823245,54.1245507 C43.466728,58.2847523 36.2312331,60.8510231 31.4758397,61.823363 C26.7204464,62.795703 21.4051597,62.795703 15.5299797,61.823363 C11.1050554,61.0587192 8.00171737,60.21655 6.21996559,59.2968554 C4.4382138,58.3771608 2.56983882,56.6530593 0.614840633,54.1245507 C-0.204946878,50.5358812 -0.204946878,48.4041478 0.614840633,47.7293506 C1.8445219,46.7171548 6.2249587,48.6958094 7.21002838,48.6958094 Z" id="Path-3"></path>
              <path d="M183.071031,8.0401035 C187.343171,8.53931208 191.970162,13.0112544 192.806879,15.3027797 C193.643596,17.594305 191.749705,21.4672822 187.353804,20.9536117 C182.957902,20.4399412 179.288212,17.2567773 178.2949,14.5363822 C177.301588,11.8159872 178.798892,7.54089492 183.071031,8.0401035 Z" id="Path-4"></path>
              <path d="M303.026007,46.9880295 C299.888558,38.0130002 304.438746,30.4657323 310.02526,24.1220464 C315.611774,17.7783605 328.702858,9.82327142 336.443927,9.04078877 C344.184996,8.25830612 348.699795,18.9814051 351.045793,19.9756092 C353.391791,20.9698134 356.511913,22.0878241 357.717181,24.1220464 C358.922449,26.1562687 358.489106,29.6247348 357.717181,31.2354168 C356.945255,32.8460989 358.489106,41.1847009 356.362313,51.4929504 C354.944451,58.3651167 352.306817,66.5857716 348.449412,76.1549152 C353.73003,71.1494128 358.204764,66.3358967 361.873615,61.714367 C365.542466,57.0928373 369.94761,50.7206656 375.089047,42.597852 C373.90696,41.2610809 373.315917,40.3210413 373.315917,39.7777331 C373.315917,38.9627707 375.089047,35.9477308 375.96503,35.9477308 C376.549018,35.9477308 377.7995,36.1204396 379.716474,36.4658573 C380.303832,34.7695738 381.279299,32.7442243 382.642874,30.3898088 C383.536081,28.8475537 384.916335,27.6680319 386.534218,25.167208 C387.102209,24.2892425 388.013107,22.5587096 389.266911,19.9756092 C390.279695,16.2648507 391.245357,13.7301646 392.163896,12.3715509 C393.082436,11.0129372 394.289394,10.3340989 395.784769,10.3350359 C398.264506,10.8382046 399.935642,11.5170429 400.798174,12.3715509 C401.660707,13.2260589 402.455381,14.9900883 403.182196,17.6636391 C409.317411,28.574104 413.017799,36.6114786 414.28336,41.7757627 C416.181701,49.522189 413.940428,50.6580327 411.835128,52.7063071 C409.729827,54.7545814 404.927407,56.5941677 399.960933,56.2433933 C396.64995,56.0095437 390.877264,53.976117 382.642874,50.1431133 C372.737114,63.5460347 365.580623,72.7985477 361.173403,77.9006522 C342.89171,99.0648101 331.544751,109 330.698025,109 C328.968658,109 319.096095,107.527224 321.511325,103.760295 C323.926555,99.9933655 336.299471,81.6792441 340.570229,71.5534248 C343.417402,64.8028785 345.215163,56.2134059 345.963514,45.7850069 C339.487969,50.2466775 334.738817,53.1694239 331.716059,54.5532462 C328.6933,55.9370685 325.291722,56.7457354 321.511325,56.9792469 C311.279412,56.3017882 305.117639,52.9713824 303.026007,46.9880295 Z M397.347333,26.7885804 C396.185095,26.7885804 394.649205,31.1473873 392.756853,33.8082319 C391.495285,35.5821283 389.654956,38.3341852 387.235865,42.0644027 C391.348327,44.2107531 394.488999,45.4907465 396.657882,45.9043826 C399.911206,46.5248369 401.96113,46.1068284 402.902757,45.2030945 C403.844385,44.2993606 404.669885,44.0549076 403.871647,41.1364788 C403.07341,38.21805 398.509571,26.7885804 397.347333,26.7885804 Z M339.091246,19.492761 C337.639166,19.492761 328.444678,22.9169615 323.722446,26.2711666 C319.000215,29.6253717 313.017305,37.1498539 312.176476,38.610345 C311.335647,40.070836 311.768426,43.4714817 313.017305,44.8656353 C314.266184,46.2597889 317.940314,46.8846893 319.588611,46.8846893 C321.236908,46.8846893 330.927466,43.3974067 334.774107,41.0374147 C337.338534,39.4640867 339.717893,36.8478569 341.912183,33.1887251 L340.297681,31.5158553 C339.828428,31.0296375 339.566185,30.3802827 339.566185,29.7045562 C339.566185,29.022472 339.742437,28.3519608 340.07785,27.7580441 C341.300738,25.5926648 341.912183,24.2601027 341.912183,23.7603556 C341.912183,22.9126095 340.543326,19.492761 339.091246,19.492761 Z" id="Combined-Shape"></path>
          </g>
          <g id="the" transform="translate(198.265528, 178.192893) rotate(-24.000000) translate(-198.265528, -178.192893) translate(79.265528, 152.692893)" fill="white">
              <path d="M1.73632813,11.921875 C4.48535156,9.42773437 21.0672579,11.2213486 30.4873047,11.921875 C39.9073515,12.6224014 51.5361328,13.0839844 52.8720703,15.7246094 C54.2080078,18.3652344 54.2080078,18.3652344 50.5,19.8544922 C46.7919922,21.34375 7.6171875,19.8544922 4.48535156,18.3652344 C1.35351563,16.8759766 -1.01269531,14.4160156 1.73632813,11.921875 Z" id="Path-9"></path>
              <path d="M12.5546875,28.5673828 C13.26957,28.5673828 19.3493063,29.0335973 28.840332,29.2392578 C33.3560222,29.337108 42.6777344,28.1210938 44.7490234,30.5180664 C46.8203125,32.9150391 44.565918,34.7729492 42.7182617,35.8789062 C40.8706055,36.9848633 14.3374023,37.8999023 11.7392578,37.2626953 C9.14111328,36.6254883 9.47070313,32.8232422 9.47070313,31.2875977 C9.47070313,29.7519531 10.972168,28.5673828 12.5546875,28.5673828 Z" id="Path-10"></path>
              <path d="M190.670898,16.1479492 C193.538086,15.1313477 209.98404,15.8257277 218.59668,16.1479492 C224.338439,16.3627635 229.956115,16.9211945 235.449707,17.8232422 L237.92041,18.6713867 L235.449707,19.8930664 C235.458776,21.0684542 235.230586,21.8444958 234.765137,22.2211914 C234.299687,22.597887 233.151087,22.9361031 231.319336,23.2358398 C207.634766,24.8253581 195.041016,25.3304036 193.538086,24.7509766 C191.283691,23.8818359 190.010042,22.0443127 189.478516,20.4494629 C188.94699,18.854613 187.803711,17.1645508 190.670898,16.1479492 Z" id="Path-11"></path>
              <path d="M191.833008,35.2519531 C190.509277,36.4887695 193.280762,41.2470703 194.352539,42.1367187 C194.931225,42.6170674 219.062031,40.8899375 220.140137,40.8208008 C226.713704,40.3992513 230.416178,39.6904297 231.247559,38.6943359 L232.391113,36.230957 L234.673828,35.2519531 L230.000488,34.0151367 C219.123843,33.8486293 211.116356,33.8486293 205.978027,34.0151367 C198.270534,34.2648979 193.156738,34.0151367 191.833008,35.2519531 Z" id="Path-12"></path>
              <path d="M72.0688477,21.9692383 C72.6848138,21.9692383 74.9116105,20.9309496 76.5927734,21.9692383 C77.3004232,22.4062838 78.2148112,23.7879569 79.3359375,26.1142578 C81.5617068,27.1032902 83.4925337,27.6418644 85.128418,27.7299805 C86.7643023,27.8180966 89.4052528,27.5257789 93.0512695,26.8530273 C93.8457712,23.7887689 94.3389352,21.130403 94.5307617,18.8779297 C94.7225882,16.6254564 94.7225882,13.4929694 94.5307617,9.48046875 C93.9093424,8.31347656 94.8642578,7.72998047 97.3955078,7.72998047 C99.9267578,7.72998047 101.789063,8.91927083 102.982422,11.2978516 L101.192383,25.0390625 C108.73112,22.452474 113.94694,19.1907552 116.839844,15.2539063 C119.732747,11.3170573 120.840332,7.46207682 120.162598,3.68896484 C120.815484,1.7023112 121.708388,0.708984375 122.841309,0.708984375 C123.97423,0.708984375 125.86046,1.7023112 128.5,3.68896484 C128.153593,9.25019285 127.886503,13.5698543 127.69873,16.6479492 C127.510958,19.7260441 127.265353,23.8108423 126.961914,28.9023438 C129.367993,25.6781891 131.103019,23.6633779 132.166992,22.8579102 C133.230965,22.0524424 134.548674,21.7562184 136.120117,21.9692383 C138.570828,22.6257825 140.081733,23.6490573 140.652832,25.0390625 C141.223931,26.4290677 141.223931,29.0832019 140.652832,33.0014648 C140.453539,35.2908208 140.453539,36.919076 140.652832,37.8862305 C140.852125,38.8533849 141.370029,39.738476 142.206543,40.5415039 C145.090886,40.3019757 147.466049,39.8545473 149.332031,39.1992188 C151.198014,38.5438902 153.572688,37.3231871 156.456055,35.5371094 C153.726237,32.3873698 152.883789,29.2464193 153.928711,26.1142578 C154.973633,22.9820964 157.196777,21.4160156 160.598145,21.4160156 C164.049642,21.7848307 166.211914,22.9733887 167.084961,24.9816895 C167.958008,26.9899902 167.521484,30.0672201 165.775391,34.2133789 C168.360821,35.8893679 170.509096,37.1136518 172.220215,37.8862305 C173.931334,38.6588092 176.454934,39.5439003 179.791016,40.5415039 C180.000316,41.9458259 180.000316,42.9191332 179.791016,43.4614258 C179.581715,44.0037183 178.990406,44.5624748 178.01709,45.1376953 C174.829526,44.7139829 172.291765,44.1552264 170.403809,43.4614258 C168.515852,42.7676252 165.667056,41.3468895 161.857422,39.1992188 C157.495727,42.2874639 154.2524,44.266956 152.127441,45.1376953 C150.002482,46.0084346 147.013713,46.5826533 143.161133,46.8603516 C138.913658,45.8654101 136.160729,44.4130989 134.902344,42.503418 C133.643959,40.593737 133.153724,37.124336 133.431641,32.0952148 L126.961914,45.1376953 C125.171983,45.469046 123.798448,45.469046 122.841309,45.1376953 C121.884169,44.8063447 120.721246,43.9282522 119.352539,42.503418 L119.352539,22.8579102 C115.088616,25.759774 111.754468,27.7745852 109.350098,28.9023438 C106.945727,30.0301023 103.715258,31.0943927 99.6586914,32.0952148 L96.753418,49.2543945 C95.0389465,49.8653931 93.804897,50.1070923 93.0512695,49.9794922 C92.2976421,49.8518921 91.4110861,49.2511434 90.3916016,48.1772461 C90.1509393,46.9601519 90.1509393,45.3882118 90.3916016,43.4614258 C90.6322638,41.5346398 91.2640998,38.0479861 92.2871094,33.0014648 C89.5751953,34.4135742 85.7120768,34.4135742 80.6977539,33.0014648 C73.1762695,30.8833008 71.0959515,24.9158639 70.5615234,24.3544922 C70.2052381,23.9802444 70.4584843,23.5794968 71.3212622,23.1522493 C70.8147697,22.3635753 71.0639648,21.9692383 72.0688477,21.9692383 Z M160.937976,31.8623047 C162.29522,30.3135175 162.70717,28.892619 162.173828,27.5996094 C161.373815,25.6600949 159.649368,25.5242144 158.894043,27.5996094 C158.390493,28.983206 159.071803,30.4041044 160.937976,31.8623047 Z" id="Combined-Shape"></path>
          </g>
          <path d="M281.85612,388.6288 C283.811119,390.622319 284.664268,391.940652 284.415567,392.583798 C284.166867,393.226943 282.787801,394.008071 280.27837,394.927181 C271.304568,391.529538 264.428852,388.16933 259.651222,384.846557 C254.873592,381.523783 251.079616,377.463372 248.269293,372.665324 C233.904194,380.364921 223.564932,385.21239 217.251507,387.207732 C210.938081,389.203074 204.623031,390.062257 198.306354,389.785282 C192.421289,390.509973 187.77395,389.251521 184.364339,386.009926 C180.954727,382.768332 182.118054,379.887361 187.85432,377.367013 L204.432527,372.665324 C210.520679,368.719285 214.234712,365.590182 215.574628,363.278015 C217.584501,359.809765 214.679908,354.286148 214.679908,353.438444 C214.679908,352.590739 213.861763,350.789814 215.574628,349.857653 C216.716537,349.236212 219.599166,348.861049 224.222514,348.732163 C229.602564,351.787523 231.238299,355.439673 229.12972,359.688615 C227.89149,362.18374 225.680018,368.129715 221.051026,372.665324 C218.88189,374.790701 214.549845,377.672628 208.054893,381.311107 L243.873082,364.961945 C237.026145,354.969324 236.700831,340.505928 242.897141,321.571756 C252.191604,293.170498 261.558976,289.927181 266.489205,289.927181 C271.419434,289.927181 278.203696,293.81675 280.27837,327.722636 C280.948029,338.666713 274.892787,346.656234 271.194316,353.438444 C268.728668,357.959917 263.123722,362.906869 254.379478,368.2793 C257.980827,373.296564 261.539025,377.186133 265.054073,379.948007 C268.569121,382.70988 274.169803,385.603478 281.85612,388.6288 Z M266.816011,298.8232 C262.561483,302.745109 259.309838,306.660887 257.061077,310.570537 C253.687936,316.435011 250.711065,324.71119 249.595064,328.763183 C248.479063,332.815176 246.649696,341.973118 246.845033,347.618152 C246.975258,351.381508 248.263935,355.846927 250.711065,361.014409 C255.49552,356.965311 259.391397,352.943163 262.398695,348.947963 C266.909641,342.955164 270.01968,335.071034 270.678845,332.494919 C271.33801,329.918804 271.33801,319.834035 270.678845,314.088195 C270.239401,310.257635 268.95179,305.169303 266.816011,298.8232 Z" id="i" fill="white" transform="translate(233.457668, 342.427181) rotate(-27.000000) translate(-233.457668, -342.427181) "></path>
          <g id="love" transform="translate(381.248476, 259.457347) rotate(-30.000000) translate(-381.248476, -259.457347) translate(277.248476, 199.457347)" fill="white">
              <path d="M29.3833964,104.424313 C24.1922103,110.552178 19.9120915,114.764777 16.5430401,117.06211 C13.1739887,119.359442 9.35874158,120.309446 5.09729878,119.912123 C1.69909959,118.854843 -5.67721976e-14,117.190715 -5.68434189e-14,114.919738 C-5.68434189e-14,112.648761 2.06644426,110.975223 6.19933277,109.899123 C10.5996186,107.972729 14.047521,105.825966 16.5430401,103.458834 C19.0385592,101.091702 21.9942323,97.7726465 25.4100595,93.5016678 C25.0559237,82.5647547 25.0559237,74.8313054 25.4100595,70.30132 C26.6139479,54.9015853 29.6358654,41.9485193 31.918889,33.5510207 C36.8544663,15.396805 46.5855267,3.14245237 49.3929254,1.43614851 C52.2003241,-0.270155343 54.2396498,-0.270155343 56.2977103,0.475061154 C57.5975768,0.945738248 58.3094066,0.947268044 59.3300267,1.43614851 C59.9253402,1.72130569 60.9313415,1.94539605 61.415684,3.12244279 C62.7303951,6.31744736 61.415684,9.61793791 61.415684,12.9127361 C61.415684,16.2075343 51.177204,53.9980685 45.0524527,73.0402936 C40.9692852,85.7351102 37.7834734,92.5555683 35.4950175,93.5016678 C37.0730432,100.495876 38.9866186,104.596808 41.2357437,105.804464 C43.4848689,107.01212 47.0720658,107.01212 51.9973343,105.804464 C54.978621,104.548043 56.4120796,104.548043 56.2977103,105.804464 C56.1261563,107.689096 55.2768921,112.777617 53.1281879,113.466187 C50.9794837,114.154758 42.9470022,113.767436 38.8669032,112.350147 C36.1468372,111.405287 32.9856682,108.763343 29.3833964,104.424313 Z M52.408326,13.1247776 C48.6731646,18.2471035 46.0134138,22.6790629 44.4290736,26.4206558 C42.5913801,30.7605702 40.0816707,40.0788525 39.0016032,43.7032901 C36.5247893,52.0148604 34.7983321,62.6121241 33.8222314,75.4950813 C38.043944,63.862818 41.5795581,53.2655543 44.4290736,43.7032901 C47.2785891,34.1410259 49.9383399,23.9481884 52.408326,13.1247776 Z" id="Combined-Shape"></path>
              <path d="M71.0257997,75.875188 C71.2318205,73.8811795 72.1443472,72.0098663 73.7633798,70.2612486 C75.3824123,68.5126308 77.7899428,67.9607103 80.9859713,68.605487 C82.7012713,68.3791099 84.2031425,68.3791099 85.4915849,68.605487 C86.4129267,68.7673651 86.5049961,69.7664423 87.7852837,70.2612486 C88.1253634,70.3926827 89.0002236,70.3926827 90.4098645,70.2612486 C98.1521675,68.7754385 104.229991,67.3421144 108.643334,65.9612765 C115.263349,63.8900195 123.043928,59.7194339 126.147615,59.0796935 C129.251302,58.4399531 129.802924,58.4430547 132.893861,60.9626919 C134.954486,62.64245 135.413766,65.1900484 134.271703,68.605487 C131.932992,80.3868696 130.567219,88.2656655 130.174386,92.2418747 C129.781552,96.2180839 130.117013,98.7679776 131.180766,99.8915558 C134.624263,96.8997838 137.104421,94.3498901 138.621241,92.2418747 C140.13806,90.1338594 141.803708,86.9220784 143.618183,82.6065318 C142.094045,76.9462686 142.76226,73.7175857 145.622828,72.920483 C148.483396,72.1233804 151.610751,73.1082821 155.004893,75.875188 C156.368476,77.1290337 157.799177,78.0148192 159.296994,78.5325445 C160.794811,79.0502698 162.82318,79.0502698 165.3821,78.5325445 C167.436482,67.2070101 170.848937,59.4229484 175.619464,55.1803593 C180.389991,50.9377702 184.857106,49.9244901 189.020808,52.1405188 C193.906207,56.7666352 195.078861,62.254958 192.53877,68.605487 C189.998679,74.956016 184.35891,80.6052199 175.619464,85.5530988 C177.18439,92.7032344 179.996262,98.551088 184.055081,103.096659 C188.1139,107.642231 192.556459,110.600901 197.382757,111.972668 C201.681768,112.212462 204.293655,112.492074 205.218417,112.811504 C208.006854,113.774683 206.847731,115.296883 207.513989,115.952756 C209.010532,117.425974 206.7095,119.058603 205.218417,119.686201 C204.224361,120.1046 202.032841,120.1046 198.643855,119.686201 C191.368197,118.380372 184.917871,115.39395 179.292878,110.726935 C173.667884,106.05992 169.352684,98.5187448 166.347277,88.1034098 C163.124651,87.7926473 160.774556,87.4936295 159.296994,87.2063563 C157.819431,86.9190832 155.797097,86.3679973 153.229992,85.5530988 C151.227902,90.4761289 149.033884,94.5217376 146.647938,97.689925 C143.069019,102.442206 137.228659,109.24594 134.271703,110.726935 C131.314748,112.207929 126.799436,111.255988 124.260339,108.90278 C122.567607,107.333974 121.215777,103.596356 120.20485,97.689925 C119.781875,95.0968433 119.781875,91.9013382 120.20485,88.1034098 C120.505686,85.4021714 121.0467,83.4084428 121.949784,78.5325445 C122.194215,77.2128167 122.630813,74.455718 123.259577,70.2612486 C117.938423,72.4312461 113.663386,74.023782 110.434467,75.0388563 C107.205547,76.0539305 102.710339,77.2184932 96.9488414,78.5325445 C100.369204,87.672098 100.785407,96.5942219 98.1974526,105.298916 C95.6094978,114.003611 89.5204371,118.382667 79.9302706,118.436085 C73.0287802,118.383502 68.2316159,115.813785 65.5387777,110.726935 C61.4995204,103.096659 63.2101178,96.1336969 64.3744478,90.8433978 C65.1506677,87.3165318 67.367785,82.3271285 71.0257997,75.875188 Z M85.5708717,78.9444504 C82.8670619,78.9444504 81.804683,79.9159974 80.7961824,81.1967869 C79.7876818,82.4775764 72.7988276,93.3918309 72.7988276,100.630858 C72.7988276,105.456876 74.2607432,108.760679 77.1845745,110.542266 C82.8428643,110.823547 86.8384202,107.951056 89.1712421,101.924793 C92.6704751,92.8853994 89.5351862,84.9288777 89.1712421,82.6059058 C88.8072981,80.2829338 88.2746815,78.9444504 85.5708717,78.9444504 Z M183.974546,61.4190436 C181.684868,62.9416925 180.026921,64.5273425 179.000703,66.1759934 C177.974485,67.8246443 177.295657,69.9930972 176.964218,72.6813523 C179.719733,71.1706647 181.579123,69.6415632 182.542389,68.0940476 C183.505654,66.5465321 183.98304,64.3215307 183.974546,61.4190436 Z" id="Combined-Shape"></path>
          </g>
          <path d="M153.723246,358.324999 C160.135034,348.313071 167.011462,343.307107 174.352531,343.307107 C185.364135,343.307107 195.289956,363.183043 192.525094,373.905128 C189.760232,384.627212 158.703437,423.307107 153.723246,423.307107 C148.743055,423.307107 126.256763,409.509339 117.799126,387.135728 C109.341489,364.762117 112.096041,356.341135 125.672449,349.102265 C134.723387,344.276351 144.073652,347.350596 153.723246,358.324999 Z M153.31295,372.107702 C146.635285,360.368242 140.164759,356.168315 133.901373,359.507921 C124.506292,364.517329 122.6001,370.344776 128.452914,385.827655 C134.305727,401.310534 149.866583,410.858799 153.31295,410.858799 C156.759318,410.858799 178.251093,384.091724 180.164419,376.671879 C182.077745,369.252033 175.208927,355.497583 167.58873,355.497583 C162.508598,355.497583 157.750005,361.03429 153.31295,372.107702 Z" id="Combined-Shape" fill="white" transform="translate(152.993118, 383.307107) rotate(-24.000000) translate(-152.993118, -383.307107) "></path>
          <path d="M152.61843,364.586627 C177.484365,363.055409 320.113347,364.101293 394.807216,364.586627 C444.603129,364.910184 493.322915,365.751299 540.966574,367.109975 L562.393963,368.387461 L540.966574,370.227571 C538.455599,370.000878 535.181786,370.171223 531.145133,370.738607 C527.108481,371.30599 520.858815,371.301881 512.396135,370.726278 C360.996452,371.302866 278.779465,371.15479 265.745176,370.282049 C246.193741,368.972938 146.887092,373.467806 142.277385,371.065622 C137.667679,368.663439 127.752495,366.117846 152.61843,364.586627 Z" id="Path-11" fill="white" transform="translate(349.393963, 367.784910) rotate(-24.000000) translate(-349.393963, -367.784910) "></path>
          <path d="M140.993368,378.125212 C127.163154,381.515356 138.406756,381.626392 149.604587,384.064939 C155.650642,385.381586 427.466443,382.319668 438.730389,382.130163 C507.410422,380.974686 542.124896,381.179692 542.873812,382.745181 L564.740741,380.808686 L588.590336,378.125212 L539.76371,374.735069 C426.125518,374.278668 342.464028,374.278668 288.779237,374.735069 C208.252052,375.41967 154.823583,374.735069 140.993368,378.125212 Z" id="Path-12" fill="white" transform="translate(361.590336, 379.392768) rotate(-24.000000) translate(-361.590336, -379.392768) "></path>
      </g>
  </svg>
`

sendContactForm = () => {

    //TODO: Get all information from form and store in letiables below

    Email.send(email,
        "stnmonroe@gmail.com",
        "Porfolio Contact from " + name,
        message,
        {token: "5893796f-ae5c-474d-b45c-78e57679e967"}
    );
}
