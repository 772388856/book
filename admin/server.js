const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const superagent = require('superagent');
const cheerio = require('cheerio');
const _csrfToken = 'KMzX6IwSIEXKdkkENwlSZpjvnqRl5CzUnel6iQTa';
const key = '/api';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../front/dist/'));
app.use('/lists/*', express.static('../front/dist/index.html'));
app.use('/lists', express.static('../front/dist/index.html'));
app.use('/', express.static('../front/dist/index.html'));
app.use('/book/*', express.static('../front/dist/index.html'));
app.use('/book', express.static('../front/dist/index.html'));
app.use('/catalog/*', express.static('../front/dist/index.html'));
app.use('/catalog', express.static('../front/dist/index.html'));
app.use('/read/*', express.static('../front/dist/index.html'));
app.use('/read', express.static('../front/dist/index.html'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(4000);

// 男生人气排名
app.get(`${key}/lists/male/hotfree`, (req, res) => {
    superagent.get(`https://m.qidian.com/majax/recommend/hotFreelist?_csrfToken=${_csrfToken}&gender=male&pageNum=${req.query.page}`).end((req2, res2) => {
    	let str = {
	        code: '00',
	        data: ''
	    };

        if(res2.status == 200 && res2.text){
            str = res2.text;
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});

// 男生新书推荐
app.get(`${key}/lists/male/freenew`, (req, res) => {
    superagent.get(`https://m.qidian.com/majax/recommend/freeNewlist?_csrfToken=${_csrfToken}&gender=male&pageNum=${req.query.page}`).end((req2, res2) => {
        let str = {
            code: '00',
            data: ''
        };

        if(res2.status == 200 && res2.text){
            str = res2.text;
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});

// 女生人气排名
app.get(`${key}/lists/female/hotfree`, (req, res) => {
    superagent.get(`https://m.qidian.com/majax/recommend/hotFreelist?_csrfToken=${_csrfToken}&gender=female&pageNum=${req.query.page}`).end((req2, res2) => {
        let str = {
            code: '00',
            data: ''
        };

        if(res2.status == 200 && res2.text){
            str = res2.text;
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});

// 女生新书推荐
app.get(`${key}/lists/female/freenew`, (req, res) => {
    superagent.get(`https://m.qidian.com/majax/recommend/freeNewlist?_csrfToken=${_csrfToken}&gender=female&pageNum=${req.query.page}`).end((req2, res2) => {
        let str = {
            code: '00',
            data: ''
        };

        if(res2.status == 200 && res2.text){
            str = res2.text;
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});

// book描述
app.get(`${key}/book`, (req, res) => {
    superagent.get(`https://m.qidian.com/book/${req.query.id}`).end((req2, res2) => {
        let str = {
            code: '00',
            data: {
                title: ''
            }
        };

        if(res2.status == 200 && res2.text){
            const $ = cheerio.load(res2.text);

            str.data.title = $('.book-title').eq(0).text();
            str.data.img = 'https:' + $('.book-cover-blur').attr('src');
            str.data.rand = $('.book-rand-a').html();
            str.data.meta1 = $('.book-meta').eq(0).text();
            str.data.meta2 = $('.book-meta').eq(1).text();
            str.data.content = $('#bookSummary textarea').text();
            str.data.status = $('#ariaMuLu').text();
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});

// catalog章节
app.get(`${key}/catalog`, (req, res) => {
    superagent.get(`https://m.qidian.com/book/${req.query.id}/catalog`).end((req2, res2) => {
        let str = {
            code: '00',
            data: {
                title: '',
                lists: []
            }
        };

        if(res2.status == 200 && res2.text){
            const $ = cheerio.load(res2.text);

            str.data.title = $('.header-back-title').text();
            $('#volumes li').each((index, list) => {
                $(list).find('.chapter-index').text() && (str.data.lists.push({
                    text: $(list).find('.chapter-index').text(),
                    time: $(list).find('.chapter-time').text(),
                    id: $(list).find('.chapter-li-a').attr('data-chapter-id')
                }));
            });
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});

// read正文
app.get(`${key}/read`, (req, res) => {
    superagent.get(`https://m.qidian.com/book/${req.query.id}/${req.query.read}`).end((req2, res2) => {
        let str = {
            code: '00',
            data: {
                read: ''
            }
        };

        if(res2.status == 200 && res2.text){
            const $ = cheerio.load(res2.text);

            str.data.read = $('.jsChapterWrapper').html();
        }else{
            str.code = '-1';
        }
        res.send(str);
    });
});