// retorna a string da data do dia atual no formato MM/DD/YY
function getDateHoje(){
    var objectDate = new Date();
    var dia = objectDate.getDate();
    var mes = objectDate.getMonth() +1;
    var ano = objectDate.getFullYear();

    if (dia.length < 2) {
        dia = '0' + dia;
    }
    if (mes.length < 2) {
        mes = '0' + mes;
    }
    var datahoje = mes + '-' + dia + '-' + ano;

    return datahoje;
}

function convertDate(StrDate){
    // Divide a string em partes: data e hora
    //console.log(`splitando data ${StrDate}` )
    var partes = StrDate.split(' ');

    // Divide a parte de data em dia, mês e ano
    var dataPartes = partes[0].split('/');

    // Obtém as partes da data
    var dia = dataPartes[0];
    var mes = dataPartes[1];
    var ano = dataPartes[2];

    if (dia.length < 2) {
        dia = '0' + dia;
    }
    if (mes.length < 2) {
        mes = '0' + mes;
    }

    // Formata a data no formato "MM/DD/YY"
    var dataFormatada = mes + '-' + dia + '-' + ano;
    return dataFormatada;
}

function compareDate(dataEvento, datahoje){
    // Resultado
    var df = new Date(dataEvento);
    var dh = new Date(datahoje);
    //console.log(`comparando datas: ${df} e ${dh}`)
    if (df > dh) return true;
    else return false;
}

export{
    compareDate,
    convertDate,
    getDateHoje
}