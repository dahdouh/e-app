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
            definitions.forEach(item => console.log(item));
            
            definitions.forEach(item => {
                var data = '<div class="alert alert-primary" role="alert"> '+item+'</div>';
                document.getElementById('definition').innerHTML += data;

            });

            str = data.replace(/(\r\n|\n|\r)/gm," ");
            var entries = str.match(/(e;[0-9]+;\'[\w\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.+>=&;:?! -]+\';[0-9]+;[0-9]+.*)|(r;[0-9]+;[0-9]+;[0-9]+;[0-9]+;[0-9]+)/g).map(function(val){
                                        return val.replace(/<\/?def>/g,'');
                                        });
            $("#ba").html(entries);


        },
        error: function(data) {
            alert("error : " + data[0]);
        }
    });
}

function writeDataInFile(data) {
    alert("writeDatas");
}