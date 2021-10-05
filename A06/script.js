let idGrupo;
let usuario;
const paginaMensagens = document.getElementById('chat');
const paginaGrupos = document.querySelector('.paginaGrupos');
const formGrupo = document.getElementById('formGrupo');
const formMensagem = document.getElementById('formMensagem');
const formModal = document.getElementById('formModal');

/*Modal ao iniciar a página*/
$(document).ready(function(){
    $("#exampleModal").modal({backdrop: 'static', keyboard: false});
    formMensagem.style.display ='none'; 
});

formGrupo.addEventListener("submit",(event)=>{
    event.preventDefault();//Impede a atualização da página
    adicionarGrupo();
})

formMensagem.addEventListener("submit",(event)=>{
    event.preventDefault();
    adicionarMensagem();
})

/*Enviar com o enter*/
formMensagem.addEventListener("keydown",function(event){
    if(event.keyCode == 13  && !event.shiftKey){
        event.preventDefault();
        document.getElementById("bntMsg").click();
    }
})

function montarMensagem(mensagem){
    let divisor = document.createElement("div");
    divisor.classList.add("mensagem");

    let nome = document.createElement("h2");
    nome.textContent = mensagem.nome;

    let corpo = document.createElement("a");
    corpo.textContent = mensagem.corpo;

    divisor.appendChild(nome);
    divisor.appendChild(corpo);

    return divisor;
}

function montarGrupo(grupo){
    let divisor = document.createElement("div");
    divisor.classList.add("grupo");
    divisor.id = grupo.id;
    divisor.onclick = function(){carregarMensagens(divisor.id);};

    let icone = document.createElement("img");//Icon dos grupos
    icone.setAttribute('src','icon_person.png');

    let grup = document.createElement("h3");
    grup.textContent = grupo.nome;
    
    divisor.appendChild(icone);
    divisor.appendChild(grup);

    return divisor;
}

function login(){
    $("#exampleModal").modal('hide');//Esconder o modal
    usuario = document.getElementById('usuario').value;
    document.getElementById('user').innerHTML = usuario;
    carregarGrupos();
}

function rolagemAutomatica(){
	paginaMensagens.scrollTop = paginaMensagens.scrollHeight;
}