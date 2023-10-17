function isValidResponse(response) {
    if (typeof response !== "string") {
        return false;
    }

    return true;
}

module.exports = {
    isValidResponse
}