import * as fs from 'fs';
import * as stripJSONComments from 'strip-json-comments';

export interface VSSnippet {
  prefix: string;
  body: string | string[];
}

export interface VSSnippetList {
  [name: string]: VSSnippet;
}

/**
 * Helper function to read VSCode snippet JSON-files,
 * they tend to be invalid JSON with comments...
 */
function readJSON(jsonFile: string): VSSnippetList {
  var data = fs.readFileSync(jsonFile, 'utf8');
  return JSON.parse(stripJSONComments(data));
}


if (process.argv.length < 3) {
  console.error(`You need to provide an input file`);

  process.exit(255);
} else {
  const data = readJSON(process.argv[2]);

  for (const name of Object.keys(data)) {
    let {prefix, body} = <VSSnippet>data[name];

    if (Array.isArray(body)) {
      body = body.join(`\n`);
    }

    console.log(`snippet ${prefix} "${name}"\n${body}\nendsnippet\n`);
  }
}
