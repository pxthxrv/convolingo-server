function isValidResponse(response) {
    if (typeof response !== "string" || response.length > 1500) {
        return false;
    }

    // more validation...

    return true;
}

module.exports = {
    isValidResponse
}