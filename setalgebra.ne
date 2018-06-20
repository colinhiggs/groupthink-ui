expression ->
    set {% id %}
  | bracketed {% id %}
  | union_expression {% id %}
  | intersect_expression {% id %}
  | minus_expression {% id %}

bracketed ->
  "(" space:* expression space:* ")" {%
    d => d[2]
  %}

@{%
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
%}

union_expression ->
    argument space:+ union_op space:+ argument {%
      d => {
        return make_op(d, "union")
      }
    %}
  | union_expression space:+ union_op space:+ argument {%
      d => {
        let op = d[0];
        op.args.push(d[4][0]);
        return op;
      }
    %}

intersect_expression ->
    argument space:+ intersect_op space:+ argument {%
      d => {
        return make_op(d, "intersect")
      }
    %}
  | intersect_expression space:+ intersect_op space:+ argument {%
      d => {
        let op = d[0];
        op.args.push(d[4][0]);
        return op;
      }
    %}

minus_expression ->
    argument space:+ minus_op space:+ argument {%
      d => {
        return make_op(d, "minus")
      }
    %}
  | minus_expression space:+ minus_op space:+ argument {%
      d => {
        let op = d[0];
        op.args.push(d[4][0]);
        return op;
      }
    %}

union_op -> ("union" | "|" | "+") {% d => null %}
intersect_op -> ("intersect" | "&" | "^") {% d => null %}
minus_op -> ("minus" | "-") {% d => null %}

argument -> (set | bracketed) {% id %}

set -> [a-zA-Z0-9]:+ {%
  d => { return {type: "object", object_type: "set", value: d[0][0]}}
%}

space -> [\s] {% d => null %}
