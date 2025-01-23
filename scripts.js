const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();    
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro ao ler o arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}
 
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

 listaTags.addEventListener("click", (evento) => {
    // Verica o local clicado
    if (evento.target.classList.contains("remove-tag")) {
        // pega o elemento pai do elemento clicado. No caso o li
        const tagToRemove = evento.target.parentElement;
        // Pega o elemento filho e remove através do removechild
        listaTags.removeChild(tagToRemove);
    }
 })

 const tagsDisponiveis = ["Front-end", "Back-end", "Fullstack", "Mobile", "DevOps"]

//Async function para buscar as tags e retornar um promise
 async function buscarTags(tagtexto) {
    return new Promise((resolve) => {
        //set time out para simular uma busca
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagtexto));
        }, 1000)        
    })
} 

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                // seleciona e verifica se a tag existe
                const tagExiste = await buscarTags(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    // erro na busca da tag
                    alert("Tag não foi encontrada");
                } 
            } catch (error) {
                // erro na requisição de busca de tags
                console.error("Erro ao buscar as tags");
                alert("Erro ao verificar as tags");
            }
            
        }
    }
})
//Captura click no botão publicar
const btnPublicar = document.querySelector(".botao-publicar");

btnPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();
    
    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    console.log(nomeDoProjeto);
    console.log(descricaoDoProjeto);
    console.log(tagsProjeto);

})
//simula o envio par aum banco de dados
async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deucerto = Math.random() > 0.5;

            if (deucerto) {
                resolve("Projeto publicado com sucesso");
            } else {
                reject("Erro ao publicar o projeto");
            }
        }, 2000)
    })
    
}