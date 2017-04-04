const call = require('./../kinesis/kinesis');
import { sendMsg } from './../kinesis/kinesis';
import * as uuid from 'uuid';
import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
exports.ads = (event, context) => {
    findById(event, context, (err, res) => {
        console.log("starting...find by term.");
        if (null !== res) {
            console.log("[Ressult]: " + JSON.stringify(res, null, 0));
            return res;
        } else
            return '{errors:[{code:100, message:"Technical error"}]}';
    })

}



function findById(event, context, callback) {
    console.log("[search-term]: " + event.pathParameters.id, )
    const partitionKey = uuid.v1();
    const params = {
        Data: event.pathParameters.id,
        PartitionKey: partitionKey,
        StreamName: process.env.KINESIS_STREAM
    };

    // call kenisis.
    sendMsg(params, (error, result) => {
        if (error) {
            console.error("[kinesis-error]: " + JSON.stringify(error, null, 0))
            callback(new Error('Couldn\'t send the notification.'));
            return;
        }
        // create a response
        let payload: string = 'empty result';
        if (null !== result) {
            payload = `{ housing:[{
                        location: "rosemont",
                        surface: "100",
                        price: "210k",
                        available: "Yes"
                    }, {
                        location: "villeray",
                        surface: "150",
                        price: "240k",
                        available: "Yes"
                    }
                    ]}`;
        }
        const response = {
            statusCode: 200,
            body: payload,
        };
        callback(null, response);
    });
}