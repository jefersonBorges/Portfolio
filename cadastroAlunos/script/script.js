let cadastro = [];
var i = 0;

let indexEdicao = {
    indice: null,
    cadastro: null,
    linha: null,
}
let botao = {
    edita: '<button class="botoes edicao" type="submit" onclick="editar(this)"><ion-icon name="create"></ion-icon></button>',
    deleta: '<button class="botoes edicao" type="submit" onclick="deletar(this)"><ion-icon name="trash"></ion-icon></button>',
}
let mensagens = {
    confirmaCadastro: "Deseja Realmente Efetuar o Cadastro?",
    cadastroCancelado: "Cadastramento cancelado!",
    cadastroEfetuado:"Cadastro Realizado Com Sucesso",
    confirmaEdicao:"Deseja Realmente Editar o Cadastro?",
    edicaoCancelada: "Edicao Cancelada!",
    confirmaAlteracao:"Deseja Realmente Alterar o Cadastro?",
    aleteracaoCancelada: "Alteração Cancelada!",
    alteracaoEfetuada: "Alteração Realizada Com Sucesso",
    confirmaExclusao: "Deseja Realmente Excluir o Cadastro?",
    exclusaoCancelada: "Exclusao Cancelada!",
    exclusaoEfetuada:"Exclusão Realizada Com Sucesso",
}
let titulos = {
    cadastro : "Cadastro de Alunos",
    edicao : "Edicao de Cadastro de Alunos",
}

function verificaTamanhoTela(){
    let largura = window.outerWidth;
    if (largura<1000){
        alert("Esta página é melhor visualizada em dispositivos com tela superior a 15 polegadas (1024px).");
    }
}
function verificaPreenchimentoCadastro(){
    var continuaCadastro = true;
    let erros = {
        nome: document.getElementById("erroNome"),
        telefone: document.getElementById("erroTelefone"),
        data: document.getElementById("erroData"),
        nota: document.getElementById("erroNota"),
    }
    let preenchimento = {
        nome: document.getElementById("nome"),
        telefone: document.getElementById("telefone"),
        data: document.getElementById("nascimento"),
        nota: document.getElementById("notaFinal"),
    }
    if (!preenchimento.nome.checkValidity()){
        erros.nome.innerHTML = preenchimento.nome.validationMessage;
        mostrar("erroNome");
        continuaCadastro = false;
    } else {
        esconder("erroNome");
    }
    if (!preenchimento.telefone.checkValidity()){
        erros.telefone.innerHTML = preenchimento.telefone.validationMessage;
        mostrar("erroTelefone");
        continuaCadastro = false;
    } else {
        esconder("erroTelefone");
    }
    if (!preenchimento.data.checkValidity()){
        erros.data.innerHTML = preenchimento.data.validationMessage;
        mostrar("erroData");
        continuaCadastro = false;
    } else {
        esconder("erroData");
    }
    if (!preenchimento.nota.checkValidity()){
        erros.nota.innerHTML = preenchimento.nota.validationMessage;
        mostrar("erroNota");
        continuaCadastro = false;
    } else {
        esconder("erroNota");
    }
    return continuaCadastro;
}

