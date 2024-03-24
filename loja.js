async function index() {
    const parametros = new URLSearchParams(window.location.search);
    const numero = await parametros.get("numero")
    const bot = await parametros.get("bot")

    async function wait(ms) {
        return new Promise(result => setTimeout(result, ms))
    }

    if (!(numero && bot)) {
        alert("Você precisa iniciar uma conversa com nosso Bot para iniciar sua Compra!")
        return
    }

    const produtos = [
        [
            "Camiseta Branca",
            40,
            './camiseta-branca.png',
            ['p', 'pp', 'g', 'gg']
        ],
        [
            "Regata Branca",
            40,
            './regata-branca.png'
        ],
        [
            "Calça",
            65,
            "./calca.png"
        ],
        [
            "Bermuda",
            55,
            "./bermuda.png"
        ],
        [
            "Camisa Gti",
            65,
            "./camisa-gti.png"
        ],
        [
            "Bolsa",
            25,
            "./bolsa.png"
        ],
        [
            "Squeeze",
            30,
            "./squeeze.png"
        ]
    ]

    const my_carrinho = []

    for (const v of produtos) {
        const divProduto = document.createElement("div")
        divProduto.id = 'produto'

        const img = document.createElement('img');
        img.src = v[2];
        divProduto.appendChild(img);

        const titulo = document.createElement('h1');
        titulo.textContent = v[0]+' ';
        divProduto.appendChild(titulo);

        const strong = document.createElement('strong');
        strong.textContent = v[1]+'R$';
        strong.style.color = 'rgb(43, 228, 40)';
        titulo.appendChild(strong);

        const botao = document.createElement('button');
        botao.textContent = 'Adicionar ao carrinho';
        divProduto.appendChild(botao);

        const divSelect = document.createElement('div');
        divSelect.style.display = 'flex';
        divProduto.appendChild(divSelect);

        const select = document.createElement('select');
        select.title = 'Quantidade';
        select.style.marginLeft = '10px';
        divSelect.appendChild(select);

        const optionDefault = document.createElement('option');
        optionDefault.textContent = 'Selecione a quantidade';
        optionDefault.value = "none"
        select.appendChild(optionDefault);

        for (var i = 1; i <= 10; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }

        document.querySelector("#produtos").appendChild(divProduto)

        setInterval(async ()=>{
            while (true) {
                if (select.value == "none") {
                    botao.style.display = "none"
                } else {
                    botao.style.display = "block"
                }
                await wait(10)
            }
        }, 10)

        botao.addEventListener("click", () => {
            if (botao.innerHTML == 'Adicionar ao carrinho') {
                botao.innerHTML = 'Remover do carrinho'
                const quantidade = Number(select.value)
                select.style.display = 'none'
                my_carrinho.push([
                    v[0],
                    v[1],
                    quantidade
                ])
            } else {
                select.style.display = 'block'
                botao.innerHTML = 'Adicionar ao carrinho'
                my_carrinho.splice(my_carrinho.findIndex(a => a[0] == v[0]),1)
            }
            if (my_carrinho.length == 0) {
                document.querySelector("#finalizar").style.display = 'none'
            } else {
                document.querySelector("#finalizar").style.display = 'inline-block'
            }
            console.log(my_carrinho)
        })
        //https://smoretti.squareweb.app/carrinho
        
    }

    document.querySelector("#finalizar").addEventListener("click", async () => {
        if (my_carrinho.length == 0) {
            return alert("Seu carrinho está vazio")
        }
        await fetch(`https://smoretti.squareweb.app/carrinho`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({numero: numero, carrinho: my_carrinho})
        })
        alert("Seu carrinho foi enviado para o whatsapp com sucesso!")
    })
}

index()
