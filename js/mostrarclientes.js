function obterClientes(num, callback) {
    let url = "https://randomuser.me/api/";
    let qtd = num;
    fetch(`${url}?results=${qtd}`)
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                reject(resposta);
            }
        })
        .then((resultado) => {
            callback(resultado);
        })
        .catch((erro) => {
            let recipiente = document.querySelector("#lista-clientes");
            imprimirErro(
                recipiente,
                "Não foi possível carregar a lista de clientes. Tente novamente mais tarde."
            );
        });
}
function imprimirClientes(resultado) {
    let container = document.querySelector("#lista-clientes");
    let impressao = "";

    resultado.results.forEach((cliente) => {
        impressao += `
        <div class="cliente card mb-3 col-12" >
            <div class="row g-0">
                <div class="container-foto col-12 col-sm-4 col-xl-3">
                    <img src="${cliente.picture.large}" class="foto-cliente img-fluid" alt="...">
                </div>
                <div class="col-12 col-sm-8 col-xl-9">
                    <div class="card-body">
                    <h5 class="card-title">${cliente.name.first} ${cliente.name.last}</h5>
                    <p class="card-text">${cliente.location.timezone.description}</p>
                    <p class="card-text"><a href="clientes.html" class="tema-base btn btn-primary btn-sm" tabindex="-1" role="button" aria-disabled="true">Ver cliente</a></p>
                    </div>
                </div>
            </div>
        </div> 
        `;
    });
    container.innerHTML = impressao;
}
function imprimirErro(recipiente, mensagem) {
    recipiente.innerHTML = `
    <div class="alert alert-danger" role="alert">${mensagem}</div>
    `;
}
obterClientes(5, imprimirClientes);
