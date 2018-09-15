var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000;

//c001
app.use( '/', express.static(__dirname + '/public') );
app.use( '/css', express.static(__dirname + '/src/css') );
app.use( '/img', express.static(__dirname + '/src/img') );
app.use( '/js', express.static(__dirname + '/src/js') );

app.get('/heartbeat', function(req, res) {
  res.json({
    is: 'working'
  })
});

app.listen(PORT, function() {
  console.log(`The server at port ${PORT} is listening.`);
});
