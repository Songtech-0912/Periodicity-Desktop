const { app, BrowserWindow } = require('deskgap');


app.once('ready', () => {
    const win = new BrowserWindow({ 
	    titleBarStyle: 'hidden',
	    width: 1200, 
	    height: 900,
    	    show: false 
    });
    
    let splash = new BrowserWindow({ width: 810, height: 610, frame: false });
    splash.loadURL(`file://${__dirname}/splash.html`);
    splash.show();
    
    const express = require('express');
    var secure = require('express-force-https');
    var compression = require('compression');
    const port = process.env.PORT || 8080;
    const server = express();

    server.use(secure);
    server.use(compression());
    server.use(express.static(__dirname));
    server.get(/.*/, (req, res) => {
      res.sendFile(__dirname + "index.html");
    });
    server.listen(port);

    console.log("Server started...");
    win.loadURL("http://localhost:8080");

      // if main window is ready to show, then destroy the splash window and show up the main window
    win.once('ready-to-show', () => {
    splash.destroy();
    win.show();
  });
});
