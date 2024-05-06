/*
    2C = Two of Clubs
    2D = Two of Diamonds
    2H = Two of Hearts
    2S = Two of Spades
*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']; 

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

// esta funcion crea un nuevo deck
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo );
        }
        // deck.push( i + 'C' );
    }

    for( let tipo of tipos ) {
        for( let especial of especiales ) {
            deck.push( especial + tipo );
        }
    }
    // console.log( deck );
    deck = _.shuffle(deck);
    console.log( deck );

    return deck;
};

crearDeck();

// esta funcion toma una carta
const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    // console.log({deck});
    const carta = deck.pop();
    return carta;
    // console.log( deck );
    // console.log( carta ); // carta debe ser de la baraja
};

// pedirCarta();
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length -1 );

    return ( isNaN( valor ) ) ? ( valor === 'A' ) 
                                ? 11 : 10
                              : valor * 1;
};

// Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
    
        // <img class="carta" src="./assets/cartas/2H.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if(puntosComputadora > 21) {
            alert('Felicidades, ganaste!!');
        } else if (puntosComputadora === 21 && puntosJugador === 21 ) {
            alert('Nadie gana.');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana.');
        } else {
            alert('Computadora gana');
        }
    }, 10);
};

// const valor = valorCarta( pedirCarta() );

// console.log(valor);

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="./assets/cartas/2H.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    setTimeout(() => {
        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    }, 10);
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck              = [];
    deck              = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});
