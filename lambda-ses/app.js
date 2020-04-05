var AWS = require('aws-sdk');
var SES = new AWS.SES({region: 'eu-central-1'});

exports.handler = (event, context, callback) => {

    var currentTime = new Date();
    var email = process.env.EMAIL;
    console.log('Sending e-mail from:', email);
    console.log(event);
    var body = JSON.parse(event.body);
    console.log('body:', body);

    var params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: 'message from : ' + body.name + '\n\n' + body.message
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: body.subject
            }
        },
        Source: email,
        ReplyToAddresses: [
            body.email
        ]
    };

    SES.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err);
            callback(null, {
                statusCode: '200',
                body: JSON.stringify(err)
            });
            context.fail(err);
        } else {
            console.log(data);
            callback(null, {
                statusCode: '200',
                body: JSON.stringify(data)
            });
            context.succeed(event);
        }
    });
};