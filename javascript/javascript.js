//_______________________VARIVEIS__________________________//

//CONFIGURAÇÕES DO JOGO

var velocidadeJogo =100;
var proximaPosicao = parseInt(32);
var area = 500;
var direcao = 'direita';
var altura = 0;
var acerto = false;
var inicio = true;
var pontuacao = 0;

//DEFINIÇÃO DOS BLOCOS INICIAL

var bloco1 = document.getElementsByClassName('bloco1')[0];
var bloco2 = document.getElementsByClassName('bloco2')[0];
var bloco3 = document.getElementsByClassName('bloco3')[0];
var areaJogo = document.getElementById('areaJogo');

//OBJETOS BLOCOS
var b1 = {"estado":true,"posicaoAtual": bloco1.offsetLeft};
var b2 = {"estado":true,"posicaoAtual": bloco2.offsetLeft};
var b3 = {"estado":true,"posicaoAtual": bloco3.offsetLeft};



//________________INTERVALOS DE REPETIÇÃO____________________//

var intervalo = setInterval(()=>{
    movimentarBlocos();
},velocidadeJogo)


//________________EVENTOS DE CLIQUE__________________________//

$(document).keydown((e) => {

    if(e.keyCode == 32){
        b1.estado == true ? "" : b1.estadoAnterior=false;
        b2.estado == true ? "" : b2.estadoAnterior=false;
        b3.estado == true ? "" : b3.estadoAnterior=false;

        if(b1.estadoAnterior==false){
            b1.posicaoAnterior=-99;
        }
        if(b2.estadoAnterior==false){
            b2.posicaoAnterior=-99;
        }
        if(b3.estadoAnterior==false){
            b3.posicaoAnterior=-99;
        }


        if(inicio){
            inserirBloco('bloco1');
            inserirBloco('bloco2');
            inserirBloco('bloco3');
            inicio = false;
            acerto = true;
        }else{
            verificarPosicoes();
        }
        if (acerto){
            altura+=35;
            pontuacao++;
            $('#pontuacao').html(pontuacao)
            acerto = false;
        }
        
        exibirPosicoes();
        verificarGameOver();
        verificarVitoria();
       
    }else{
        aumentarVelocidade();
    }

})

//________________________FUNÇÕES_______________________________//
function aumentarVelocidade(){
    velocidadeJogo=80;
    clearInterval(intervalo)
    intervalo = setInterval(()=>{movimentarBlocos();},velocidadeJogo);
}
function exibirPosicoes(){
    console.log("Bloco 1 posicao atual: "+ b1.posicaoAtual);
    console.log("Bloco 1 posicao anterior: "+ b1.posicaoAnterior);
    console.log("Bloco 2 posicao atual: "+ b2.posicaoAtual);
    console.log("Bloco 2 posicao anterior: "+ b2.posicaoAnterior);
    console.log("Bloco 3 posicao atual: "+ b3.posicaoAtual);
    console.log("Bloco 3 posicao anterior: "+ b3.posicaoAnterior);
    console.log("_________________________________________-")
}

function movimentarBlocos(){

    if((b3.posicaoAtual+proximaPosicao+32) >= area && direcao == 'direita'){
        direcao = 'esquerda'; 
    }else if((b1.posicaoAtual-proximaPosicao) <= -10 && direcao == 'esquerda'){
        direcao = 'direita';
    }
    switch(direcao){
        case 'direita':
                        b1.posicaoAtual = b1.posicaoAtual + proximaPosicao;
                        bloco1.style = 'left:' + b1.posicaoAtual + 'px' + ';'+'bottom:' + altura + 'px';
                    
                        b2.posicaoAtual = b2.posicaoAtual + proximaPosicao;
                        bloco2.style = 'left:' + b2.posicaoAtual + 'px' + ';'+'bottom:' + altura + 'px';
                    
                        b3.posicaoAtual = b3.posicaoAtual + proximaPosicao;
                        bloco3.style = 'left:' + b3.posicaoAtual + 'px' + ';'+'bottom:' + altura + 'px';
                        
                        break;
        case 'esquerda': 
                        b1.posicaoAtual = b1.posicaoAtual - proximaPosicao;
                        bloco1.style = 'left:' + b1.posicaoAtual + 'px' + ';'+'bottom:' + altura + 'px';
                    
                        b2.posicaoAtual = b2.posicaoAtual - proximaPosicao;
                        bloco2.style = 'left:' + b2.posicaoAtual + 'px' + ';'+'bottom:' + altura + 'px';
                    
                        b3.posicaoAtual = b3.posicaoAtual - proximaPosicao;
                        bloco3.style = 'left:' + b3.posicaoAtual + 'px' + ';'+'bottom:' + altura + 'px';
                        
                        break;
    }
}

function verificarPosicoes(){

    //______VERIFICAÇÃO BLOCO 1______//
    if(b1.estado==true && (b1.posicaoAnterior == b1.posicaoAtual || b1.posicaoAtual == b2.posicaoAnterior || b1.posicaoAtual == b3.posicaoAnterior)){
        inserirBloco('bloco1');
        acerto = true;
    }else{
        b1.estado == true ? removerBloco('bloco1') : b1.estadoAnterior=false;
        b1.estado = false;
    }

    //______VERIFICAÇÃO BLOCO 3______//
    if(b3.estado==true && (b3.posicaoAnterior == b3.posicaoAtual || b3.posicaoAtual == b1.posicaoAnterior || b3.posicaoAtual == b2.posicaoAnterior)){
        inserirBloco('bloco3');
        acerto = true;
    }else{
        b3.estado==true ? removerBloco('bloco3') : b3.estadoAnterior=false;
        b3.estado = false;
    }

    //______VERIFICAÇÃO BLOCO 2_____//
    if(b2.estado==true && (b2.posicaoAnterior == b2.posicaoAtual || b2.posicaoAtual == b1.posicaoAnterior || b2.posicaoAtual == b3.posicaoAnterior)){
        inserirBloco('bloco2');
        acerto = true;
    }else{
        b2.estado==true ? removerBloco('bloco2') : b2.estadoAnterior=false;
        b2.estado = false;
    }
    
    
}

function inserirBloco(bloco){
    let bl1;
    let bl2;
    let bl3;
    switch(bloco){
        case 'bloco1':
                        b1.posicaoAnterior = b1.posicaoAtual;
                        bloco1 = document.createElement("div");
                        bloco1.className = "bloco bloco1";
                        areaJogo.appendChild(bloco1);
                        break;

        case 'bloco2':
                        b2.posicaoAnterior = b2.posicaoAtual;
                        bloco2 = document.createElement("div");
                        bloco2.className = "bloco bloco2";
                        areaJogo.appendChild(bloco2);
                        break;

        case 'bloco3':
                        b3.posicaoAnterior = b3.posicaoAtual;
                        bloco3 = document.createElement("div");
                        bloco3.className = "bloco bloco3";
                        areaJogo.appendChild(bloco3);
                        break;
    }
}

function removerBloco(bloco){
    switch(bloco){
        case 'bloco1':  
                        bloco1.remove();
                        bloco1 = "";
                        break;
        case 'bloco2':  
                        bloco2.remove();
                        bloco2 = "";
                        break;  
        case 'bloco3':  
                        bloco3.remove();
                        bloco3 = "";
                        break;                      

    }

}

function verificarGameOver(){
    if(b1.estado==false && b2.estado==false && b3.estado==false){
        window.location.href = "gameover.html?pontuacao="+pontuacao;
    }
}

function verificarVitoria(){
    if(pontuacao ==11){
        window.location.href = "vitoria.html?pontuacao="+pontuacao;

    }
}