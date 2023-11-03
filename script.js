var html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const descanso_curto = document.querySelector('.app__card-button--curto');
const descanso_longo = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const geral = document.querySelectorAll('.app__card-button');

const musica_foco = document.querySelector('#alternar-musica'); //musica de foco
const start_pause = document.querySelector('#start-pause'); // botão de iniciar ou pausar
const start_pause_botao = document.querySelector('#start-pause span');
const temporizador = document.querySelector('#timer');
const seletor_icone_pause = document.querySelector('.app__card-primary-butto-icon')

const music = new Audio('sons/luna-rise-part-one.mp3');
const som_beep = new Audio('sons/beep.mp3');
const pausar = new Audio('sons/pause.mp3');
const som_play = new Audio('sons/play.wav');

let tempo_segundos = 1500;
let intervalo_id = null;

music.loop = true;
musica_foco.addEventListener('change', () =>{
    if(music.paused){
        music.play();
    } else {
        music.pause();
    }
})

foco.addEventListener('click', () => {
    tempo_segundos = 1500;
    altera_contexto('foco');
    foco.classList.add('active');
});

descanso_curto.addEventListener('click', () => {
    tempo_segundos = 300;
    altera_contexto('descanso-curto');
    descanso_curto.classList.add('active');
});

descanso_longo.addEventListener('click', () => {
    tempo_segundos = 900;
    altera_contexto('descanso-longo');
    descanso_longo.classList.add('active');
});

function altera_contexto(contexto) {
    mostrar_temporizador()
    geral.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;

            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
};

const contagem_regressiva = () => {
    if(tempo_segundos <= 0){
        console.log('tempo finalizado!');
        // som_beep.play()
        zerar()
        return
    }
    // contagem()
    tempo_segundos -= 1;
    mostrar_temporizador()


}

start_pause.addEventListener('click', inicia_ou_pausa);



function inicia_ou_pausa(){
    
    if(intervalo_id){
        pausar.play()
        start_pause_botao.textContent = 'Começar';
        zerar()
        return
    }
    
    som_play.play()
    intervalo_id = setInterval(contagem_regressiva, 1000);
    seletor_icone_pause.setAttribute('src', '/imagens/pause.png');
    start_pause_botao.textContent = 'Pausar';
}

function zerar(){
    clearInterval(intervalo_id);
    intervalo_id = null;
}

function mostrar_temporizador(){
    const tempo = new Date(tempo_segundos * 1000);
    const tempo_formatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempo_formatado}`
}
mostrar_temporizador()