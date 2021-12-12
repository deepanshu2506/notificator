import * as handlebars from "handlebars";
import { HandleBarsPropertiesError } from "./Errors";

interface ITemplateEvaluationOptions {
  strictParams?: boolean;
}
export function evaluateTemplate(
  template: string,
  context: Object,
  options: ITemplateEvaluationOptions = { strictParams: false }
) {
  const hbsTemplate = handlebars.compile(template, {
    strict: options.strictParams,
  });
  try {
    const output = hbsTemplate(context);
    return output;
  } catch (err) {
    const error = err as Error;
    if (error.name === "Error") {
      throw new HandleBarsPropertiesError((err as Error).message);
    } else {
      throw err;
    }
  }
}
