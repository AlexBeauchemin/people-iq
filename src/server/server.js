import Express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import aws from 'aws-sdk';
import compression from 'compression';

let awsConfig;

try {
  awsConfig = require('../config/aws.json');
} catch (err) {
  console.error('Please add the AWS config file in \'src/config/config.json\'');
  process.exit(1);
}

aws.config.update(awsConfig.credentials);

const server = new Express();
const s3 = new aws.S3();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';


server.use(favicon('src/static/images/favicons/favicon.ico'));
server.use(bodyParser.json()); // to support JSON-encoded bodies
server.use(compression());
// server.use(Express.static(path.join(__dirname, '..', 'dist')));
// for material-ui to prefix css
server.use((req, res, next) => {
  global.navigator = {
    userAgent: req.headers['user-agent']
  };
  next();
});

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(Express.static('src/static'));

// Get signed url to upload files to amazon s3
server.post('/aws-signed-url', (req, res, next) => {
  const { filename, filetype } = req.body;
  const params = {
    ACL: 'public-read',
    Bucket: awsConfig.bucket,
    Key: filename,
    Expires: 60,
    ContentType: filetype
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) res.status(500).send(err.message);
    res.status(200).send(JSON.stringify({ url: data }));
  });
});

server.get('*', (req, res, next) => {
  res.render('index', {});
});

server.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('something went wrong...');
});

console.log(`Server is listening to port: ${port}`);
server.listen(port);
