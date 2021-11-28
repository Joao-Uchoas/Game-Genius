let sequencia = [];
let sequenciaJogada = [];
let luz;
let rodada;
let acerto;
let rodadaCompleta;
let interRodada;
let dificuldade = false;
let som = true;
let ligar = false;
let ganhou;
var socket = io();  


const contadorRodada = document.querySelector("#rodada");
const botao_no = document.querySelector("#botao-no");
const botao_ne = document.querySelector("#botao-ne");
const botao_so = document.querySelector("#botao-so");
const botao_se = document.querySelector("#botao-se");
const botaoDificuldade = document.querySelector("#dificuldade");
const botaoLigar = document.querySelector("#ligar");
const botaoIniciar = document.querySelector("#iniciar");





botaoLigar.addEventListener('click', (event) => {
  if (botaoLigar.checked == true) {
    ligar = true;
    contadorRodada.innerHTML = "-";
  } else {
    ligar = false;
    contadorRodada.innerHTML = "";
    clearColor();
    clearInterval(interRodada);
  }
});


botaoIniciar.addEventListener('click', (event) => {
  if (ligar || ganhou) {
    if(botaoDificuldade.checked ){
      dificuldade = true;
    }else{
      dificuldade = false;
    }
    play();
  }
});


// para o dificuldade
function play() {
  ganhou = false;
  sequencia = [];
  sequenciaJogada = [];
  luz = 0;
  interRodada = 0;
  rodada = 1;
  contadorRodada.innerHTML = 1;
  acerto = true;
  for (var i = 0; i < 15; i++) {
    sequencia.push(Math.floor(Math.random() * 4) + 1);
  }
  
  rodadaCompleta = true;

  interRodada = setInterval(rodadas, 400);
}


//Onde o jogo rola
function check() {
  if (sequenciaJogada[sequenciaJogada.length - 1] !== sequencia[sequenciaJogada.length - 1]){
    acerto = false;
  }  
  
  if (sequenciaJogada.length === 2 && acerto && !dificuldade || sequenciaJogada.length === 3 && acerto && dificuldade) {
    vitoria();
  }


  if (acerto == false) {
    flashColor();
    contadorRodada.innerHTML = "NO!";
    setTimeout(() => {
      contadorRodada.innerHTML = rodada;
      clearColor();

      if (dificuldade) {
        play();
      } else {
        rodadaCompleta = true;
        luz = 0;
        sequenciaJogada = [];
        acerto = true;
        interRodada = setInterval(rodadas, 800);
      }
    }, 800);

  }

  if (rodada == sequenciaJogada.length && acerto && !ganhou) {
    rodada++;
    sequenciaJogada = [];
    rodadaCompleta = true;
    luz = 0;
    contadorRodada.innerHTML = rodada;
    if(dificuldade)
      interRodada = setInterval(rodadas, 400);
    else
      interRodada = setInterval(rodadas, 800);
  }

}

//Turno do game
function rodadas() {
  ligar = false;

  if (luz == rodada) {
    clearInterval(interRodada);
    rodadaCompleta = false;
    clearColor();
    ligar = true;
  }

  if (rodadaCompleta) {
    clearColor();
    setTimeout(() => {
      if (sequencia[luz] == 1) one(dificuldade);
      if (sequencia[luz] == 2) two(dificuldade);
      if (sequencia[luz] == 3) three(dificuldade);
      if (sequencia[luz] == 4) four(dificuldade);
      luz++;
    }, 200);
  }
}


// Musicas e cores || ARRUMAR O SOM QUANDO APARECE A LUZ PARA O JOGADOR(NÃO ESTA SAINDO O SOM, SÓ SAI SOM QUANDO CLICADO NO BOTÃO DA COR)
function one(condicao) {
  if(condicao == false){
    audio("clip1");
  }
  botao_no.style.backgroundColor = "#00b100";
}

function two(condicao) {
  if(condicao == false){
    audio("clip2");  
  }
  botao_ne.style.backgroundColor = "#b10000";
}

function three(condicao) {
  if(condicao == false){
    audio("clip3");
  }
  botao_so.style.backgroundColor = "#f6e714";
}

function four(condicao) {
  if(condicao == false){
    audio("clip4");
  }
  botao_se.style.backgroundColor = "#0000b1";
}

function audio(som){
  let audio = document.getElementById(som);
  audio.play();
}


//Cor acesa ou não acesa
function clearColor() {
  botao_no.style.backgroundColor = "#004b00";
  botao_ne.style.backgroundColor = "#4b0000";
  botao_so.style.backgroundColor = "#938a0c";
  botao_se.style.backgroundColor = "#00004b";
}
function flashColor() {
  botao_no.style.backgroundColor = "#00b100";
  botao_ne.style.backgroundColor = "#b10000";
  botao_so.style.backgroundColor = "#f6e714";
  botao_se.style.backgroundColor = "#0000b1";
}



// Os quatros tipos de botões
botao_no.addEventListener('click', (event) => {
  if (ligar) {
    sequenciaJogada.push(1);
    check();
    one(dificuldade);
    if(!ganhou) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
botao_ne.addEventListener('click', (event) => {
  if (ligar) {
    sequenciaJogada.push(2);
    check();
    two(dificuldade);
    if(!ganhou) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
botao_so.addEventListener('click', (event) => {
  if (ligar) {
    sequenciaJogada.push(3);
    check();
    three(dificuldade);
    if(!ganhou) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
botao_se.addEventListener('click', (event) => {
  if (ligar) {
    sequenciaJogada.push(4);
    check();
    four(dificuldade);
    if(!ganhou) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});



//Vitória!!
function vitoria() {
  flashColor();
  window.location.href = "vitoria.html";
  ligar = false;
  ganhou = true;
}




