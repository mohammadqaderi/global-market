const express = require('express');

const app = express();

app.use(express.static('./dist/global-market-demo'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/global-market-demo' }
  );
});

app.listen(process.env.PORT || 8080);
