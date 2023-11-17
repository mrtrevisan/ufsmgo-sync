import { connect } from "./db/db.js";
import { getDateHoje, convertDate, compareDate } from "./util/util.js";
import fs from 'fs';

function checkLocal(local){
    local = local.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if      (local.match(/online/i))        return false;
    else if (local.match(/youtube/i))       return false;
    else if (local.match(/a confirmar/i))   return false;
    else if (local.match(/Argentina/i))     return false;
    else if (local.match(/cotrijal/i))      return false;
    else if (local.match(/Brasilia/i))      return false;
    else if (local.match(/Google/i))        return false;
    else if (local.match(/Itaimbé/i))       return false;
    else return true;
}

/*
function getCentro(local){   
    local = local.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if (local.match(/Centro de Tecnologia/i)                    || local.match(/CT/)        || local.match(/CT-UFSM/) )     return 'CT';
    if (local.match(/Centro de Ciencias Sociais e Humanas/i)    || local.match(/CCSH/)      || local.match(/CCSH-UFSM/) )   return 'CCSH';
    if (local.match(/Centro de Ciencias Naturais e Exatas/i)    || local.match(/CCNE/)      || local.match(/CCNE-UFSM/) )   return 'CCNE';
    if (local.match(/Centro de Educacao/i)                      || local.match(/CE/)        || local.match(/CE-UFSM/) )     return 'CE';
    if (local.match(/Centro de Ciencias Rurais/i)               || local.match(/CCR/)       || local.match(/CCR-UFSM/) )    return 'CCR';
    if (local.match(/Centro de Artes e Letras/i)                || local.match(/CAL/)       || local.match(/CAL-UFSM/) )    return 'CE';
    if (local.match(/Centro de Ciencias da Saude/i)             || local.match(/CCS/)       || local.match(/CCS-UFSM/) )    return 'CCS';
    if (local.match(/Centro de Educaçao Fisica e Desportos/i)   || local.match(/CEFD/)      || local.match(/CEFD-UFSM/) )   return 'CEFD';
    if (local.match(/Colegio Tecnico Industrial/i)              || local.match(/CTISM/)     || local.match(/CTISM-UFSM/) )  return 'CTISM';
    if (local.match(/Colegio Politecnico/i)                     || local.match(/POLI/)      || local.match(/POLITECNICO/) ) return 'POLI';
    if (local.match(/Ipe Amarelo/i)                             || local.match(/IPE/) )                                     return 'IPE';
    if (local.match(/Centro de Convencoes/i)                    || local.match(/CC/) )                                      return 'CC';
    else return 'ufsm';
}
*/

async function saveData(data, centro){
    if ( (data == null) || (data == undefined) ) {
        console.log('Skipping center. No data to process.');
        return;
    }

    var dataHoje = getDateHoje();
    
    data.forEach(async element => {
        // convertemos as datas para o formato MM/DD/YY        
        if (element.acf.evento_inicio == null) {
            console.log('1 record not inserted! Reason: no start date.');
            return;
        }
        
        var client = await connect();

        var data_ini = convertDate(element.acf.evento_inicio);
        var local = element.acf.evento_local;

        var table = "temp";
        
        //if (compareDate(data_ini, dataHoje) && checkLocal(local))
        if(true)
        {
            var data_fim = convertDate(element.acf.evento_termino);
            var query = `INSERT INTO ${table} (id, data_inicio, data_termino, local, centro, nome, link)
                        VALUES (${element.id}, ${data_ini}, ${data_fim}, ${local}, ${centro}, ${element.acf.evento_nome}, ${element.link})`;
            
            client.query(query, function(err, result) {
                if(err) {
                    console.error('1 record not inserted! Error running query! Error code: ' + err.code + " | Detail:" + err.detail);
                    
                } else {
                    console.log("1 record inserted");
                }
                client.release();
            });
            
        } 
        else {
            console.log('1 record NOT inserted! Reason: Past event');
            console.log(`data do evento: ${data_ini}`);
        }
    });
}
    
async function main() {
    let urls = fs.readFileSync('./src/urls.json', 'UTF-8');
    urls = JSON.parse(urls);

    //let qtd = 20;
    
    urls.centros.forEach(centro => {
        fetch(centro.url + "?per_page=20")
          .then(response => response.json())
          .then(data => saveData(data, centro.centro))
    });
}

main();