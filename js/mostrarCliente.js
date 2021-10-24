function obterValorParametroGET(nomeParametro) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === nomeParametro) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
function imprimirUsuario(cliente) {
    cliente = CryptoJS.AES.decrypt(cliente, "1234");
    cliente = cliente.toString(CryptoJS.enc.Utf8);
    cliente = JSON.parse(cliente);
    let container = document.querySelector("#detalhes-cliente");
    let impressao = "";
    impressao += `
    <div class="cliente card col-12" >
        <div class="row g-0">
            <div class="container-foto col-12 col-sm-12 col-md-4 col-xl-3">
            <span class="img-shadow">
                <img src="${
                    cliente.picture.large
                }" class="foto-cliente img-fluid" alt="...">
                </span>
            </div>
            
                <div class="col-12 col-sm-12 col-md-4 col-xl-3 card-body col-12">
                    <h5 class="card-title">
                        <b>
                            ${cliente.name.first} ${cliente.name.last}
                        </b>
                    </h5>
                    <p class="card-text">
                    <b>Idade:</b> ${cliente.dob.age}<br>
                    <b>Gênero:</b> ${
                        cliente.gender == "female" ? "feminino" : "masculino"
                    }<br>
                    <b>Email:</b> ${cliente.email}<br>
                    <b>Telefone:</b> ${cliente.phone}<br>
                    </p>
                </div>
            

            <div class="col-12">
                <div class="card-body">
                <p class="card-text">
                    
                    <b>Endereço:</b> 
                    ${cliente.location.street.name} 
                    ${cliente.location.street.number}, 
                    ${cliente.location.city}, 
                    ${cliente.location.state} – 
                    ${cliente.location.country}<br>
                </p>
                
                </div>
            </div>
            <div class="card-img-bottom col-12">
                <div style="width: 100%"><iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="border-radius:5px; background-color:#ddd" src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=${
                    cliente.location.coordinates.latitude
                },%20${
        cliente.location.coordinates.longitude
    }&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>
            </div>
        </div>
    </div> 
    `;
    container.innerHTML = impressao;
}
imprimirUsuario(obterValorParametroGET("u"));
