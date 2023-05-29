const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLA

exports.saveTabla  = async (event) => {
    console.log('Valor guardado')

    console.log(event);

    const name = event.queryStringParameters.name;

    const item = {
        id: name,
        name: name,
        date: Date.now()
    }

    const saveItem = await saveItem(item);
    
    
    return {
        statusCode: 200,
        body: JSON.stringify(saveItem),
    }
}

async function saveItem(item){
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };

    return dynamo.put(params).promise().then(() => {
        return item;
    });
}