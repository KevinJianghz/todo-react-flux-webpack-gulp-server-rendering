var express = require('express');
var expressLayouts = require('express-ejs-layouts');

var app = express();

import { renderToString } from 'react-dom/server'
import React from 'react'
import TodoApp from './react_app/src/components/TodoApp.react'
var todoAppHtml = renderToString(<TodoApp />);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render( 'index', { react_app: todoAppHtml } );
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});