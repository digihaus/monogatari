var Common = require('core/Common');

/**
 * A specific node used for the {@link module:collection/Tree|collection/Tree}.
 * @class TreeNode
 */
var TreeNode = function (data, parent) {
  /**
   * Actual data stored in the node.
   * @memberOf TreeNode
   * @type {Object}
   */
  this.data = data;
  /**
   * Pointer to the parent node.
   * @memberOf TreeNode
   * @type {TreeNode}
   */
  this.parent = parent;
  /**
   * Array of pointers of children nodes.
   * @memberOf TreeNode
   * @type {Array}
   */
  this.children = [];
};

/**
 * Collection of data elements sorted hierarchically from root to leaf, with child nodes connected by means of a pointer.
 * Elements can easily be inserted or removed without reallocation or reorganization of the entire structure
 * because the data items need not be stored contiguously in memory.
 * @requires core/Common
 * @exports collection/Tree
 */
var Tree = function () {
  this.root = new TreeNode('root');
};

/**
 * Finds a given value in the tree and returns the TreeNode containing it or null if not found.
 * @param {Object} data - The value to be searched
 * @param {TreeNode} [startNode] - A pointer to a TreeNode, start from root if not provided
 * @return {TreeNode}
 */
Tree.prototype.find = function (data, startNode) {
  var sNode = startNode ? startNode : this.root;

  var findAux = function (data, currentNode) {
    if (Common.equals(data, currentNode.data)) {
      return currentNode;
    } else {
      for (var i = 0; i < currentNode.children.length; i++) {
        var result = findAux(data, currentNode.children[i]);
        if (result) {
          return result;
        }
      }
      return null;
    }
  };

  return findAux(data, sNode);
};

/**
 * Puts a value inside the tree under the given parent node.
 * @param {Object} data
 * @param {TreeNode} [parent]
 */
Tree.prototype.put = function (data, parent) {
  var pNode;
  if (parent) {
    pNode = this.find(parent);
  }
  pNode = pNode ? pNode : this.root;
  pNode.children.push(new TreeNode(data, pNode));
};

/**
 * Remove a node based on given value.
 * @param {Object} data - Value stored on a TreeNode.
 */
Tree.prototype.remove = function (data) {
  var node = this.find(data);
  if (node) {
    // Remove reference from parent children
    var index;
    for (var i = 0; i < node.parent.children.length; i++) {
      if (Common.equals(node.parent.children[i].data, data)) {
        index = i;
      }
    }
    node.parent.children.splice(index, 1);
    // Remove own references
    node.parent = null;
    node.children.length = 0;
  }
};

/**
 * Clears the entire tree and flags it for garbage collection.
 */
Tree.prototype.clear = function () {
  this.root.children.length = 0;
};

/**
 * Move a given data to the new given parent.
 * @param {Object} data - Value
 * @param {TreeNode} parent - Parent node
 */
Tree.prototype.move = function (data, parent) {
  remove(data);
  put(data, parent);
};

/**
 * List of immediate children of the given data.
 * @return {Array} Array of child nodes
 */
Tree.prototype.listChildren = function (data) {
  var node = this.find(data);
  if (node) {
    return node.children;
  } else {
    return null;
  }
};

/**
 * List of all children of the given data.
 * @return {Array} Array of child nodes
 */
Tree.prototype.listDescendants = function (data) {
  var node = this.find(data);

  var listDescendantsAux = function (node, result) {
    for (var i = 0; i < node.children.length; i++) {
      result.push(node.children[i]);
      result = listDescendantsAux(node.children[i], result);
    }
    return result;
  };

  if (node) {
    return listDescendantsAux(node, []);
  } else {
    return null;
  }
};

/**
 * Transforms the tree values to an Array.
 * @return {Array}
 */
Tree.prototype.toArray = function () {
  return this.listDescendants(this.root);
};

module.exports = Tree;