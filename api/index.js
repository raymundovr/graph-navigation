const http = require('http');
const https = require('https');
const url = require('url');

const fetchContent = url => { return new Promise( function(resolve, reject) {
	let getter = url.startsWith('https') ? https.get : http.get ;
    getter(url, res => {
	    if (res.statusCode === 200) {
			let content = '';
			res.on('data', rawData => { content += rawData; });
			res.on('end', () => resolve(content) );
	    }
	    else {
			reject(res.statusCode);
	    }
   });
	});
};


const getHyperlinks = content => {
    const rexp = /href=(\"|\'){1}(?<link>.+?)(\"|\'){1}/g;
    let links = [];
    while (match = rexp.exec(content)) {
		let link = match.groups.link;
		if (includeLink(link))
			links.push(link);
    }
    return links;
};

const includeLink = link => {
    return link.startsWith('http') || link.startsWith('/');
}

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log(req.method, req.url);
	if (req.method === 'GET') {	
		let {query} = url.parse(req.url, true);
		if (query.u) {		
			fetchContent(query.u)
			.then(content => {			
				let matches = getHyperlinks(content);
				res.statusCode = 200;				
				res.end(JSON.stringify({matches: matches}));
			})
			.catch(error => console.error(error));
		} else {
			res.end(JSON.stringify({'error': 'query does not contain a url'}));
		}
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({'error': 'not supported'}));
	}
});
server.listen(3000);

/* fetchContent('http://ray.lunasexta.org')
    .then(content => {
	    console.log("Resolved....");
	let matches = getHyperlinks(content);
	console.log(matches);
})
    .catch(error => console.error("Error: ", error)); */