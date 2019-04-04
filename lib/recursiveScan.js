// Recursively scan dynamodb table
// Requires same paramaters as dynamodb.scan()
// Compatible with dynamodb.scan()

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

module.exports = (paramsArg, callback) => {

    var params = paramsArg;

    dynamodb.scan(params, onScan);

    var Items = [];

    function onScan (err, data) {
        if(err) {
            callback(err, null);
        } else {
            Items = Items.concat(data.Items);
            if (data.LastEvaluatedKey) {
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                dynamodb.scan(params, onScan);
            } else {
                callback(null, { Items } );
            }
        }
    }
}