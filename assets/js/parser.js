/*$(document).ready(function() {

    document.getElementById("searchedWord").addEventListener('keypress', (event) => {
        const nameButton = event.key;
        if (nameButton === "Enter") {
            getWordDescription();
        }
    })
})
*/

function startReasearch() {
    var search = document.getElementById("searchedWord").value;
    console.log("###### " + search);
    getWordDescription(search);
}

var mots_sorted = [];

function getWordDescription(search) {
    document.getElementById("ba").innerHTML = "";
    document.getElementById("definition").innerHTML = "";

    document.getElementById("spinner").style.display = "";

    var type_relation = document.getElementById("type_relation").value;
    let word = "";
    if (typeof search !== 'undefined' || document.getElementById("searchedWord").value == '') {
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
            mots_sorted = [];
            //console.log(data);
            //var htmlTagRe = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
            //var plainText = html.replace(htmlTagRe, '');
            //var str = "The rain in SPAIN stays mainly in the plain";
            //var res = data.match(//<\s*def[^>]*>(.*?)<\s*/\s*def>/g);
            //var res = data.match(/(e;[0-9]+;\'[\w\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.+>=&;:?! -]+\';[0-9]+;[0-9]+.*)|(r;[0-9]+;[0-9]+;[0-9]+;[0-9]+;[0-9]+)/m);

            //var str = "<def><br />  Université. (forme utilisée surtout en Belgique)</def>";


            var str = data.replace(/(\r\n|\n|\r)/gm, " ");
            var definitions = str.match(/<def>(.*?)<\/def>/g).map(function(val) {
                return val.replace(/<\/?def>/g, '');
            });

            definitions.forEach(item => {
                var data = '<div class="alert alert-primary" role="alert"> ' + item + '</div>';
                document.getElementById('definition').innerHTML += data;

            });

            str = data.replace(/(\r\n|\n|\r)/gm, " ");

            var entries = [];
            var all_entries = [];
            var IdFirstWord = "";
            var rel_sortantes = [];
            var rel_entrantes = [];

            //toutes les entrées
            entries = str.match(/(e;[0-9]+;\'[\w\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.+>=&;:?! -]+\';[0-9]+;[0-9]+.*)|(r;[0-9]+;[0-9]+;[0-9]+;[0-9]+;[0-9]+)/g).map(function(val) {
                return val.replace(/<\/?def>/g, '');
            });

            all_entries = entries.toString().split("<br>");
            IdFirstWord = all_entries[0].split(";")[1];

            //si l'utilisateur n'a choisi aucun tyoe de relation
            if (type_relation === '-1') {
                //relation sortantes
                rel_sortantes = str.match(new RegExp('(r;[0-9]+;[0-9]+;' + IdFirstWord + ';[0-9]+;[0-9]+)', 'g')).map(function(val) {
                    return val.replace(/<\/?def>/g, '');
                });
                //relation entrantes
                rel_entrantes = str.match(new RegExp('(r;[0-9]+;' + IdFirstWord + ';[0-9]+;[0-9]+;[0-9]+)', 'g')).map(function(val) {
                    return val.replace(/<\/?def>/g, '');
                });

            } else {
                //relation sortantes
                rel_sortantes = str.match(new RegExp('(r;[0-9]+;[0-9]+;' + IdFirstWord + ';' + type_relation + ';[0-9]+)', 'g')).map(function(val) {
                    return val.replace(/<\/?def>/g, '');
                });
                //relation entrantes
                rel_entrantes = str.match(new RegExp('(r;[0-9]+;' + IdFirstWord + ';[0-9]+;' + type_relation + ';[0-9]+)', 'g')).map(function(val) {
                    return val.replace(/<\/?def>/g, '');
                });

            }

            var filtred_entries = [];
            //relations sortantes       
            rel_sortantes.forEach(item => {
                var one_entry = item.split(";");
                filtred_entries.push(one_entry[2].concat('::', one_entry[5])); //id de mot relation et son poids
            });

            //relations entrantes
            rel_entrantes.forEach(item => {
                var one_entry = item.split(";");
                filtred_entries.push(one_entry[3].concat('::', one_entry[5]));
            });


            /**
             * récuperer les mots comme résultat de recherche ==> pour chaque relation Id trouver le mot dans les entrées
             */
            //Mots de relations entrantes;


            filtred_entries.slice(1, 100).forEach(item => {
                var num_word = item.split('::')[0]; // eviter valuer vide
                var poids_word = item.split('::')[1];

                //entrées
                var correspond_entries = [];
                var correspond_entries = str.match(new RegExp("(e;" + num_word + ";.*;[0-9]+;[0-9]+)", 'g')).map(function(val) {
                    return val.replace(/<\/?def>/g, '');
                });

                correspond_entries.forEach(item => {
                    var word_entry = item.split(";");
                    //supprimer simple guillemets autour du mot
                    word_result = word_entry[2].substring(1, word_entry[2].length - 1)
                    mots_sorted.push(word_result.concat('::', poids_word));
                });

            });

            sortRelations();

            document.getElementById("ba").innerHTML = "";
            mots_sorted.forEach(word => {
                htlm_entrantes = '<span class="badge badge-warning"> <a style="color:purple;opacity:0.8;" href="http://localhost/e-app/?word=' + word.split('::')[0] + '" title="Poids= ' + word.split('::')[1] + '">' + word.split('::')[0] + ' </span> &nbsp;&nbsp;';
                document.getElementById('ba').innerHTML += htlm_entrantes;

            });


            /*
            var word = "";
            var poids = "";
            mots_sorted.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach(item => {
                poids = item.split('::')[1];
                word = item.split('::')[0];
                var htlm_entrantes = '<span class="badge badge-warning"> <a style="color:purple;opacity:0.8;" href="http://localhost/e-app/?word=' + word + '" title="Poids= ' + poids + '">' + word + ' </span> &nbsp;&nbsp;';
                document.getElementById('ba').innerHTML += htlm_entrantes;

            });
            */

            //$("#ba").html(entries);


        },
        error: function(data) {
            alert("error : " + data[0]);
        }
    });

}

function sortRelations() {
    var sort_type = document.getElementById("sort_type").value;
    //document.getElementById('ba').innerHTML = ""; // intialser DOM resultat
    //filtrer en fonction de type de tri: alphabétique ou par poids
    if (sort_type !== '-1') {
        if (sort_type === 'poids') {
            mots_sorted.sort(function(a, b) {
                var pA = a.split('::')[1];
                var pB = b.split('::')[1];
                return pB - pA;
            });

            document.getElementById("ba").innerHTML = "";
            var poids = "";
            mots_sorted.forEach(word => {
                poids = word.split('::')[1];
                word = word.split('::')[0];
                htlm_entrantes = '<span class="badge badge-warning"> <a style="color:purple;opacity:0.8;" href="http://localhost/e-app/?word=' + word + '" title="Poids= ' + poids + '">' + word + ' </span> &nbsp;&nbsp;';
                document.getElementById('ba').innerHTML += htlm_entrantes;

            });

        } else {
            var htlm_entrantes = "";
            document.getElementById("ba").innerHTML = "";
            mots_sorted.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach(word => {
                htlm_entrantes = '<span class="badge badge-warning"> <a style="color:purple;opacity:0.8;" href="http://localhost/e-app/?word=' + word.split('::')[0] + '" title="Poids= ' + word.split('::')[1] + '">' + word.split('::')[0] + ' </span> &nbsp;&nbsp;';
                document.getElementById('ba').innerHTML += htlm_entrantes;

            });

        }
    }

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