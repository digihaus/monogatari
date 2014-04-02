/**
 * Load scripts dependencies detected in script file's comment in this notation: //@Requires[dependency.js]
 * 
 * Usage: scriptLoader.load(['script1.js', 'script2.js'], '/my/script/root/path', callback);
 * 
 * It loads the scripts first by reading file content for all dependent files through XMLHttpRequest, while organizing
 * the dependency hierarchy. After that, it loads the dependencies in order, adding a script tag in the head of the
 * document as a callback of the previews loaded one.
 * 
 * The drawback is that will read each script file twice. One to detect dependencies and other to load the script. It is
 * not recommended to apply this in production. Use only as a tool to organize scripts while developing, so you can work
 * with separate files when it seems easier to understand your script's logic.
 * 
 * TODO: Read dependency file just once.
 */
var scriptLoader = new ScriptLoader();
function ScriptLoader() {

  var logger = function( message ) {
    console.log( message );
  };

  this.setLogger = function( newLogger ) {
    logger = newLogger;
  };

  this.load = function( url, path, callback ) {
    var tags = detectDependencies( url, path );
    loadScripts( tags, 0, callback );
  };

  this.compile = function( url, path, target ) {
    var tags = detectDependencies( url, path );
    bootstrap( tags, target );
    //compileScripts( target );
  };

  function detectDependencies( srcs, path, tags ) {

    var tgs = (tags) ? tags : new Array();

    // percorre os srcs
    for ( var idx = 0; idx < srcs.length; idx++ ) {
      // verifica se o source é externo ou se ele está disponível localmente
      var src = ( srcs[idx].substr( 0, 4 ) == "http" ) ? srcs[idx] : path + srcs[idx];

      // prepara e envia a requisição para ler o arquivo
      var request = new XMLHttpRequest();
      request.open( "GET", src, false );
      try {
        request.send();
      } catch ( error ) {
        logger( src + ": " + error );
      }
      var response = request.responseText;

      // verifica se o arquivo existe e tem conteúdo
      if ( response != null && response.length > 0 ) {

        // ordena hierarquia
        tgs = sortHierarchy( tgs, src );

        // detecta anotação de dependências
        var lines = response.split( "\n" );
        var regex = /\[[\w|\W]+\]/; // anything between square brackets
        for ( var i = 0; i < lines.length; i++ ) {
          var line = lines[i];
          if ( line.indexOf( "@Requires" ) > 0 ) {
            var result = line.match( regex );
            if ( result != null && result.length > 0 ) {
              // para cada anotação, faz chamada recursiva para ler os outros arquivos
              var url = result[0].substr( 1, result[0].length - 2 );

              // verifica se arquivo já foi taggeado
              var tagged = false;
              for ( var k = 0; k < tgs.length; k++ ) {
                if ( tgs[k] == url ) {
                  tagged = true;
                  break;
                }
              }

              // se já foi taggeado antes, apenas ordena hierarquia
              if ( tagged ) {
                tgs = sortHierarchy( tgs, url );
              } else {
                tgs = detectDependencies( [ url ], path, tgs );
              }
            }
          }
        }

      } else {
        logger( "Cannot read script file " + src );
      }

    }

    return tgs;
  };

  function loadScripts( tags, index, callback ) {
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.onload = function() {
      logger( "Loaded script " + tags[index] );
      index++;
      if ( tags.length > index ) {
        loadScripts( tags, index, callback );
      } else {
        callback();
      }
    };
    script.src = tags[index];
    document.getElementsByTagName( "head" )[0].appendChild( script );
  };

  function bootstrap( tags, target ) {
    // percorre os srcs
    for ( var idx = 0; idx < tags.length; idx++ ) {
      var src = tags[idx];

      // prepara e envia a requisição para ler o arquivo
      var request = new XMLHttpRequest();
      request.open( "GET", src, false );
      try {
        request.send();
      } catch ( error ) {
        logger( src + ": " + error );
      }
      var response = request.responseText;

      if ( response != null && response.length > 0 ) {
        document.getElementById( target ).value += response + " ";
      }
    }
  };

  function sortHierarchy( tags, src ) {
    var length = tags.length;
    var auxTags = new Array();
    for ( var i = 0; i < length; i++ ) {
      if ( tags[i] != src ) {
        auxTags.push( tags[i] );
      }
    }
    tags = auxTags;
    tags.unshift( src );
    return tags;
  };

};