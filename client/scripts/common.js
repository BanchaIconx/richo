Date.prototype.toJSON = function () {
    return moment(this).tz('Asia/Bangkok').format();
}