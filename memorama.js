let tarjeta1 = null;
let tarjeta2 = null;
let tarjetasDestapadas = 0;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerInicial = 40;
let tiempoRegresivo = null;
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

const rutasImagenes = [
    "Memorama/accion.png", "Memorama/accion.png",
    "Memorama/agua.png", "Memorama/agua.png",
    "Memorama/animales.png", "Memorama/animales.png",
    "Memorama/basura.png", "Memorama/basura.png",
    "Memorama/energia.png", "Memorama/energia.png",
    "Memorama/planeta.png", "Memorama/planeta.png",
    "Memorama/plantar.png", "Memorama/plantar.png",
    "Memorama/recicla.png", "Memorama/recicla.png"
];

let imagenesMezcladas = rutasImagenes.sort(() => Math.random() - 0.5);

function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer === 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.style.backgroundImage = `url(${imagenesMezcladas[i]})`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas === 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenesMezcladas[id];
        tarjeta1.style.backgroundImage = `url(${primerResultado})`;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenesMezcladas[id];
        tarjeta2.style.backgroundImage = `url(${segundoResultado})`;
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `¡Fantástico! 🥳 Terminaste en ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
            }
        } else {
            setTimeout(() => {
                tarjeta1.style.backgroundImage = 'none';
                tarjeta2.style.backgroundImage = 'none';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}