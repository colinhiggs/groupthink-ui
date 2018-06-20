// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

function make_op(data, op_name) {
  let op = {
    type: "operation",
    op: op_name,
    args: []
  }
  for (let i=0; i < data.length; i++) {
    let datum = data[i];
    if (Array.isArray(datum)) {
      datum = datum[0];
    }
    if(datum === null) {
      continue;
    } else {
      op.args.push(datum);
    }
  }
  return op;
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression", "symbols": ["set"], "postprocess": id},
    {"name": "expression", "symbols": ["bracketed"], "postprocess": id},
    {"name": "expression", "symbols": ["union_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["intersect_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["minus_expression"], "postprocess": id},
    {"name": "bracketed$ebnf$1", "symbols": []},
    {"name": "bracketed$ebnf$1", "symbols": ["bracketed$ebnf$1", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "bracketed$ebnf$2", "symbols": []},
    {"name": "bracketed$ebnf$2", "symbols": ["bracketed$ebnf$2", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "bracketed", "symbols": [{"literal":"("}, "bracketed$ebnf$1", "expression", "bracketed$ebnf$2", {"literal":")"}], "postprocess": 
        d => d[2]
          },
    {"name": "union_expression$ebnf$1", "symbols": ["space"]},
    {"name": "union_expression$ebnf$1", "symbols": ["union_expression$ebnf$1", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "union_expression$ebnf$2", "symbols": ["space"]},
    {"name": "union_expression$ebnf$2", "symbols": ["union_expression$ebnf$2", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "union_expression", "symbols": ["argument", "union_expression$ebnf$1", "union_op", "union_expression$ebnf$2", "argument"], "postprocess": 
        d => {
          return make_op(d, "union")
        }
            },
    {"name": "union_expression$ebnf$3", "symbols": ["space"]},
    {"name": "union_expression$ebnf$3", "symbols": ["union_expression$ebnf$3", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "union_expression$ebnf$4", "symbols": ["space"]},
    {"name": "union_expression$ebnf$4", "symbols": ["union_expression$ebnf$4", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "union_expression", "symbols": ["union_expression", "union_expression$ebnf$3", "union_op", "union_expression$ebnf$4", "argument"], "postprocess": 
        d => {
          let op = d[0];
          op.args.push(d[4][0]);
          return op;
        }
            },
    {"name": "intersect_expression$ebnf$1", "symbols": ["space"]},
    {"name": "intersect_expression$ebnf$1", "symbols": ["intersect_expression$ebnf$1", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "intersect_expression$ebnf$2", "symbols": ["space"]},
    {"name": "intersect_expression$ebnf$2", "symbols": ["intersect_expression$ebnf$2", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "intersect_expression", "symbols": ["argument", "intersect_expression$ebnf$1", "intersect_op", "intersect_expression$ebnf$2", "argument"], "postprocess": 
        d => {
          return make_op(d, "intersect")
        }
            },
    {"name": "intersect_expression$ebnf$3", "symbols": ["space"]},
    {"name": "intersect_expression$ebnf$3", "symbols": ["intersect_expression$ebnf$3", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "intersect_expression$ebnf$4", "symbols": ["space"]},
    {"name": "intersect_expression$ebnf$4", "symbols": ["intersect_expression$ebnf$4", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "intersect_expression", "symbols": ["intersect_expression", "intersect_expression$ebnf$3", "intersect_op", "intersect_expression$ebnf$4", "argument"], "postprocess": 
        d => {
          let op = d[0];
          op.args.push(d[4][0]);
          return op;
        }
            },
    {"name": "minus_expression$ebnf$1", "symbols": ["space"]},
    {"name": "minus_expression$ebnf$1", "symbols": ["minus_expression$ebnf$1", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "minus_expression$ebnf$2", "symbols": ["space"]},
    {"name": "minus_expression$ebnf$2", "symbols": ["minus_expression$ebnf$2", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "minus_expression", "symbols": ["argument", "minus_expression$ebnf$1", "minus_op", "minus_expression$ebnf$2", "argument"], "postprocess": 
        d => {
          return make_op(d, "minus")
        }
            },
    {"name": "minus_expression$ebnf$3", "symbols": ["space"]},
    {"name": "minus_expression$ebnf$3", "symbols": ["minus_expression$ebnf$3", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "minus_expression$ebnf$4", "symbols": ["space"]},
    {"name": "minus_expression$ebnf$4", "symbols": ["minus_expression$ebnf$4", "space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "minus_expression", "symbols": ["minus_expression", "minus_expression$ebnf$3", "minus_op", "minus_expression$ebnf$4", "argument"], "postprocess": 
        d => {
          let op = d[0];
          op.args.push(d[4][0]);
          return op;
        }
            },
    {"name": "union_op$subexpression$1$string$1", "symbols": [{"literal":"u"}, {"literal":"n"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "union_op$subexpression$1", "symbols": ["union_op$subexpression$1$string$1"]},
    {"name": "union_op$subexpression$1", "symbols": [{"literal":"|"}]},
    {"name": "union_op$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "union_op", "symbols": ["union_op$subexpression$1"], "postprocess": d => null},
    {"name": "intersect_op$subexpression$1$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":"s"}, {"literal":"e"}, {"literal":"c"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "intersect_op$subexpression$1", "symbols": ["intersect_op$subexpression$1$string$1"]},
    {"name": "intersect_op$subexpression$1", "symbols": [{"literal":"&"}]},
    {"name": "intersect_op$subexpression$1", "symbols": [{"literal":"^"}]},
    {"name": "intersect_op", "symbols": ["intersect_op$subexpression$1"], "postprocess": d => null},
    {"name": "minus_op$subexpression$1$string$1", "symbols": [{"literal":"m"}, {"literal":"i"}, {"literal":"n"}, {"literal":"u"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "minus_op$subexpression$1", "symbols": ["minus_op$subexpression$1$string$1"]},
    {"name": "minus_op$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "minus_op", "symbols": ["minus_op$subexpression$1"], "postprocess": d => null},
    {"name": "argument$subexpression$1", "symbols": ["set"]},
    {"name": "argument$subexpression$1", "symbols": ["bracketed"]},
    {"name": "argument", "symbols": ["argument$subexpression$1"], "postprocess": id},
    {"name": "set$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "set$ebnf$1", "symbols": ["set$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "set", "symbols": ["set$ebnf$1"], "postprocess": 
        d => { return {type: "object", object_type: "set", value: d[0][0]}}
        },
    {"name": "space", "symbols": [/[\s]/], "postprocess": d => null}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
