//Árvore permite que cada nó possua apenas um pai, porém N filhos.
//Cada nó conhece seu pai (para navegar de baixo pra cima), e seus filhos (caso se aplique, para navegar de cima pra baixo).
//Para criar a hierarquia liga-se um nó a outro com um método connect(), Ex. tree.connect(pai, filho)
define( [  'collection/Base', 'core/Common'  ], function( _Base, _Common ) {

  var TreeNode = function( id, value, parentId ) {
    this.id = ( id ) ? id : _Common.createUniqueId();
    this.value = ( value ) ? value : null;
    this.parentId = ( parentId ) ? parentId : 'trunk';
  };

  var Tree = function(){
    _Base.call( this );
  };

  Tree.prototype.put = function( id, value, parentId ) {
    // validar se o Id já existe
    // verificar se o parent existe na arvore (se ele não existe o parent é o trunk)
    var node = new TreeNode( id, value, parentId );
    this.values.push( node );
  };

  Tree.prototype.get = function( id ){
    // pegar o value com id
  };

  Tree.prototype.remove = function( id ){
    // validar se o Id já existe
    // ao remover, matar filhos recursivamente
  };

  Tree.prototype.clear = function(){
    this.values.length = 0;
  };

  Tree.prototype.move = function( id, parentId ){
    // validar se o Id e parentId existe já existe
    // se id inválido o pai vira trunk
    // acha o nó e muda o parent
  };

  Tree.prototype.listChildren = function( id ){
    // encontra os nós que tem "id" como pai
    // new array
  };

} );
