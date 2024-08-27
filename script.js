// Navbar Function
window.onscroll = function () { headerShadow(); };

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
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false })
navLinks.forEach((l) => {
    l.addEventListener('click', () => { bsCollapse.toggle() })
})

////////////////////////////////////////////////////////////

//Canvas Function
document.addEventListener('DOMContentLoaded', function () {
    function handleCanvas(canvasId, headerSelector) {
        var canvas = document.getElementById(canvasId);
        var sectionHeader = document.querySelector(headerSelector);
        var ctx = canvas.getContext('2d');
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

            for (var x = dotRadius; x + 10< width; x += spacing) {
                for (var y = dotRadius; y < height; y += spacing) {
                    dots.push({
                        x: x,
                        y: y + 10,
                        radius: dotRadius
                    });
                }
            }
        }

        function drawPolkaDots() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dots.forEach(function (dot) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
                ctx.fillStyle = '#1D2135';
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
            animation = gsap.to({}, {
                duration: 0.016,
                repeat: -1,
                onRepeat: moveDots
            });
        }

        function stopAnimation() {
            if (animation) {
                animation.kill();
            }
        }

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
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
                    var pulseFactor = Math.sin((distance / maxDistance) * Math.PI * 4 - time) * 0.5 + 0.5;
                    dot.radius = dotRadius + pulseFactor * 6;
                } else {
                    dot.radius = dotRadius;
                }
            });

            drawPolkaDots();
        }
        // Cursor tag PulseEffect
        window.addEventListener('mousemove', function (event) {
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

        window.addEventListener('resize', function () {
            resizeCanvas();
        });
        canvas.addEventListener('mouseover', stopAnimation);
        canvas.addEventListener('mouseout', startAnimation);

        // Cursor tag MoveText
        canvas.addEventListener('mousemove', function (event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;
            var textWidth = sectionHeader.offsetWidth;
            var moveX = mouseX - (rect.width / 5);
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
        canvas.addEventListener('mouseleave', function () {
            sectionHeader.style.transform = `translate(0, 0)`;
        });

        // OnScroll text Fade in
        function HeaderOnScroll() {
            var rect = canvas.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                sectionHeader.classList.add('visible');
            } else {
                sectionHeader.classList.remove('visible');
            }
        }


        window.addEventListener('scroll', HeaderOnScroll);
    }

    // Handle canvases for both sections
    handleCanvas('polka-dot-canvas-about-me', '.about-me-header');
    handleCanvas('polka-dot-canvas-my-project', '.my-project-header');
    handleCanvas('polka-dot-canvas-contact-me', '.contact-me-header');
});

/////////////////////////////////////////////////////////////////////

// gsap.registerPlugin(ScrollTrigger)

// const tl = gsap.timeline({
//   scrollTrigger: {
//       trigger: '.my-project',
//       pin: true,
//       start: 'top-=70 top',
//       end: 'bottom top',
//       scrub: 1,
//       markers: true
//     }
// })

// tl.to('.project-card .card-text', {
//   height: 0,
//   paddingBottom: 0,
//   opacity: 0,
//   stagger: .2,
// })
// tl.to('.bottom-col .card', {
//     yPercent: -30, // Move cards up by 100% of their height
//     stagger: 0.5, // Stagger the animations for each card
//     ease: 'power1.inOut',
// }, '>')
