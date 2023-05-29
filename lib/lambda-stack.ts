import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

//Stack lambda con la propuedad stageName para indicar en qué stage se encuentra
export class MyLamdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new Function(this, 'LambdaFunction', {
            runtime: Runtime.NODEJS_14_X,
            handler: 'handler2.handler',
            code: Code.fromAsset(path.join(__dirname, 'lambda')),
            environment: { "stageName": stageName }
        });
    }
}