const http = require('http');
const url = require('url');

const fetchContent = url => { return new Promise( function(resolve, reject) {
    http.get(url, res => {
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
	console.log(req.method);
	console.log(query);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify({message: 'Hello world!'}));
}).listen(8080);

/* fetchContent('http://ray.lunasexta.org')
    .then(content => {
	    console.log("Resolved....");
	let matches = getHyperlinks(content);
	console.log(matches);
})
    .catch(error => console.error("Error: ", error)); */