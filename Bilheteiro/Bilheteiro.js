//Declaração de váriavel global que armazena o caminho:
const URI = "http://localhost:3000/"
var ids = [];
var aux = 0;


//================================================== FUNÇÕES DE RECUPERAÇÃO DE DADOS ====================================================
function carregar(url) {
	console.log('1: aqui');
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var data = JSON.parse(ajax.responseText);
			var listaFragment = document.createDocumentFragment();

			data.forEach(function (item) {




				var botaoVender = document.createElement("button");

				var listaElemento = document.createElement('tr');
				listaElemento.setAttribute("class", "linhas");

				var id = document.createElement('th');
				id.setAttribute('style', 'display: none;')
				var sala_id = document.createElement('td');
				var filme_id = document.createElement('td');
				var horario = document.createElement('td');
				var ativo = document.createElement('td');
				ativo.setAttribute('style', 'display: none;')
				var acao = document.createElement('td');

				if (item.ativo == true) {
					ids.push(item.filme_id);
					id.innerHTML = item.id;
					sala_id.innerHTML = item.sala_id;
					filme_id.innerHTML = item.filme_id;
					horario.innerHTML = item.horario;
					ativo.innerHTML = item.ativo;

					botaoVender.innerHTML = "Vender";
					botaoVender.setAttribute("onClick", "pegarInfo(this);");
					botaoVender.setAttribute("class", "btn btn-primary");
					botaoVender.setAttribute("type", "button");
					botaoVender.setAttribute("data-toggle", "modal");
					botaoVender.setAttribute("data-target", "#modalEdita");


					listaElemento.appendChild(id);
					listaElemento.appendChild(sala_id);
					listaElemento.appendChild(filme_id);
					listaElemento.appendChild(horario);
					listaElemento.appendChild(ativo);

					acao.appendChild(botaoVender);

					listaElemento.appendChild(acao);

					listaFragment.appendChild(listaElemento);
				}

			})
			loop(ids);
			document.getElementById('lista').appendChild(listaFragment);

		}
	}
	ajax.open("GET", URI + url, true);
	ajax.send();
}
function loop(idFilme) {
	for (var i = 0; i < idFilme.length; i++) {
		console.log(idFilme[i]);
		carregarNomeFilme(idFilme[i], i);
	}

}
function carregarNomeFilme(idFilme, i) {

	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var data = JSON.parse(ajax.responseText);
			var root = document.querySelectorAll('.linhas')
			root[i].childNodes[2].innerHTML = data.titulo;
			console.log(data);




		}
	}
	ajax.open("GET", URI + "filmes/" + idFilme, true);
	ajax.send();

}


carregar("emcartaz");
carregarTipoIngresso();

function carregarTipoIngresso() {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var data = JSON.parse(ajax.responseText);


			data.forEach(function (item) {
				console.log(item.descricao);
				var dropBox = document.getElementById('dropboxTipoIngresso');
				var opcao = document.createElement('option');
				opcao.setAttribute('value', item.id);
				opcao.innerHTML = item.descricao;
				dropBox.appendChild(opcao);

			});


		}

	}
	ajax.open("GET", URI + "tipoingresso", true);
	ajax.send();
}


function pegarInfo(el) {
	var root = el.parentNode.parentNode;
	var id = el.parentNode.parentNode.querySelector("th").innerHTML;
	document.getElementById("emCartazId").value = id;

}
function efetuarVenda(el) {
	var dropBox = document.getElementById('dropboxTipoIngresso');
	console.log(dropBox.selectedIndex + 1);
	var ajax = new XMLHttpRequest();
	var data = {
		emcartaz_id: parseInt(document.getElementById('emCartazId').value),
		tipoingresso_id: parseInt(dropBox.options[dropBox.selectedIndex].value),
		quantidade: parseInt(document.getElementById('qtdeIngressos').value),

	}

	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {



			removeTudo();
			carregar("emcartaz");
		}
	}

	ajax.open("POST", URI + "bilheterias", true);
	ajax.setRequestHeader('Content-type', 'application/json');
	ajax.send(JSON.stringify(data));

}

function removeTudo() {

	document.querySelectorAll(".linhas").forEach(e => e.parentNode.removeChild(e));
}

