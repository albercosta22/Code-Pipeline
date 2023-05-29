import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyLamdaStack } from './lambda-stack';

//Definición de la clase stage/etapa
export class MyPipelineAppStage extends cdk.Stage {
    constructor(scope: Construct, stageName: string, props?: cdk.StackProps) {
        super(scope, stageName, props);

        const lambdaStack = new MyLamdaStack(this, 'LambdaStack', stageName);
    }
}