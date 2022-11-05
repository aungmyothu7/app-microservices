

function init(){
    registerButtonClickHandler('fetchCustomers',onFetchCustomersButton());
        registerButtonClickHandler('fetchAddressButton',onFetchAddressesButton());
}

function onFetchCustomersButton(){
    fetchData("/customers")
        .then(renderCustomersData);
}

function onFetchAddressesButton(){
    fetchData("/addresses")
        .then(renderAddressesData);
}

function renderCustomersData(data){
    const table=getClearTable('customers');

    renderText('fetchCustomerInfo',data["_links"]["self"].href);

    data["_embedded"]["customers"].forEach(
        customer => appendRow(table,
            customer["code"],
            customer["firstName"],
            customer["lastName"])
    );
}

function renderAddressesData(data){
    const table=getClearTable('addresses');

    renderText('fetchAddressInfo',data["_links"]["self"].href);

    data["_embedded"]["addresses"].forEach(
        address => appendRow(table,
            address["streetName"],
            address["streetNumber"],
            address["state"],
            address["city"],
            address["zipcode"])
    );
}

function registerButtonClickHandler(buttonId,eventHandler){
    document.getElementById(buttonId)
        .addEventListener('click',eventHandler);
}

function fetchData(endpoint){
    return fetch(endpoint)
        .then(date => date.json());
}

function getClearTable(tableId){
    const table=document.getElementById(tableId);
    for (let i=table.rows.length -1; i > 0 ; i--){
        table.deleteRow(i);
    }
    return table;
}

function renderText(spanId,text){
    document.getElementById(spanId).innerHTML=text;
}

function appendRow(table,...values){
    let row=table.insertRow();

    values.forEach(value => {
        let cell=row.insertCell();
        let textNode=document.createTextNode(value);
        cell.appendChild(textNode);
    });
}
document.addEventListener("DOMContentLoaded",init);