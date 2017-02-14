/**
 * Created by chris on 07/01/16.
 */

var fs = require('fs');

function Logger(prefix) {
  this._stream = null;
  this._date = null;
  this._prefix = prefix;
}

Logger.prototype.write = function(line) {
  var today = new Date().toISOString().substring(0, 10);
  if (today != this._date) {
    if (this._stream) {
      this._stream.close();
    }
    this._date = today;
    this._stream = fs.createWriteStream(this._prefix + '.' + this._date, {flags: 'a'});
  }
  this._stream.write(line + '\n');
};

exports.Logger = Logger;