					//Declaração de váriavel global que armazena o caminho:
const URI = "http://localhost:3000/"
var ids = [];
var frags = [];
		
//================================================== FUNÇÕES DE RECUPERAÇÃO DE DADOS ====================================================
function carregar(url){
var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function() {
	if(ajax.readyState == 4 && ajax.status == 200){
		var data = JSON.parse(ajax.responseText);
		var listaFragment = document.createDocumentFragment();
		
		data.forEach(function(item){
			var col = document.createElement('div');
			col.setAttribute("class","col-sm-6 col-md-4 col-lg-3");
			col.setAttribute("id","film-"+item.id);

			var card = document.createElement('div');
			card.setAttribute("class","card");

			var cardBlock = document.createElement('div');
			cardBlock.setAttribute("class","card-block");
			
			var img = document.createElement('img');
			img.setAttribute("class","card-img-top");
			img.setAttribute("src",item.poster_link);
			var cardTitle = document.createElement('h3');
			cardTitle.setAttribute("class","card-title");
			cardTitle.innerHTML = item.titulo;
			var cardText = document.createElement('div');
			cardText.setAttribute("class","card-text");
			cardText.setAttribute("id","card-text-"+item.id);
			cardText.innerHTML = item.sinopse;
			var a = document.createElement('a');
			a.setAttribute("class","btn btn-primary");
			a.setAttribute("href","Bilheteiro/Bilheteiro.html");
			a.innerHTML = "Vender";

			cardBlock.appendChild(img);
			cardBlock.appendChild(cardTitle);
			cardBlock.appendChild(cardText);
			cardBlock.appendChild(a);
			card.appendChild(cardBlock);
			col.appendChild(card);

			listaFragment.appendChild(col)

			ids.push(item.id);
			frags.push(col);
		});
			loop(ids, frags);
		}		
	}
	ajax.open("GET", URI+url , true);
	ajax.send();
}
function loop(idsFilme, frags) {
	console.log(idsFilme, frags)
	for (var i = 0; i < idsFilme.length; i++) {
		carregarDadosEmCartaz(idsFilme[i], frags[i]);
	}

}
function carregarDadosEmCartaz(idFilme,frag){
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200){
			var data = JSON.parse(ajax.responseText);
			data.forEach(function(item){
				if(item.ativo == true){
					document.getElementById('emcartaz').appendChild(frag);
					var p = document.createElement('p');
					p.style.fontWeight = "900";
					p.innerHTML = item.horario;
					document.getElementById('card-text-'+idFilme).appendChild(p);
				}	
				else{
					document.getElementById('embreve').appendChild(frag);
				}
					
			});
		}		
	}
	ajax.open("GET",URI+"emcartaz/?filme_id="+idFilme , true);
	ajax.send();

}

carregar("filmes");
		