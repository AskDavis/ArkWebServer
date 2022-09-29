const ogs = require('open-graph-scraper')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/article', (req, res) => {

  // with CommonJS environments
  // const { extract } = require('article-parser/dist/cjs/article-parser.js')
  // console.log(req.body.url);
  const url = req.body.url;

  const options = { url: url };
  ogs(options, (error, results, response) => {

    // console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the results object.
    // console.log('results:', results); // This contains all of the Open Graph results
    // console.log('response:', response); // This contains the HTML of page
    res.send({ status: 'SUCCESS', res: results });
  });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})