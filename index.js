var fs = require('fs');

function jsonve(){

}

jsonve.prototype.render = function(template, data, options){
	if(typeof(template) == 'string'){
		var obj = JSON.parse(fs.readFileSync(template, 'utf8'));
	}else{
		var obj = template;
	}

	var doc = '<!DOCTYPE html>\n';
	doc += '<html>\n';

	// Magic

	//Head
	doc += '<head>\n';
	for(var i = 0 ; i < obj.head.length; i++){
		for(k in obj.head[i]){
			doc += addElement(k, obj.head[i][k])
		}
	}
	doc += '</head>\n';

	//body
	doc += '<body>\n';
	for(var i = 0 ; i < obj.body.length; i++){
		for(k in obj.body[i]){
			doc += addElement(k, obj.body[i][k])
		}
	}
	doc += '</body>\n';


	doc += '</html>';	
	return doc;

}

function addElement(key, value){
	content=(value.content)?value.content:'';
	delete value.content;
	var str = '<'+key;
	for(k in value){
		str += ' '+k+'="'+value[k]+'"';
	}
	str += '>\n';
	if(typeof(content)=='object'){
		for(var i = 0 ; i < content.length; i++){
			for(ky in content[i]){
				str += addElement(ky, content[i][ky]);
			}
		}
	}else{
		str+=content;
	}
	str += '</'+key+'>\n';
	return str;
}

module.exports = new jsonve();