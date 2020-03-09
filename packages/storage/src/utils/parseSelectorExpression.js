const jsep = require("jsep");

function walk(input) {
  switch (input.type) {
    case "LogicalExpression":
      switch (input.operator) {
        case "&&":
          return {
            $and: [walk(input.left), walk(input.right)]
          };
        case "||":
          return {
            $or: [walk(input.left), walk(input.right)]
          };
        default:
          throw new Error(`Unsupported expression operator ${input.operator}`);
      }
    case "Identifier":
      return { tags: { $elemMatch: { $eq: input.name } } };
    case "Literal":
      return { _id: input.value };
    case "UnaryExpression":
      switch (input.operator) {
        case "!":
          switch (input.argument.type) {
            case "Identifier":
              return {
                tags: { $not: { $elemMatch: { $eq: input.argument.name } } }
              };
            case "Literal":
              return { _id: { $not: { $eq: input.argument.value } } };
            default:
              throw new Error(
                `Unsupported argument type ${input.argument.type} for unary expression operator !`
              );
          }
        default:
          throw new Error(
            `Unsupported unary expression operator ${input.operator}`
          );
      }
    default:
      throw new Error(`Unsupported expression element type ${input.type}`);
  }
}

module.exports = selectorExpression =>
  selectorExpression ? walk(jsep(selectorExpression)) : {};
