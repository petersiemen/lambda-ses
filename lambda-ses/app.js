var aws = require('aws-sdk');
var ses = new aws.SES({region: 'eu-central-1'});

exports.handler = (event, context, callback) => {

    var currentTime = new Date();
    var email = process.env.EMAIL;
    console.log('Sending e-mail from:', email);
    console.log(event);
    var body = JSON.parse(event.body);
    console.log('body:', body);
    // var subject = body.subject;
    // var message = body.message;
    //
    var params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Test"
                }
            },
            Subject: {
                Data: "bla blah"
            }
        },
        Source: email
    };
    //
    // callback(null, {
    //     statusCode: '200',
    //     body: JSON.stringify({
    //         message: 'The time is: ' + currentTime.toString(),
    //         // err: err,
    //         // data: data
    //     })
    // });
    // //
    ses.sendEmail(params, function (err, data) {
        callback(null, {
            statusCode: '200',
            body: JSON.stringify({
                message: 'The time is: ' + currentTime.toString(),
                err: err,
                data: data
            })
        });

        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            console.log(data);
            context.succeed(event);
        }
    });
};