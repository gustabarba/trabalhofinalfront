
function obterClientes (callback){	
    let pedido = new XMLHttpRequest();
    let url = "https://randomuser.me/api/?results=5";
    pedido.open("GET", url, true);
    pedido.send();
    pedido.onreadystatechange = function() {
        if (this.readyState == 4) {
            try{
                if(this.status == 200){
                    callback(JSON.parse(this.responseText));
                }else{
                    throw new Error('deu ruim');
                }  
            }catch(e){
                imprimirErro();
            }        
        }
    };
}
function imprimirResultado(resultado){
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
function imprimirErro(){
    let container = document.querySelector('#lista-clientes');
    container.innerHTML = `
    <div class="alert alert-danger" role="alert">
        Não foi possível carregar a lista de clientes. Verifique sua conexão com a internet.
    </div>
    `;
}
obterClientes(imprimirResultado);

