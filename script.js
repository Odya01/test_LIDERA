// burger
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".nav__burger");
  const navLink = document.querySelectorAll(".nav__list");

  burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    document.body.classList.toggle("overflow");
  });

  // close link click
  navLink.forEach((e) => {
    e.addEventListener("click", () => {
      if (burgerMenu.classList.contains("active")) {
        burgerMenu.classList.remove("active");
        document.body.classList.remove("overflow");
        document.getElementById("burger-checkbox").checked = false;
      }
    });
  });

  // close out nav list
  document.querySelector("main").addEventListener("click", () => {
    if (burgerMenu.classList.contains("active")) {
      burgerMenu.classList.remove("active");
      document.body.classList.remove("overflow");
      document.getElementById("burger-checkbox").checked = false;
    }
  });
});

// scroll animation
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  sections.forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });
});

// video
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".hero__video-wrapper");
  const video = wrap.querySelector(".hero__video");
  const button = wrap.querySelector(".video-btn");

  const togglePlay = () => {
    if (video.paused) {
      video.play();
      wrap.classList.add("playing");
    } else {
      video.pause();
      wrap.classList.remove("playing");
    }
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlay();
  });

  video.addEventListener("pointerup", (e) => {
    e.preventDefault();
    togglePlay();
  });

  video.addEventListener("ended", () => {
    wrap.classList.remove("playing");
  });
});

// slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".why__track");
  const items = document.querySelectorAll(".why__item");
  const prev = document.querySelector(".why__prev");
  const next = document.querySelector(".why__next");
  const dotsContainer = document.querySelector(".why__dots");

  const total = items.length;

  let visible = 3;
  let index = 0;
  let step = 0;
  let steps = 0;

  const calcVisible = () => {
    const w = window.innerWidth;

    if (w < 480) visible = 0;
    else if (w < 768) visible = 1;
    else if (w < 1200) visible = 2;
    else visible = 3;
  };

  const calcStep = () => {
    const itemWidth = items[0].offsetWidth;
    const gap = 24;
    step = itemWidth + gap;

    steps = total - visible;
  };

  const createDots = () => {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < steps; i++) {
      const dot = document.createElement("span");
      dot.className = "why__dot";
      if (i === 0) dot.classList.add("why__dot--active");

      dot.addEventListener("click", () => {
        index = i;
        update();
      });

      dotsContainer.appendChild(dot);
    }
  };

  const update = () => {
    if (index > steps - 1) index = steps - 1;

    track.style.transform = `translateX(${-index * step}px)`;

    const dots = dotsContainer.querySelectorAll(".why__dot");
    dots.forEach((d) => d.classList.remove("why__dot--active"));
    if (dots[index]) dots[index].classList.add("why__dot--active");
  };

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = steps - 1;
    }
    update();
  });

  next.addEventListener("click", () => {
    if (index < steps - 1) {
      index++;
    } else {
      index = 0;
    }
    update();
  });

  calcVisible();
  calcStep();
  createDots();
  update();
});

// popup
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".popup__close");
  const video = document.querySelector(".hero__video");
  const triggers = document.querySelectorAll("[data-popup='open']");

  const openPopup = () => popup.classList.add("popup--active");
  const closePopup = () => popup.classList.remove("popup--active");

  triggers.forEach((btn) => {
    btn.addEventListener("click", openPopup);
  });

  closeBtn.addEventListener("click", closePopup);

  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  if (video) {
    let popupOpenedFromVideo = false;

    video.addEventListener("timeupdate", () => {
      if (!popupOpenedFromVideo && video.currentTime > video.duration / 2) {
        popupOpenedFromVideo = true;
        openPopup();
      }
    });
  }
});
