const axios = require('axios');
const replaceSpecialCharacters = require('replace-special-characters');
const htmlDecode = require('js-htmlencode').htmlDecode;

import { parse } from 'node-html-parser';

module.exports = async (req, res) => {
    const phrase = req.url.slice(4);

    const config = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    };

    const data = await axios.get(`https://szukaj.ipn.gov.pl/search?q=${phrase}&site=&btnG=Szukaj&client=default_frontend&output=xml_no_dtd&proxystylesheet=default_frontend&sort=date%3AD%3AL%3Ad1&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&exclude_apps=1&tlen=200&size=100`, config).then((res) => {
        return res.data;
    });

    const root = parse(data);

    const results = root.querySelectorAll('.res-item > a:first-child').map(el => {
        return { link: el.attrs.href, name: htmlDecode(replaceSpecialCharacters(el.innerText)) };
    });

    res.end(JSON.stringify(results));
};

