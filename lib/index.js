module.exports = function(params, templates, contexts, links, buffers, done) {

	var marked = require('marked'),
		hljs = require('highlight.js'),
		fields;

	if (params.fields && typeof params.fields === 'string') {

		fields = [params.fields];

	} else if (params.fields && typeof params.fields === 'array') {

		fields = params.fields;

	} else {

		return done('\'fields\' parameter required but missing.');

	}

	if (params.highlight) {

		marked.setOptions({
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			}
		});

	}

	Object.keys(contexts).forEach(function(c) {

		var context = contexts[c];

		fields.forEach(function(field) {

			if (context[field]) {

				context[field] = unescape(marked(context[field]));

			}

		});

	});

	done();

};