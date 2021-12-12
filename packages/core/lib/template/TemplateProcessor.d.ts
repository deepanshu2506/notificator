interface ITemplateEvaluationOptions {
    strictParams?: boolean;
}
export declare function evaluateTemplate(template: string, context: Object, options?: ITemplateEvaluationOptions): string;
export {};
