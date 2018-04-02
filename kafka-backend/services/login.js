function handle_request(msg, callback) {
  var res = {};
  console.log('In handle request:' + JSON.stringify(msg));

  if (msg.username == 'baniyapratik@gmail.com' && msg.password == '123') {
    res.code = '200';
    res.value = 'Success Login';
  } else {
    res.code = '401';
    res.value = 'Failed Login';
  }
  callback(null, res);
}

exports.handle_request = handle_request;
