/**
 * Created by chris on 07/01/16.
 */

var fs = require('fs');

/*
 * FIXME: This module uses "sync" functions, which will pause your server for a tiny amount of time, once per day day.
 */
function dated_log(prefix, options) {
  var _stream = null;
  var _date = null;
  var _prefix = prefix;
		
	return function logger(ob, fn) {
    var today = new Date().toISOString().substring(0, 10);
    if (today != _date) {
      // close existing _stream and create a new file
      if (_stream) {
        _stream.close();
      }

      if (options && options.symlink) {
        // remove old symlink
        if (fs.existsSync(_prefix)) {
          const lstat = fs.lstatSync(_prefix);
          //console.log('lstat:', _prefix, lstat);
          if (lstat.isSymbolicLink()) {
            //console.log('deleting:', _prefix);
            fs.unlinkSync(_prefix);
          } else {
            //console.error('NOT deleting:', _prefix);
          }
        }
        // create new symlink
        fs.symlinkSync(_prefix + '.' + today, _prefix);
      }

      // update local state
      _stream = fs.createWriteStream(_prefix + '.' + today, {flags: 'a'});
      _date = today;
    }
		if (typeof ob === 'string') {
      _stream.write(ob + '\n', fn);
		} else if (ob.isBuffer && ob.isBuffer()) {
      _stream.write(ob, fn);
		} else {
      _stream.write(JSON.stringify(ob) + '\n', fn);
		}
	}
}

module.exports = dated_log;
