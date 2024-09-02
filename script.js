// Navbar Function
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("navbar");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

// Close Navbar Collapse
const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    bsCollapse.toggle();
  });
});

////////////////////////////////////////////////////////////

//Canvas Function
document.addEventListener("DOMContentLoaded", function () {
  function handleCanvas(canvasId, headerSelector) {
    var canvas = document.getElementById(canvasId);
    var sectionHeader = document.querySelector(headerSelector);
    var ctx = canvas.getContext("2d");
    var dotRadius = 1;
    var spacing = 20;
    var dots = [];
    var animation;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      createDots();
      drawPolkaDots();
    }

    function createDots() {
      var width = canvas.width;
      var height = canvas.height;

      dots.length = 0; // Clear previous dots

      for (var x = dotRadius; x + 10 < width; x += spacing) {
        for (var y = dotRadius; y < height; y += spacing) {
          dots.push({
            x: x,
            y: y + 10,
            radius: dotRadius,
          });
        }
      }
    }

    function drawPolkaDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(function (dot) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#1D2135";
        ctx.fill();
      });
    }

    function moveDots() {
      dots.forEach(function (dot) {
        dot.x += 0.65;
        if (dot.x > canvas.width) {
          dot.x = -dotRadius;
        }
      });

      drawPolkaDots();
    }

    function startAnimation() {
      animation = gsap.to(
        {},
        {
          duration: 0.016,
          repeat: -1,
          onRepeat: moveDots,
        }
      );
    }

    function stopAnimation() {
      if (animation) {
        animation.kill();
      }
    }

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;
    const delayFactor = 0.1;
    function pulseDots() {
      currentX += (targetX - currentX) * delayFactor;
      currentY += (targetY - currentY) * delayFactor;
      const time = Date.now() * 0.002; // Adjust this value to change the speed of the pulse

      dots.forEach(function (dot) {
        var dx = dot.x - currentX;
        var dy = dot.y - currentY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var maxDistance = 110;

        if (distance < maxDistance) {
          var pulseFactor =
            Math.sin((distance / maxDistance) * Math.PI * 4 - time) * 0.5 + 0.5;
          dot.radius = dotRadius + pulseFactor * 6;
        } else {
          dot.radius = dotRadius;
        }
      });

      drawPolkaDots();
    }
    // Cursor tag PulseEffect
    window.addEventListener("mousemove", function (event) {
      var rect = canvas.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    });
    function animate() {
      pulseDots();
      requestAnimationFrame(animate);
    }
    animate();

    resizeCanvas();
    startAnimation();

    window.addEventListener("resize", function () {
      resizeCanvas();
    });
    canvas.addEventListener("mouseover", stopAnimation);
    canvas.addEventListener("mouseout", startAnimation);

    // Cursor tag MoveText
    canvas.addEventListener("mousemove", function (event) {
      var rect = canvas.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;
      var textWidth = sectionHeader.offsetWidth;
      var moveX = mouseX - rect.width / 5;
      var moveY = (mouseY / rect.height) * 60 - 30;
      // Limits for movement
      var maxX = canvas.width - 30 - textWidth;

      // Constrain movement
      if (moveX < 0) {
        moveX = 0;
      } else {
        moveX = Math.min(maxX, moveX);
      }

      // Move text with the cursor
      sectionHeader.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Reset text position
    canvas.addEventListener("mouseleave", function () {
      sectionHeader.style.transform = `translate(0, 0)`;
    });

    // OnScroll text Fade in
    function HeaderOnScroll() {
      var rect = canvas.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        sectionHeader.classList.add("visible");
      } else {
        sectionHeader.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", HeaderOnScroll);
  }

  // Handle canvases for both sections
  handleCanvas("polka-dot-canvas-about-me", ".about-me-header");
  handleCanvas("polka-dot-canvas-my-project", ".my-project-header");
  handleCanvas("polka-dot-canvas-contact-me", ".contact-me-header");
});

/////////////////////////////////////////////////////////////////////

// Cursor Function
document.addEventListener("DOMContentLoaded", function () {
  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  document.body.appendChild(cursorDot);

  function updateCursorPosition(e) {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
  }

  document.addEventListener("mousemove", updateCursorPosition);

  const elementsToHideCursor = document.querySelectorAll(
    "a, .contact-c, button"
  );

  function checkScreenSize() {
    if (window.innerWidth <= 991) {
      cursorDot.style.display = "none";
    } else {
      elementsToHideCursor.forEach((element) => {
        element.addEventListener("mouseenter", function () {
          cursorDot.classList.add("hovered");
          element.style.cursor = "none";
        });
        element.addEventListener("mouseleave", function () {
          cursorDot.classList.remove("hovered");
          element.style.cursor = "default";
        });
      });

      document.querySelectorAll("canvas").forEach((canvas) => {
        canvas.addEventListener("mouseenter", function () {
          cursorDot.style.display = "none";
        });

        canvas.addEventListener("mouseleave", function () {
          cursorDot.style.display = "block";
        });
      });
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

/////////////////////////////////////////////////////////////////////

//Profile image move
gsap.registerPlugin(ScrollTrigger);

function updateImagePosition() {
  const container = document.querySelector(".featured-box");
  const image = document.querySelector(".profile-image img");

  const containerWidth = container.offsetWidth;
  const imageWidth = image.offsetWidth;

  if (window.innerWidth <= 991) {
    const maxTranslationY = container.offsetHeight - image.offsetHeight;
    gsap.to(image, {
      scrollTrigger: {
        trigger: container,
        start: "top-=100 top",
        end: "bottom+=100 center",
        scrub: 4,
        toggleActions: "play reverse play reverse",
        markers: false,
      },
      y: -maxTranslationY,
      duration: 3,
    });
  } else {
    const maxTranslationX = containerWidth - imageWidth - 100;
    gsap.to(image, {
      scrollTrigger: {
        trigger: container,
        start: "top-=100 top",
        end: "bottom+=100 center",
        scrub: 4,

        toggleActions: "play reverse play reverse",
        markers: false,
      },
      x: -maxTranslationX,
      duration: 3,
    });
  }
}

function initAnimations() {
  updateImagePosition();

  gsap.to(".left-column", {
    scrollTrigger: {
      trigger: ".featured-box",
      start: "top top",
      end: "bottom+=100 center",
      scrub: 2,
      toggleActions: "play reverse play reverse",
      markers: false,
    },
    opacity: 0,
  });
}

initAnimations();

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initAnimations, 200);
});

document.addEventListener("DOMContentLoaded", function() {
  const loadingScreen = document.getElementById('loading-screen');
  const loaderCircle = document.querySelector('.loader-circle');

  window.addEventListener('load', function() {
    loaderCircle.classList.add('scale-fade-out');
    loaderCircle.addEventListener('animationend', () => {
      loadingScreen.style.opacity = '0';
      loadingScreen.addEventListener('transitionend', () => {
        loadingScreen.style.display = 'none';
      });
    });
  });
});
