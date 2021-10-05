/*Grupo*/
function listaGrupo(grupo){/*lista os grupos*/
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos/"+grupo.id,
    }).then((response)=>{
        let grupinhos = montarGrupo(grupo);
        paginaGrupos.appendChild(grupinhos);
    }).catch((error)=>{
        console.log(error);
    })
}

function carregarGrupos(){/*pega os grupos do JSON*/
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos",
    }).then((response)=>{
        let grupos = response.data;
        for(grupo of grupos){
            listaGrupo(grupo);
        }
    }).catch((error)=>{
        console.log(error);
    })
}

function adicionarGrupo(){/*adiciona no JSON*/
    let nomeGrupo = document.querySelector('.col-4 .texto');
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/grupos",
        data: {"nome": nomeGrupo.value},
    }).then((response)=>{
        listaGrupo(response.data);
        nomeGrupo.value = "";
    }).catch((error)=>{
        console.log(error);
    }) 
}

/*Mensagem*/
function carregarMensagens(id){/*lista as mensagens do JSON conforme grupo*/
    /*Rota individual*/
    paginaMensagens.innerHTML = "";
    idGrupo = id;
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos/"+id
        +"/mensagens",
    }).then((response)=>{
        let mensagens = response.data;
        for(mensagem of mensagens){
            paginaMensagens.appendChild(montarMensagem(mensagem));
            formMensagem.style.display = '';
            rolagemAutomatica();
        }
    }).catch((error)=>{
        console.log(error);
    })
}

function adicionarMensagem(){/*add uma mensagem nova JSON*/
    let texto = document.querySelector(".col .texto");
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/grupos/"+idGrupo
        +"/mensagens",
        data: {"nome": usuario,"corpo": texto.value,"grupoId": idGrupo},
    }).then((response)=>{
        carregarMensagens(idGrupo);
        texto.value = "";
    }).catch((error)=>{
        console.log(error);
    })
}