// Recursively scan dynamodb table using docClient
// Requires same paramaters as docClient.scan()
// Compatible with docClient.scan()

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (paramsArg, callback) => {

    var params = paramsArg;

    docClient.scan(params, onScan);

    var Items = [];

    function onScan (err, data) {
        if(err) {
            callback(err, null);
        } else {
            Items = Items.concat(data.Items);
            if (data.LastEvaluatedKey) {
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            } else {
                callback(null, { Items } );
            }
        }
    }
}