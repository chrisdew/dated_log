# dated_log
Log to a dated, per-day, logfile.

    var dated_log = require('dated_log');
    var log = dated_log('/var/log/foo');
    log({ts: new Date().toISOFormat(), pid: process.pid, bar: { baz: 'quux' }});
