// Array.prototype.find is a method in ECMAScript 6. The below snippet polyfills
// the functionality if it doesn't exist in your Javascript implementation.
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var Node = function(name, attrs){
  this.edge_list = [];
  this.name = name;

  if (attrs !== undefined) {
    this.attrs = attrs;
  } else {
    this.attrs = [];
  }
}

Node.prototype.addEdge = function(end){
  this.edge_list.push(end);
}

Node.prototype.isConnected = function(node) {
  return this.edge_list.find(function(element, index, list) {
    return (element.name === node.name);
  });
}

var Graph = function(){
  this.node_list = [];
}

Graph.prototype.findNode = function(name) {
  var findNodeFilterFn = function(searchValue) {
    return (function (value) { return value.name === searchValue; });
  };

  return this.node_list.filter( findNodeFilterFn(name) )[0];
}

Graph.prototype.addEdge = function(s, e) {
  var checkConnection = function(sNode, eNode) {
    var exists = sNode.isConnected(eNode);
    if (exists) {
      console.log(`WARNING: '${sNode.name}' is already connected to '${eNode.name}'`);
    }

    return exists;
  };
  var startNode = this.findNode(s);
  var endNode = this.findNode(e);

  if (!startNode) {
    startNode = new Node(s);
    this.node_list.push(startNode);
  }

  if (!endNode) {
    endNode = new Node(e);
    this.node_list.push(endNode);
  }

  if (!checkConnection(startNode, endNode))
    startNode.addEdge(endNode);

  if (!checkConnection(endNode, startNode))
    endNode.addEdge(startNode);
}

Graph.prototype.colorGraph = function(colorCount) {
  coloredGraph = this.node_list.slice(0);

  // Sort in decreasing order of Degree(v)
  uncolored = coloredGraph.sort(function (a, b) {
    if (a.edge_list.length < b.edge_list.length) {
      return 1;
    }
    if (a.edge_list.length > b.edge_list.length) {
      return -1;
    }

    return 0;
  });

  var currentColor = 0;
  while (uncolored.length > 0) {
    var nextNode = uncolored.shift();

    nextNode.attrs.color = currentColor;
    var coloredWithCurrent = nextNode.edge_list.map(function (n) {return n.name;});

    uncolored.forEach(function(n) {
      // if not adjacent to any node using the currentColor then ...
      if (coloredWithCurrent.indexOf(n.name) === -1) {
        n.attrs.color = currentColor;
        coloredWithCurrent = coloredWithCurrent.concat(
          n.edge_list.map(function (n) {return n.name;})
        );

        var index = uncolored.indexOf(n);
        uncolored.splice(index, 1);
      }
    });

    currentColor += 1;
  }
};
