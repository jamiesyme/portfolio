function render (template, data) {
	// Regex: /{{.+?}}/
	// - the dot matches any character
	// - the plus requires at least one character within {{...}}
	// - the question mark makes the regex non-greedy
	return template.replace(/{{(.+?)}}/g, (m, key) => data[key]);
}

module.exports = { render };
