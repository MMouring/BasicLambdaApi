import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as BasicLambdaApiStack from '../lib/basic_lambda_api-stack';
import { getConfig } from '../lib/config';

const _CONFIG = getConfig();

test('Basic CDK Creation Test', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BasicLambdaApiStack.BasicLambdaApiStack(app, 'Test', {
        _CONFIG
    });
    // THEN

    const template = Template.fromStack(stack);

    expect(template.resourceCountIs('AWS::DynamoDB::Table', 1));
    expect(template.resourceCountIs('AWS::ApplicationAutoScaling::ScalableTarget', 2));
    expect(template.resourceCountIs('AWS::ApplicationAutoScaling::ScalingPolicy', 2));
    expect(template.resourceCountIs('AWS::Lambda::Function', 5));
    expect(template.resourceCountIs('AWS::ApiGateway::RestApi', 1));

    // TODO: Not enough time or I would build to Test specific resource properties.
    // E.G. Like TableName since it is a value that is depended on by the lambda functions as an environment variable.
});
