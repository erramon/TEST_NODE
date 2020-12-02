var http = require('https');
function getRequest(host: String, path: String): Promise<Buffer>{
    var options = {
        host: host,
        path: `/${path}`
      };
    return new Promise((resolve, reject)=>{
        var req = http.get(options, function(res: any) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
          
            // Buffer the body entirely for processing as a whole.
            let bodyChunks: Array<Buffer> = [];
            res.on('data', function(chunk:Buffer) {
              // You can process streamed parts here...
              bodyChunks.push(chunk);
            }).on('end', function() {
              var body = Buffer.concat(bodyChunks);
              resolve(body)
              // ...and/or process the entire body here.
            })
          });
          
          req.on('error', function(e: Error) {
            console.log('ERROR: ' + e.message);
            reject(new Error(e.message))
          });          
    })
}

export const get = getRequest; 