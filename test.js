function Info(request, extra, javascriptConfig, output) { this.request = request; this.extra = extra; this.javascriptConfig = javascriptConfig; this.output = output; } function ModuleRequest(url, method, headers, httpBody) { this.url = url; this.method = method; this.headers = headers; this.httpBody = httpBody; } function Extra(commands, extraInfo) { this.commands = commands; this.extraInfo = extraInfo; } function Commands(commandName, params) { this.commandName = commandName; this.params = params; } function JavascriptConfig(removeJavascript, loadInWebView, javaScript) { this.removeJavascript = removeJavascript; this.loadInWebView = loadInWebView; this.javaScript = javaScript; } function KeyValue(key, value) { this.key = key; this.value = value; } function Chapter(chapName, link,openInWebView) { this.chapName = chapName; this.link = link; this.openInWebView = openInWebView; } function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) { this.image = image; this.link = link; this.title = title; this.description = description; this.genres = genres; this.field1 = field1; this.field2 = field2; this.field3 = field3; this.field4 = field4; this.chapters = chapters; } function getStuff(array,match) { for (var x = 0 ; x< array.length;x++) { let data = array[x].innerText; if (data.includes(match)) { return data.replace(match,'').trim(); } } } function getHtmlStuff(array,match) { for (var x = 0 ; x< array.length;x++) { let data = array[x].innerText; if (data.includes(match)) { return array[x]; } } } var savedData = document.getElementById('ketsu-final-data'); var parsedJson = JSON.parse(savedData.innerHTML); let emptyKeyValue = [new KeyValue('', '')]; var episodes = []; var status = 'Unknown'; var genres = []; var desc = document.querySelector("div.post-wrapper center > fieldset:nth-child(9) > font").textContent.replaceAll('\\n',''); var duree = document.querySelector('.post-wrapper fieldset :nth-child(22)').textContent.trim(); var date = document.querySelector('.post-wrapper fieldset :nth-child(19)').textContent.trim(); genres = Array.from(document.querySelectorAll('.post-wrapper fieldset :nth-child(16)')).map(g=>g.textContent.trim()); var type = document.querySelector('.post-wrapper fieldset :nth-child(13)').textContent; var title = document.querySelector('.post-wrapper fieldset :nth-child(3)').textContent.trim(); var imf = document.querySelector('.post-wrapper center div').style.backgroundImage.substr('5'); var image = imf.substr(0,67); image = new ModuleRequest(image,'get',emptyKeyValue,null); var check = document.querySelectorAll('.inner ul li a '); for (c of check){ var epi = c.innerText; var link = c.href; var chapitre = new Chapter(epi, new ModuleRequest(link, 'get', emptyKeyValue, null), false); episodes.push(chapitre); var filt = episodes.filter(function(bon){ if(bon.chapName.includes('Episode')){ return bon.chapName; } }) } let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, duree, 'Sortie: '+date, type, 'Eps: ' + filt.length, filt)); var finalJson = JSON.stringify(infoPageObject); savedData.innerHTML = finalJson;