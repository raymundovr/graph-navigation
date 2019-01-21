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
	let {query} = url.parse(req.url, true);
	if (query.u) {		
		fetchContent(query.u)
		.then(content => {			
			let matches = getHyperlinks(content);
			res.writeHead(200, {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"});
			res.end(JSON.stringify({matches: matches}));
		})
		.catch(error => console.error(error));
	} else {
		res.end(JSON.stringify({query: query}));
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