function cadastrar(){
    if(verificaPreenchimentoCadastro()){
        var confirma = confirm(mensagens.confirmaCadastro);
        if (confirma){
            var aluno = {
            acao: null,
            codigo: i,
            dataCriacao: null,
            dataAlteracao: null,
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            nascimento: document.getElementById("nascimento").value,
            notaFinal: (parseFloat(document.getElementById("notaFinal").value)).toFixed(2),
            situacao: null,
        }
        aluno.acao = botao.edita + botao.deleta;
        aluno.dataCriacao = setData();
        aluno.dataAlteracao = aluno.dataCriacao;
        aluno.situacao = defineSituacao(aluno.notaFinal);
        cadastro[i] = aluno;
        insereLinha(i);
        i++;
        alert(mensagens.cadastroEfetuado);
        resetFormularioCadastro();
        } else {
            alert(mensagens.cadastroCancelado);
        }
    }
}
function defineSituacao(notaFinal){
    if(notaFinal < 3.00){
        return "Reprovado";
    } else if (notaFinal < 7.00){
        return "Recuperação";
    } else if (notaFinal >= 7.00){
        return "Aprovado";
    } else {
        return "Indefinido";
    }
}
function setData(){
    const data = new Date();
    const fData = data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate() + "\n" + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return fData;
}
function insereLinha(i){
    var corpo = document.getElementById("corpoTabela");
    var linha = corpo.insertRow(-1);
    var celula0 = linha.insertCell(0);
    var celula1 = linha.insertCell(1);
    var celula2 = linha.insertCell(2);
    var celula3 = linha.insertCell(3);
    var celula4 = linha.insertCell(4);
    var celula5 = linha.insertCell(5);
    var celula6 = linha.insertCell(6);
    var celula7 = linha.insertCell(7);
    var celula8 = linha.insertCell(8);

    celula0.innerHTML = cadastro[i]["acao"];
    celula1.innerHTML = cadastro[i]["codigo"];
    celula2.innerHTML = cadastro[i]["dataCriacao"];
    celula3.innerHTML = cadastro[i]["dataAlteracao"]
    celula4.innerHTML = cadastro[i]["nome"];
    celula5.innerHTML = cadastro[i]["telefone"];
    celula6.innerHTML = cadastro[i]["nascimento"];
    celula7.innerHTML = cadastro[i]["notaFinal"];
    celula8.innerHTML = cadastro[i]["situacao"];
}
function deletaCadastro(index){
    cadastro[index] = "Excluído";
    alert(mensagens.exclusaoEfetuada);
}
function deletaLinha(index){
    document.getElementById("tabelaCadastro").deleteRow(index);
}
function setIndexEdicao(index){
    indexEdicao.indice = index.parentNode.parentNode;
    indexEdicao.cadastro = indexEdicao.indice.cells[1].innerHTML;
    indexEdicao.linha = indexEdicao.indice.rowIndex;
}
function deletar(index){
    var confirma = confirm(mensagens.confirmaExclusao);
    if(confirma){
        setIndexEdicao(index);
        deletaCadastro(indexEdicao.cadastro);
        deletaLinha(indexEdicao.linha);
    } else {
        alert(mensagens.exclusaoCancelada);
    }
}
function editar(index){
    var confirma = confirm(mensagens.confirmaEdicao);
    if(confirma){
        esconder("botaoCadastrar");
        esconder("botaoImprimir");
        mostrar("botaoAlterar");
        tituloFormularioEdicao();
        setIndexEdicao(index);
        exibeDados(indexEdicao.cadastro);
        invisivel("tabelaCadastro");
    } else {
        alert(mensagens.edicaoCancelada);
    }
}
function exibeDados(index){
    document.getElementById("nome").value = cadastro[index]["nome"];
    document.getElementById("telefone").value = cadastro[index]["telefone"];
    document.getElementById("nascimento").value = cadastro[index]["nascimento"];
    document.getElementById("notaFinal").value = cadastro[index]["notaFinal"];
}
function alterar(){
    if(verificaPreenchimentoCadastro()){
        var confirma  = confirm(mensagens.confirmaAlteracao);
        if(confirma){
            atualizarCadastro(indexEdicao.cadastro);
            atualizarTabela(indexEdicao.linha, indexEdicao.cadastro);
            esconder("botaoAlterar");
            mostrar("botaoCadastrar");
            mostrar("botaoImprimir");
            tituloFormularioCadastro();
            resetFormularioCadastro();
            visivel("tabelaCadastro");
        } else {
            alert(mensagens.aleteracaoCancelada);
        }
    } 
}
function atualizarCadastro(index){
    cadastro[index]["dataAlteracao"] = setData();
    cadastro[index]["nome"] = document.getElementById("nome").value;
    cadastro[index]["telefone"] = document.getElementById("telefone").value;
    cadastro[index]["nascimento"] = document.getElementById("nascimento").value;
    cadastro[index]["notaFinal"] = (parseFloat(document.getElementById("notaFinal").value)).toFixed(2);
    cadastro[index]["situacao"] = defineSituacao(cadastro[index]["notaFinal"]);
    alert(mensagens.alteracaoEfetuada);
}
function atualizarTabela(indexLinha, indexCadastro){
    var l = document.getElementById("tabelaCadastro").rows[indexLinha];
    var c = indexCadastro;
    l.cells[3].innerHTML = cadastro[c]["dataAlteracao"]
    l.cells[4].innerHTML = cadastro[c]["nome"];
    l.cells[5].innerHTML = cadastro[c]["telefone"];
    l.cells[6].innerHTML = cadastro[c]["nascimento"];
    l.cells[7].innerHTML = cadastro[c]["notaFinal"];
    l.cells[8].innerHTML = cadastro[c]["situacao"];
}
function esconder(id){
    document.getElementById(id).style.display = "none";
}
function mostrar(id){
    document.getElementById(id).style.display = "initial";
}
function visivel(id){
    document.getElementById(id).style.visibility = "visible";
}
function invisivel(id){
    document.getElementById(id).style.visibility = "hidden";
}
function resetFormularioCadastro(){
    document.getElementById("cadastroAlunos").reset();
}
function tituloFormularioCadastro(){
    document.getElementById("legendaFormularioCadastro").innerHTML = titulos.cadastro;
}
function tituloFormularioEdicao(){
    document.getElementById("legendaFormularioCadastro").innerHTML = titulos.edicao;
}