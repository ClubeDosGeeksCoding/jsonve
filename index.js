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
	for(k in obj.head){
		switch(typeof(obj.head[k])){
			case 'string': doc += '<'+k+'>'+obj.head[k]+'</'+k+'>\n'; break;
			case 'object': doc += fromObjetc(k, obj.head[k]); break;
		}
	}
	doc += '</head>\n';

	//body
	doc += '<body>\n';
	for(var i = 0 ; i < obj.body.length; i++){
		for(k in obj.body[i]){
			// console.log(obj.body[i][k])
			doc += addElement(k, obj.body[i][k])
		}
	}
	doc += '</body>\n';


	doc += '</html>';	
	return doc;

}

function fromObjetc(key, value){
	var str = '';
	content=(value.content)?value.content:'';
	content=(value.html)?value.html:'';
	for(var i = 0 ; i < value.length; i++){
		var partial = '<'+key+' ';
		for(k in value[i]){
			partial+= ' '+k+'="'+value[i][k]+'"';
		}
		partial+='>'+content+'</'+key+'>\n';
		str+=partial;
	}
	return str;
}

function addElement(key, value){
	content=(value.content)?value.content:'';
	delete value.content;
	var str = '<'+key;
	for(k in value){
		str += ' '+k+'="'+value[k]+'"';
	}
	str += '>'+content+'<'+key+'>\n';
	return str;
}

module.exports = new jsonve();