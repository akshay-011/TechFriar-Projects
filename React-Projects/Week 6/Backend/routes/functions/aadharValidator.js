const axios = require('axios');

// function return checks if given uid is valid
const validateAadhaar = async (number) => {
    const options = {
    method: 'POST',
    url: 'https://aadhaar-pdf-verification3.p.rapidapi.com/Okyc/Pdf_generate_aadhaar_otp',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'f5b736b8cfmsh7c6b313a9f585e4p1f3392jsn5c1f9a90cc6c',
        'X-RapidAPI-Host': 'aadhaar-pdf-verification3.p.rapidapi.com'
    },
    data: {
        method: 'generateOTP',
        txn_id: 'hd78-hdhhsg-y658dn',
        clientid: '222',
        uidNumber: number,
        captchaValue: 'EYEYvt',
        captchaTxnId: 'PgcA1bJtiEBO',
        consent: 'Y'
    }
    };

    try {
        const response = await axios.request(options);
        if(response.data.Succeeded){
            return true
        }
        else{
            return false
        }
    } catch (error) {
        console.error(error);
        return null
    }
}
module.exports = validateAadhaar;