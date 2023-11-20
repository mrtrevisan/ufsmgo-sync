import { connect } from "./db/db.js";
import { getDateHoje, convertDate, compareDate } from "./util/util.js";
import fs from 'fs';

const UniqueViolationErr = "23505";
var insertedRec = 0;
var skippedRec = 0;

function checkLocal(local){
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

async function saveData(data, centro){
    if ( (data == null) || (data == undefined) ) {
        console.log('Skipping center. No data to process.');
        return;
    }

    var dataHoje = getDateHoje();
    var insertedRec = 0;
    var skippedRec = 0;
    
    data.forEach(async element => {
        // convertemos as datas para o formato MM/DD/YY        
        if (element.acf.evento_inicio == null) {
            console.log('1 record not inserted! Reason: no start date.');
            return;
        }        

        const client = await connect();

        var data_ini = convertDate(element.acf.evento_inicio);
        var data_fim = convertDate(element.acf.evento_termino);
        
        centro = centro.replace("'","`");
        var local = element.acf.evento_local.replace("'","`").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        var nome = element.acf.evento_nome.replace("'","`").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        var link = element.link.replace("'","`");

        if (compareDate(data_ini, dataHoje))
        {
            var query = 'INSERT INTO evento (id, data_inicio, data_termino, local, centro, nome, link) ' +
                        'VALUES (' + element.id + ', \'' + data_ini + '\', \'' + data_fim + '\', \'' + local + '\', \'' + centro + '\', \'' + nome + '\', \'' + link + '\')';
            
            //console.log(query);           
            await client.query(query, (err, res) => {
                if(err) {
                    if (err.code === UniqueViolationErr) {
                        //console.log("Duplicate key found. 1 record skipped.");
                        skippedRec++;
                    } else {
                        console.error('1 record not inserted! Error running query! ERROR:' + err);
                    }
                } else {
                    //console.log("1 record inserted");
                    insertedRec++;
                }
            });
            
        } else {
            //console.log('1 record skipped: past event');
            skippedRec++;
        }
        await client.release();
    });
}

async function processUrls(urls){
    //let qtd = 20;
    try {
        urls.centros.forEach(async centro => {
            fetch(centro.url + "?per_page=20")
            .then(response => response.json())
            .then(data => saveData(data, centro.centro))
            
        })
        //console.log(`Inserted ${insertedRec} records; \nSkipped ${skippedRec} records;`);
    }
    catch (err) {
        console.error("Error on URL processing: " + err);
    }
}
    
async function main() {
    let urls = fs.readFileSync('./src/urls.json', 'UTF-8');
    urls = JSON.parse(urls);
    await processUrls(urls)
}

main();