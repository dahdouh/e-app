$(document).ready(function(){

    document.getElementById("searchedWord").addEventListener('keypress', (event) => {
        const nameButton = event.key;
        if (nameButton === "Enter") {
            getWordDescription();
        }
    })
})


function getWordDescription(search) {
        document.getElementById("ba").innerHTML = "";
        document.getElementById("definition").innerHTML = "";
        
        document.getElementById("spinner").style.display = "";

        let word ="" ;
        if(typeof search !== 'undefined' || document.getElementById("searchedWord").value == ''){  
            word = search;
        } else {
            word = document.getElementById("searchedWord").value;
        }

        
        $.ajax({
            url: 'http://localhost/e-app/server/index.php',
            type: 'GET',
            data: 'word=' + word,

            success: function(data) {
                document.getElementById("spinner").style.display = "none";
                document.getElementById("searchedWord").value = "";
                //$("#ba").html(data);
                //console.log(data);
                //var htmlTagRe = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
                //var plainText = html.replace(htmlTagRe, '');
                //var str = "The rain in SPAIN stays mainly in the plain";
                //var res = data.match(//<\s*def[^>]*>(.*?)<\s*/\s*def>/g);
                //var res = data.match(/(e;[0-9]+;\'[\w\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.+>=&;:?! -]+\';[0-9]+;[0-9]+.*)|(r;[0-9]+;[0-9]+;[0-9]+;[0-9]+;[0-9]+)/m);
                
                //var str = "<def><br />  Université. (forme utilisée surtout en Belgique)</def>";
                

                var str = data.replace(/(\r\n|\n|\r)/gm," ");
                var definitions = str.match(/<def>(.*?)<\/def>/g).map(function(val){
                                            return val.replace(/<\/?def>/g,'');
                                            });
                //definitions.forEach(item => console.log(item));
                
                definitions.forEach(item => {
                    var data = '<div class="alert alert-primary" role="alert"> '+item+'</div>';
                    document.getElementById('definition').innerHTML += data;

                });

                str = data.replace(/(\r\n|\n|\r)/gm," ");

                //Les entries
                var entries = str.match(/(e;[0-9]+;\'[\w\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.+>=&;:?! -]+\';[0-9]+;[0-9]+.*)|(r;[0-9]+;[0-9]+;[0-9]+;[0-9]+;[0-9]+)/g).map(function(val){
                    return val.replace(/<\/?def>/g,'');
                    });
                var all_entries=entries.toString().split("<br>");
                var IdFirstWord = all_entries[0].split(";")[1];
                //console.log(IdFirstWord)
                
                var filtred_entries = [];
                //relations sortantes
                var rel_sortantes = str.match(new RegExp('(r;[0-9]+;[0-9]+;'+IdFirstWord+';[0-9]+;[0-9]+)','g')).map(function(val){
                    return val.replace(/<\/?def>/g,'');
                    });
                rel_sortantes.forEach(item => {
                    var one_entry=item.split(";");
                    filtred_entries.push(one_entry[2]); 
                });

                //relations entrantes
                var rel_entrantes = str.match(new RegExp('(r;[0-9]+;'+IdFirstWord+';[0-9]+;[0-9]+;[0-9]+)','g')).map(function(val){
                    return val.replace(/<\/?def>/g,'');
                    });
                rel_entrantes.forEach(item => {
                    var one_entry=item.split(";");
                    filtred_entries.push(one_entry[3]); 
                });

    
        
                /**
                 * Trier le résultat de recherche
                 */
                //Mots de relations entrantes;
                var mots_sorted = [];
                filtred_entries.slice(1, 40).forEach(item => {

                    //entrées
                    var correspond_entries = str.match(new RegExp("(e;"+item+";.*;[0-9]+;[0-9]+)",'g')).map(function(val){
                        return val.replace(/<\/?def>/g,'');
                    });

                    correspond_entries.forEach(item => {
                        var word_entry=item.split(";");
                        mots_sorted.push(word_entry[2]); 
                    });
                });

                // show sorted results
                var htlm_entrantes ="";
                    mots_sorted.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})).forEach(item => { 
                        //delete quote
                        let word = item.substring(1, item.length - 1);
                        //htlm_entrantes = '<span class="badge badge-warning" title="thems hoverin words"> <a style="color:purple;opacity:0.8;" onclick="getEntryCorrespond('+word+')">'+ word +' </span> &nbsp;&nbsp;';
                        htlm_entrantes = '<span class="badge badge-warning" title="thems hoverin words"> <a style="color:purple;opacity:0.8;" href="http://localhost/e-app/?word='+word+'">'+ word +' </span> &nbsp;&nbsp;';
                        document.getElementById('ba').innerHTML += htlm_entrantes;
                        
                    });





                
                                        
                //$("#ba").html(entries);


            },
            error: function(data) {
                alert("error : " + data[0]);
            }
        });
    
}

function getEntryCorrespond(word) {
   getWordDescription(word);
   /*
    document.getElementById("ba").innerHTML = "";
    document.getElementById("definition").innerHTML = "";
    
    document.getElementById("spinner").style.display = "";
    var word = document.getElementById("searchedWord").value;
    */
}

function writeDataInFile(data) {
    alert("writeDatas");
}
