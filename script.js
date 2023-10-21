const campoLogin = document.getElementById("login");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("novoLogin");
const campoNovaSenha = document.getElementById("novaSenha");
const campoRepSenha = document.getElementById("repSenha");

function login() {
    let login = campoLogin.value;
    let senha = campoSenha.value;
    let mensagem = "Usuário ou senha incorreta!";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));

    if (bancoDeDados == null) {
        mensagem = "Nenhum usuário cadastrado até o momento";
    } else {
        let usuarioEncontrado = false; // Adicione uma variável para rastrear se um usuário foi encontrado

        for (let usuario of bancoDeDados) {
            if (usuario.login == login && usuario.senha == senha) {
                mensagem = "Parabéns, você logou!";
                localStorage.setItem("logado", JSON.stringify(usuario));
                window.location.href = "HomePage.html";
                usuarioEncontrado = true; // Defina a variável para true quando um usuário for encontrado
                break;
            }
        }

        if (!usuarioEncontrado) {
            mensagem = "Usuário não encontrado. Faça o cadastro primeiro.";
        }
    }
    alert(mensagem);
}

function cadastro() {
    if (campoNovaSenha.value == campoRepSenha.value) {
        const usuario = {
            login: campoNovoLogin.value,
            senha: campoNovaSenha.value
        };
        let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
        if (bancoDeDados == null) {
            bancoDeDados = [];
        }
        if(verificaSeExiste(campoNovoLogin.value, bancoDeDados)){
            alert("Esse login já está cadastrado.")
        }
        else{
        bancoDeDados.push(usuario);
        localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
        alert("Usuário cadastrado com sucesso!")
        }
    } else {
        alert("As senhas são diferentes!");
    }
    window.location.href="index.html"
    
}

function verificaSeExiste(login, banco){
    for(usuario of banco){
        if(login == usuario.login){
            return true;
        }
    }
    return false;
}
function volta(){
    window.location.href="index.html"
}
function volta2(){
    window.location.href="index.html"
}
function IrCadastro(){
    window.location.href="cadastro.html"
}
function texto(){
    window.location.href="texto.html"
}

const descricaos = [];
const textos = [];
       
function add(){
        const descricao = document.getElementById("name").value.toUpperCase();
        const texto = document.getElementById("job").value.toUpperCase();

        const index = descricaos.indexOf(descricao);
        const elementos = {
            text: texto,
            datae: descricao
        };
        let bancoDeElementos = JSON.parse(localStorage.getItem("bancoDeElementos"));
        if (bancoDeElementos == null) {
            bancoDeElementos = [];
        }
        bancoDeElementos.push(elementos);
        localStorage.setItem("bancoDeElementos", JSON.stringify(bancoDeElementos));
        alert("Elemento cadastrado com sucesso!")
        
        if(index == -1){
                textos.push(texto);
                descricaos.push(descricao);
                atualizarLista();  
        }else {
                alert(`${descricao} já existe na lista.`); 
        }
        
}
        
function remove(){
        const descricao = document.getElementById("name").value.toUpperCase();
        
        const index = descricaos.indexOf(descricao);
        
        if (index !== -1) {
            descricaos.splice(descricao, 1);
            textos.splice(index, 1);
                alert(`${descricao} removido(a) com sucesso.`);
        } else {
               
                alert(`${descricao} não encontrado(a).`);
        }
           
        atualizarLista();
}
       
function atualizarLista() {
     const listaText = document.getElementById("listaPessoas");
     listaText.innerHTML = "";
           
     for (let i = 0; i < descricaos.length; i++) {
       const item = document.createElement("li");
       item.textContent = `${descricaos[i]} - ${textos[i]}`;
       listaText.appendChild(item);
     }
}