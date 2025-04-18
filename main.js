const encrypted_answer = '\u009c¥ľ´m¥ÆÂo±»oÂ¥¶ºĶ`¹¯Á\u009f²ÄÁpsµ®©Æn¹c®¸o±ļº¶´ļn¼«»o²¥·­®µstr´~\u0095\u0085t\u0098\u0083';

new Typewriter('#codeq', {
    strings: ['Code'],
    autoStart: true,
    loop: true,
    delay: 75,
    pauseFor: 5000,
    deleteSpeed: 1000,
    deleteChars: 0
  });

new Typewriter('#pbq', {
    strings: ['Un problème du millénaire ?'],
    autoStart: true,
    loop: true,
    delay: 75,
    pauseFor: 5000,
    deleteSpeed: 1000,
    deleteChars: 0
});

function stringToIntList(string)
{
	var s = new Array();
	for (var i = 0; i < string.length; i++) {
		s[i] = string.charCodeAt(i);
	}
	return s;
}
function intsToCharList(integers)
{
	var ints = new Array();
	for (var i = 0; i < integers.length; i++) {
		ints[i] = String.fromCharCode(integers[i]);
	}
	return ints;
}
function encrip(text, key)
{
	text = stringToIntList(text);
	key = stringToIntList(key);
	var table = makeTable();
	var keyChar = 0;
	var message = new Array();
	while(message.length<text.length) {
		for(var i = 0; i < text.length; i++) {
			var row = table[0].indexOf(key[keyChar]);
			var col = table[0].indexOf(text[i]);
			message[message.length] = table[row][col];
			if (keyChar<key.length-1) {
				keyChar++;
			} else {
				keyChar = 0;
			}
		}
	}
	message = intsToCharList(message).join("");
	return message;
}

function decrip(key, cipher)
{
	cipher = stringToIntList(cipher);
	key = stringToIntList(key);
	var table = makeTable();
	var keyChar = 0;
	var message = new Array();
	while (message.length<cipher.length) {
		for (var i = 0; i < cipher.length; i++) {
			var row = table[0].indexOf(key[keyChar]);
			var col = table[row].indexOf(cipher[i]);
			message[message.length] = table[0][col];
			if (keyChar<key.length-1) {
				keyChar++;
			} else {
				keyChar = 0;
			}
		}
	}
	message = intsToCharList(message).join("");
	return message;
}

function makeTable()
{
	var table = new Array();
	var minASCII = 1;
	var maxASCII = 2200;
	var i = 0;
	while (i+minASCII < maxASCII) {
		var line = new Array();
		for (var j = 0; j < maxASCII - minASCII; j++) {
			if (j+i+minASCII >= maxASCII) {
				line[line.length] = (j+i)-(maxASCII-minASCII)+minASCII;
			} else {
				line[line.length] = j+i+minASCII;
			}
		}
		table[table.length] = line;
		i++;
	}
	return table;
}

function inputUpdate() {
	const code = document.getElementById('codei').value;
	const pb = document.getElementById('pbi').value;

	document.getElementById('answer_text').innerHTML = decrip(code + pb, encrypted_answer);
}

	document.getElementById('answer_text').innerHTML = encrypted_answer;