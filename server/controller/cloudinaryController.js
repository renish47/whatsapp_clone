const cloudinary = require("cloudinary").v2

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
    secure: true,
});

exports.getSignature = (req, res, next) => {
    try {
        const timestamp = Math.round((new Date().getTime() / 1000) * 24);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
            },
            cloudinaryConfig.api_secret
        );

        res.json({ timestamp, signature })
    } catch (error) {
        console.log(error.message)
    }
}