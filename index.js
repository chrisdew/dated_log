/**
 * Created by chris on 07/01/16.
 */

var fs = require('fs');

/*
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
*/

function dated_log(prefix) {
  var _stream = null;
  var _date = null;
  var _prefix = prefix;
		
	return function logger(ob) {
    var today = new Date().toISOString().substring(0, 10);
    if (today != _date) {
      if (_stream) {
        _stream.close();
      }
      _date = today;
      _stream = fs.createWriteStream(_prefix + '.' + _date, {flags: 'a'});
    }
		if (typeof ob === 'string') {
      _stream.write(ob + '\n');
		} else if (ob.isBuffer && ob.isBuffer()) {
      _stream.write(ob);
		} else {
      _stream.write(JSON.stringify(ob) + '\n');
		}
	}
}

module.exports = dated_log;
