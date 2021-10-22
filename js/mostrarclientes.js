
function obterClientes(num, callback){	
    let url = "https://randomuser.me/api/";
    let qtd = num;
    fetch(`${url}?results=${qtd}`).then(resposta => resposta.json())
    .then(resultado => {
        callback(resultado);
    })
    .catch(erro => {
        let recipiente = document.querySelector('#lista-clientes');
        imprimirErro(recipiente, 'Não foi possível carregar a lista de clientes. Verifique sua conexão com a internet.');
    });
}
function imprimirClientes(resultado){
    let container = document.querySelector('#grid-clientes');
    let impressao = "";
    resultado.results.forEach(cliente => {
        impressao += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${cliente.picture.large}" class="foto-cliente img-fluid rounded" alt="...">
            </div>
            <div class="col-md-8">
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
function imprimirErro(recipiente, mensagem){
    recipiente.innerHTML = `
    <div class="alert alert-danger" role="alert">${mensagem}</div>
    `;
}
obterClientes(5, imprimirClientes);

