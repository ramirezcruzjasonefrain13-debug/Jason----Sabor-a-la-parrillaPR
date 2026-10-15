
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.querySelector("#heroCarrusel");

    if (!carrusel) return;

    const slides = Array.from(
        carrusel.querySelectorAll(".hero-slide")
    );

    const dots = Array.from(
        carrusel.querySelectorAll(".hero-dot")
    );

    const anterior = carrusel.querySelector(".hero-prev");
    const siguiente = carrusel.querySelector(".hero-next");

    if (slides.length === 0) return;

    let actual = slides.findIndex(
        slide => slide.classList.contains("active")
    );

    if (actual < 0) actual = 0;

    let temporizador;

    function mostrarSlide(indice) {
        actual = (indice + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === actual);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === actual);
            dot.setAttribute(
                "aria-current",
                i === actual ? "true" : "false"
            );
        });
    }

    function iniciarCarrusel() {
        clearInterval(temporizador);

        temporizador = setInterval(() => {
            mostrarSlide(actual + 1);
        }, 5000);
    }

    anterior?.addEventListener("click", () => {
        mostrarSlide(actual - 1);
        iniciarCarrusel();
    });

    siguiente?.addEventListener("click", () => {
        mostrarSlide(actual + 1);
        iniciarCarrusel();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            mostrarSlide(i);
            iniciarCarrusel();
        });
    });

    mostrarSlide(actual);
    iniciarCarrusel();

    // Animaciones de aparición al desplazarse
    const elementos = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            entradas => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observador.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        elementos.forEach(elemento => {
            observador.observe(elemento);
        });
    } else {
        elementos.forEach(elemento => {
            elemento.classList.add("visible");
        });
    }
});
