var tape = require('tape')
var layeredGraph = require('..').layeredGraph

tape('layeredGraph() has the expected defaults', function (test) {
  var g = layeredGraph()
  test.equal(g.id()({id: 'foo'}), 'foo')
  test.equal(g.sourceId()({source: 'bar'}), 'bar')
  test.equal(g.targetId()({target: 'baz'}), 'baz')
  test.end()
})

tape('layeredGraph(nodes, edges) builds the graph structure', function (test) {
  var g = layeredGraph()
  var l = g([
    {id: 'a'},
    {id: 'b'}
  ], [
    {source: 'a', target: 'b'}
  ])

  // test.ok(l instanceof layeredGraph)
  test.deepEqual(l.nodes, [
    {id: 'a', data: {id: 'a'}},
    {id: 'b', data: {id: 'b'}}
  ])
  test.deepEqual(l.edges, [
    {source: l.nodes[0], target: l.nodes[1], data: {source: 'a', target: 'b'}}
  ])
  test.end()
})

tape('layeredGraph(nodes, edges) observes the specified id, sourceId and targetId functions', function (test) {
  var g = layeredGraph()
      .id(function (d) { return d.foo })
      .sourceId(function (d) { return d.bar })
      .targetId(function (d) { return d.baz })

  var l = g([
    {foo: 'a'},
    {foo: 'b'}
  ], [
    {bar: 'a', baz: 'b'}
  ])

  test.deepEqual(l.nodes, [
    {id: 'a', data: {foo: 'a'}},
    {id: 'b', data: {foo: 'b'}}
  ])
  test.deepEqual(l.edges, [
    {source: l.nodes[0], target: l.nodes[1], data: {bar: 'a', baz: 'b'}}
  ])
  test.end()
})

tape('layeredGraph.id(id) tests that id is a function', function (test) {
  var g = layeredGraph()
  test.throws(function () { g.id(42) })
  test.throws(function () { g.id(null) })
  test.end()
})

tape('layeredGraph.sourceId(id) tests that id is a function', function (test) {
  var g = layeredGraph()
  test.throws(function () { g.sourceId(42) })
  test.throws(function () { g.sourceId(null) })
  test.end()
})

tape('layeredGraph.targetId(id) tests that id is a function', function (test) {
  var g = layeredGraph()
  test.throws(function () { g.targetId(42) })
  test.throws(function () { g.targetId(null) })
  test.end()
})

tape('layeredGraph(nodes, edges) throws an error if multiple nodes have the same id', function (test) {
  var g = layeredGraph()
  test.throws(function () {
    g([{id: 'a'}, {id: 'a'}], [])
  }, /\bduplicate\b/)
  test.end()
})

tape('layeredGraph(nodes, edges) throws an error if edge has missing source or target', function (test) {
  var g = layeredGraph()
  test.throws(function () {
    g([{id: 'a'}], [{source: 'a', target: 'b'}])
  }, /\bunknown\b/)
  test.end()
})