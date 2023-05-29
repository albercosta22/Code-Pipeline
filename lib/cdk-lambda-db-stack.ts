import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLambdaDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Tabla dynamoDB
    const tabla = new dynamodb.Table(this, "tabla",
    {partitionKey: {name : "id", type: dynamodb.AttributeType.STRING}});
    
    //Funcion Lambda
    const saveTablaFunction = new lambda.Function(this, "saveTablaFunction",
    {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'handler.saveTabla',
      code: lambda.Code.fromAsset(path.resolve(__dirname,'lambda')),
      environment:{
        TABLA: tabla.tableName,
      },
    },
    );

    //Permisos para funcion Lambda
    tabla.grantWriteData(saveTablaFunction);
    tabla.grantReadData(saveTablaFunction);


    //API Gateway
    const saveAPI = new apigw.RestApi(this, "saveAPI");

    saveAPI.root
      .resourceForPath("Hola")
      .addMethod("POST",new apigw.LambdaIntegration(saveTablaFunction))
  }
}
