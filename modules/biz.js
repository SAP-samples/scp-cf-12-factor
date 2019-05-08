//Biz module is your agnostic layer. It has no knowledge of ERP specific models.

module.exports = {
    GetBusinessPartners: function (options, response) {
        return (GetBusinessPartners(options, response));
    },
    PostBusinessPartners: function (options, body, response) {
        return (PostBusinessPartners(options, body, response));
    }
}

function GetBusinessPartners(options, callback) {
    
}

function PostBusinessPartners(options, body, callback) {

    
}
