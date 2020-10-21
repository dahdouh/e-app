$(document).ready(function(){

    document.getElementById("searchedWord").addEventListener('keypress', (event) => {
        const nameButton = event.key;
        if (nameButton === "Enter") {
            getWordDescription();
        }
    })
})


function getWordDescription() {
    document.getElementById("ba").innerHTML = "";
    document.getElementById("definition").innerHTML = "";
    
    document.getElementById("spinner").style.display = "";
    var word = document.getElementById("searchedWord").value;
    
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
            

            //recupérer es id des relations entrantes
            var rel_entrantes = str.match(new RegExp("(r;[0-9]+;[0-9]+;"+IdFirstWord+";[0-9]+;[0-9]+)",'g')).map(function(val){
                return val.replace(/<\/?def>/g,'');
                });
                //console.log(rel_entrantes);
            //$("#ba").html(rel_entrantes);

            // IDs relations entrantes
            var filtred_entries = [];
            rel_entrantes.forEach(item => {
                var one_entry=item.split(";");
                filtred_entries.push(one_entry[2]); 
            });

    
            /**
             * Trier le résultat de recherche
             */
            //Mots de relations entrantes;
            filtred_entries.slice(1, 40).forEach(item => {
                var correspond_entries = str.match(new RegExp("(e;"+item+";.*;[0-9]+;[0-9]+)",'g')).map(function(val){
                    return val.replace(/<\/?def>/g,'');
                });

                var mots_sorted = [];
                correspond_entries.forEach(item => {
                    var word_entry=item.split(";");
                    mots_sorted.push(word_entry[2]); 
                });
                var htlm_entrantes ="";
                mots_sorted.forEach(item => { 
                    htlm_entrantes = '<span class="badge badge-warning"> <a style="color:purple;opacity:0.8;" href="http://www.jeuxdemots.org/diko.php?gotermrel='+ item +'">'+ item +' </span> &nbsp;&nbsp;';
                    document.getElementById('ba').innerHTML += htlm_entrantes;
                    
                });
                //document.getElementById('ba').innerHTML = mots_sorted;
                

                //console.log(correspond_entries);

                //var data = '<span class="badge badge-warning"> <a style="color:purple;opacity:0.8;" href="http://www.jeuxdemots.org/diko.php?gotermrel='+ item +'">'+ item +' </span> &nbsp;&nbsp;';
                //document.getElementById('ba').innerHTML += data;
            });





            
                                      
            //$("#ba").html(entries);


        },
        error: function(data) {
            alert("error : " + data[0]);
        }
    });
}

function writeDataInFile(data) {
    alert("writeDatas");
}