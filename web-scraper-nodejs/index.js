//--------------- Part 1: get product code from shufersal--------------------------------------------------------- 
// for this prt you need cheerio, axios

const axios = require('axios'); 
const cheerio = require('cheerio'); 

axios.get('https://www.shufersal.co.il/online/he/search?text=%D7%A7%D7%95%D7%A8%D7%A0%D7%A4%D7%9C%D7%A7%D7%A1') 
	.then(({ data }) => { 
		const $ = cheerio.load(data); 
 
		const productCodes = $('li.tileBlock') 
			.map((_, product) => { 
				const $product = $(product); 
				const code = $product.find('[data-product-code]').data().productCode
				return code
			}) 
			.toArray(); 
		console.log(productCodes) 
	});



//--------------- part 2 (unrelated to part 1): connect to DB------------------------------------------------------
// for this part you need .env file (see stav google doc)
// also: install dotenv, express, mysql2

var talId = 2;

require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect()

app.get('/', (req, res) => {
  connection.query(`SELECT * FROM users WHERE id=${talId}`, function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


