<!DOCTYPE html>
<html>
    <head>
        <title>Dictionnaire</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->
        <!-- <link href="assets/css/bootstrap.min.css" rel="stylesheet" media="screen"> -->
        <!-- My style -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

        <script src="http://code.jquery.com/jquery.js"></script>
        <script src="assets/js/parser.js"></script>

    </head>
    <body>
      


      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">Dictionnaire jeux des mots</h5>
        <!--
        <nav class="my-2 my-md-0 mr-md-3">
          <a class="p-2 text-dark" href="#"> </a>
          <a class="p-2 text-dark" href="#"> </a>
          <a class="p-2 text-dark" href="#"> </a>
          <a class="p-2 text-dark" href="#"> </a>
        </nav>
        <a class="btn btn-outline-primary" href="#">Sign up</a> -->
      </div>
      
      <div class="container">

        <div class="card">
          <h5 class="card-header">Chercher</h5>
          <div class="card-body">
            <h5 class="card-title"></h5>
            
              <div class="form-inline form-group" role="search">
                <label for="inputPassword6">Veuillez taper le mot chercher :  &nbsp;&nbsp;&nbsp;&nbsp;  </label>
                <input type="text" id="searchedWord" class="form-control" placeholder="Search">
                <button type="button" class="btn btn-success" onclick="getWordDescription()">
                  Chercher
                </button>
              </div>

            

          </div>
        </div>

        <i id="spinner" style="display:none;" class="fa fa-spinner fa-5x fa-pulse"></i>

        <br/>

        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne result">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   Définitions
                </button>
              </h5>
            </div>
        
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                <div id="definition"></div>
                
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Relations
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                <p id="ba" class="card-text"></p>
              </div>
            </div>
          </div>

          <?php
    $word = "";
    if(isset($_GET['word'])){
        $word = $_GET["word"];
      ?>
    
      <script type="text/javascript">
        var word = '<?php echo $word; ?>';
        console.log(word);
        getWordDescription(word);
       </script>

      <?php
    }
    ?>
          <!--
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Relations
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body">
                ########################################################
              </div>
            </div>
          </div>
          -->
        </div>
<!--
        <div id="result" class="card">
          <h5 class="card-header">Resultats</h5>
          <div class="card-body">
            <div id="definition"></div>
            <p id="ba" class="card-text"></p>
          </div>
        </div>
      -->
        <!--
        <div id="ba">

        </div>
        -->
        </div>
        

     
          <footer>
              
              <!-- <script src="assets/js/bootstrap.min.js"></script> -->
              
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

              
          </footer>
      </body>
</html>











