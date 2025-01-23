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

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova);
            inputTags.value = "";
        }
    }
})

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