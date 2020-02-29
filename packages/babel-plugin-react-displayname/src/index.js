const t = require("@babel/types");

function addDisplayName(variableDeclarationNode) {
  const displayName = variableDeclarationNode.node.declarations[0].id.name;
  if (displayName) {
    variableDeclarationNode.insertAfter(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.memberExpression(
            t.identifier(displayName),
            t.identifier("displayName")
          ),
          t.stringLiteral(displayName)
        )
      )
    );
  }
}

/*
  Test for functional components - All return statements must be:
  - (1) a JSXElement
  - (2) null
  - (3) false
  - (4) an array the preceding items
*/
module.exports = function() {
  return {
    visitor: {
      VariableDeclaration(path) {
        path.traverse({
          ArrowFunctionExpression(arrowPath) {
            // Base case
            if (arrowPath.node.body.type === "JSXElement") {
              addDisplayName(path);
              return;
            }

            let hasJSX = false;
            let hasInvalidReturnType = false;

            arrowPath.traverse({
              ReturnStatement({
                node: {
                  argument: { type, value }
                }
              }) {
                switch (type) {
                  case "JSXElement": {
                    hasJSX = true;
                    break;
                  }
                  case "BooleanLiteral": {
                    if (value) {
                      hasInvalidReturnType = true;
                    }
                    break;
                  }
                  case "NullLiteral": {
                    break;
                  }
                  default: {
                    hasInvalidReturnType = true;
                  }
                }
              }
            });

            if (hasJSX && !hasInvalidReturnType) {
              addDisplayName(path);
            }
          }
        });
      }
    }
  };
};
