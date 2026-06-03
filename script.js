/* ================================================= */
/* CARREGA TODOS OS FORMATOS */
/* ================================================= */

const creatives =
document.querySelectorAll(".creative-container");

creatives.forEach((creative) => {

    const format =
    creative.dataset.format;

    const logo =
    creative.querySelector(".logo");

    const copy =
    creative.querySelector(".copy");

    const prod =
    creative.querySelector(".prod");

    const cta =
    creative.querySelector(".cta");

    logo.style.backgroundImage =
      `url('./assets/${format}logo.png')`;

    copy.style.backgroundImage =
      `url('./assets/${format}copy.png')`;

    prod.style.backgroundImage =
      `url('./assets/${format}img.png')`;

    cta.style.backgroundImage =
      `url('./assets/${format}cta.png')`;

});


/* ================================================= */
/* FUNDO ANIMADO */
/* ================================================= */

const canvas =
document.getElementById("network-bg");

/* se não existir canvas, para aqui */
if (canvas) {

    const ctx =
    canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    class Particle {

        constructor() {

            this.x =
            Math.random() * canvas.width;

            this.y =
            Math.random() * canvas.height;

            this.vx =
            (Math.random() - 0.5) * 0.3;

            this.vy =
            (Math.random() - 0.5) * 0.3;

            this.size =
            Math.random() * 2 + 1;
        }

        update() {

            this.x += this.vx;
            this.y += this.vy;

            if (
                this.x < 0 ||
                this.x > canvas.width
            ) {
                this.vx *= -1;
            }

            if (
                this.y < 0 ||
                this.y > canvas.height
            ) {
                this.vy *= -1;
            }
        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
            "rgba(255,255,255,0.35)";

            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) {

        particles.push(
            new Particle()
        );
    }

    function connectParticles() {

        for (
            let a = 0;
            a < particles.length;
            a++
        ) {

            for (
                let b = a + 1;
                b < particles.length;
                b++
            ) {

                const dx =
                particles[a].x -
                particles[b].x;

                const dy =
                particles[a].y -
                particles[b].y;

                const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

                if (distance < 150) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.strokeStyle =
                    `rgba(255,255,255,${
                        ((150 - distance) / 150) * 0.15
                    })`;

                    ctx.stroke();
                }
            }
        }
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach((p) => {

            p.update();
            p.draw();

        });

        connectParticles();

        requestAnimationFrame(
            animate
        );
    }

    animate();
}

const replayBtn =
document.getElementById("replay-btn");

replayBtn.addEventListener(
  "click",
  () => {

    document
      .querySelectorAll(
        ".prod, .copy, .logo, .cta"
      )
      .forEach(el => {

        el.style.animation = "none";

        void el.offsetWidth;

        el.style.animation = "";
      });
  }
);