

function sendOTP(otp , number){
    try{
        const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: `${otp}`,
        from: '+16185684454',
        to: `+91${number}`
    })
    .then(message => console.log(message.sid))
    return "OTP sent successfully"

    }catch(e){
        console.log(e)
        return "error in sending otp"
    }

}

module.exports = sendOTP;