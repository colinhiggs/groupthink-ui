Vue.component('set-container', {
  props: ['source','initialExpressionData'],
  template: `
  <fieldset>
    <legend>Set {{source}}</legend>
    <input style="width: 50em"
      v-model="expression">
    </input>
    <pre style="padding: 1em; color: red">{{parseError}}</pre>
    <div class="flex-container">
      <set-operation
        v-if="expressionData.type == 'operation'"
        :expression-data="expressionData"
        :shared-state="sharedState">
      </set-operation>
      <set-object
        v-if="expressionData.type == 'object'"
        :object="expressionData"
        :shared-state="sharedState">
      </set-object>
      <pre style="padding: 1em">{{expressionData}}</pre>
    </div>
  </fieldset>
  `,
  data: function() {
    return {
      expressionData: this.initialExpressionData,
      parseError: undefined,
      typedExpression: this.getExpression(this.initialExpressionData),
      sharedState: new Vuex.Store({
        state: {
          expressionSource: "box"
        },
        mutations: {
          expressionSource(state, value) {
            state.expressionSource = value;
          }
        }
      })
    }
  },
  computed: {
    expression: {
      get: function() {
        if(this.sharedState.state.expressionSource === 'typed') {
          return this.typedExpression;
        } else {
          return this.getExpression(this.expressionData);
        }
      },
      set: function(expression) {
        this.sharedState.commit('expressionSource', 'typed');
        this.typedExpression = expression;
        let parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        try {
          parser.feed(expression);
        } catch (err) {
          //console.log(err);
          this.parseError = "" + err;
          return;
        }
        this.parseError = null;
        if(parser.results[0] !== undefined) {
          newExpression = parser.results[0];
          this.sharedState.commit('expressionSource', 'typed');
          this.expressionData = newExpression;
        }
      }
    }
  },
  methods: {
    getExpression: function(data) {
      ex = this.getExpressionArray(data);
      if(ex[0] === "(") {
        ex.shift();
      }
      if(ex[ex.length - 1] === ")") {
        ex.pop();
      }
      return ex.join(" ");
    },
    getExpressionArray: function(data) {
      let exArray = [];
      if (data.type == "operation") {
        exArray.push("(");
        for (var i = 0; i < data.args.length; i++) {
          if(i != 0) {
            exArray.push(data.op);
          }
          subFormula = this.getExpressionArray(data.args[i]);
          for (var j = 0; j < subFormula.length; j++) {
            exArray.push(subFormula[j])
          }
        }
        exArray.push(")");
      } else if (data.type == "object") {
        exArray.push(data.value);
      }
      return exArray;
    }
  }
})

Vue.component('set-operation', {
  props: ['expressionData', 'sharedState'],
  template:`
  <div class="operation">
    <template v-for="(arg, index) in expressionData.args">
      <div>
        <select
          v-if="index != 0"
          v-model="expressionData.op"
          @input="expressionChanged"
        >
          <option>union</option>
          <option>intersect</option>
          <option>minus</option>
        </select>
      </div>
      <set-operation
        v-if="arg.type == 'operation'"
        :shared-state="sharedState"
        :expression-data="arg">
      </set-operation>
      <set-object
        v-if="arg.type == 'object'"
        :object="arg"
        :shared-state="sharedState">
      </set-object>
    </template>
  </div>
  `,
  methods: {
    expressionChanged: function(event) {
      this.sharedState.commit('expressionSource', 'operation');
    }
  }
})

Vue.component('set-object', {
  props: ['object', 'sharedState'],
  template: `
  <div>
    {{object.object_type}}:
    <input
      v-model="object.value"
      @input="expressionChanged">
    </input>
  </div>
  `,
  methods: {
    expressionChanged: function(event) {
      this.sharedState.commit('expressionSource', 'object');
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    title: 'Groupthink UI',
    expression: {
      type: 'operation',
      op: 'union',
      args: [
        {type: 'object', object_type: 'person', value: 'A'},
        {type: 'object', object_type: 'group', value: 'B'},
        {
          type: 'operation',
          op: 'intersect',
          args: [
            {type: 'object', object_type: 'group', value: 'C'},
            {type: 'object', object_type: 'group', value: 'D'}
          ]
        }
      ]
    }
  }
})
