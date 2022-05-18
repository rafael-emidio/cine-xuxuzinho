//Declaração de váriavel global que armazena o caminho:
const URI = "http://localhost:3000/"
		
//================================================== FUNÇÕES DE RECUPERAÇÃO DE DADOS ====================================================
function carregar(url){
	console.log('aqui');
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200){
			var data = JSON.parse(ajax.responseText);
			var listaFragment = document.createDocumentFragment();
			
			data.forEach(function(item){
				var botaoEditar = document.createElement("button");
				var botaoExcluir = document.createElement("button");
				
				var listaElemento = document.createElement('tr');
				listaElemento.setAttribute("class","linhas");
				
				var id = document.createElement('th');
				var titulo = document.createElement('td');
				var ano = document.createElement('td');
				var duracao = document.createElement('td');
				var sinopse = document.createElement('td');
				var poster = document.createElement('td');
				var trailer = document.createElement('td');
				var acao = document.createElement('td');
				
				id.innerHTML = item.id;
				titulo.innerHTML = item.titulo;
				ano.innerHTML = item.ano_lancamento;
				duracao.innerHTML = item.duracao;
				sinopse.innerHTML = item.sinopse;
				poster.innerHTML = item.poster_link;
				trailer.innerHTML = item.trailer_link;
				
				sinopse.style.maxWidth = "100px";
				sinopse.style.overflow = "hidden";
				sinopse.style.whiteSpace = "nowrap";
				sinopse.style.textOverflow = "ellipsis";
				
				poster.style.maxWidth = "100px";
				poster.style.overflow = "hidden";
				poster.style.whiteSpace = "nowrap";
				poster.style.textOverflow = "ellipsis";
				
				trailer.style.maxWidth = "100px";
				trailer.style.overflow = "hidden";
				trailer.style.whiteSpace = "nowrap";
				trailer.style.textOverflow = "ellipsis";
				
				botaoEditar.innerHTML = "Editar";
				botaoExcluir.innerHTML = "Excluir";
				
				botaoEditar.setAttribute("onClick","pegarInfo(this,'editar');");
				botaoExcluir.setAttribute("onClick","pegarInfo(this,'deletar');");
				botaoEditar.setAttribute("class","btn btn-primary");
				botaoExcluir.setAttribute("class","btn btn-danger");
				botaoEditar.setAttribute("type","button");
				botaoExcluir.setAttribute("type","button");
				botaoEditar.setAttribute("data-toggle","modal");				
				botaoEditar.setAttribute("data-target","#modalEdita");

				
				
				
				
				listaElemento.appendChild(id);
				listaElemento.appendChild(titulo);
				listaElemento.appendChild(ano);
				listaElemento.appendChild(duracao);
				listaElemento.appendChild(sinopse);
				listaElemento.appendChild(poster);
				listaElemento.appendChild(trailer);
				
				acao.appendChild(botaoEditar);
				acao.appendChild(botaoExcluir);
				
				listaElemento.appendChild(acao);
				
				listaFragment.appendChild(listaElemento);
			});
			
				document.getElementById('lista').appendChild(listaFragment);
			}		
		}
	    	ajax.open("GET", URI+url , true);
			ajax.send();
	}
		carregar("filmes");
		
		
		function pegarInfo(el,tipo){
			if(tipo=="editar"){
				var root = el.parentNode.parentNode;
				
				console.log(root);
				console.log(root.length);
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				var titulo = root.childNodes[1].innerHTML; 
				var anoLancamento = root.childNodes[2].innerHTML;
				//var idioma = el.parentNode.parentNode.querySelector("td").innerHTML;
				var duracao = root.childNodes[3].innerHTML;
				var sinopse = root.childNodes[4].innerHTML;
				var poster = root.childNodes[5].innerHTML;
				var trailer = root.childNodes[6].innerHTML;
				
				console.log(id);
				document.getElementById("editarId").value = id;
				document.getElementById("editarTitulo").value = titulo;
				document.getElementById("editarAnoDeLancamento").value = anoLancamento;
				document.getElementById("editarDuracao").value = duracao;
				document.getElementById("editarSinopse").value = sinopse;
				document.getElementById("editarPoster").value = poster;
				document.getElementById("editarTrailer").value = trailer;
				
			}
			else{
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				deletar(id);
				
			}
			
		}
		//================================================== FUNÇÕES DE CRIAÇÃO ====================================================
		//---------- CRIAR USUARIO -------------
		function criarUser(){
			var ajax = new XMLHttpRequest();
			var data = {
			usuario: document.getElementById('user').value,
			senha: document.getElementById('senha').value,
		
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("usuarios");
				}
			}
			
			ajax.open("POST", URI+"usuarios", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- CRIAR GENERO -------------
		function criarGenero(){
			var ajax = new XMLHttpRequest();
			var data = {
			genero: document.getElementById('genero').value,
		
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("generos");
				}
			}
			
			ajax.open("POST", URI+"generos", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- CRIAR SALA -------------
		function criarSala(){
			var ajax = new XMLHttpRequest();
			var data = {
			lotacaoMaxima: document.getElementById('sala').value,
		
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("salas");
				}
			}
			
			ajax.open("POST", URI+"salas", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- CRIAR TIPO INGRESSO -------------
		function criarTipoIngresso(){
			var ajax = new XMLHttpRequest();
			var data = {
			descricao: document.getElementById('descricaoTipoIngresso').value,
			valor: document.getElementById('valor').value,
	
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("tipoingresso");
				}
			}
			
			ajax.open("POST", URI+"tipoingresso", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- CRIAR FILME -------------
		function criarFilme(){
			var ajax = new XMLHttpRequest();
			var data = {
			titulo: document.getElementById('inserirTitulo').value,
			ano_lancamento: parseInt(document.getElementById('inserirAnoDeLancamento').value),
			idioma: document.getElementById('inserirIdioma').value,
			duracao: document.getElementById('inserirDuracao').value,
			sinopse: document.getElementById('inserirSinopse').value,
			poster_link: document.getElementById('inserirPoster').value,
			trailer_link: document.getElementById('inserirTrailer').value,
	
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("filmes");
				}
			}
			
			ajax.open("POST", URI+"filmes", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
			
		}
		//---------- CRIAR EM CARTAZ -------------
		function criarEmCartaz(){
			var ajax = new XMLHttpRequest();
			var data = {
			salaId: document.getElementById('salaId').value,
			filmeId: document.getElementById('filmeId').value,
			horario: document.getElementById('horario').value,
			ativo: document.getElementById('ativo').value,
	
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("emcartaz");
				}
			}
			
			ajax.open("POST", URI+"emcartaz", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- CRIAR BILHETERIAS -------------
		function criarBilheterias(){
			var ajax = new XMLHttpRequest();
			var data = {
			emCartazId: document.getElementById('emCartazId').value,
			tipoingressoId: document.getElementById('tipoingressoId').value,
			quantidade: document.getElementById('quantidade').value,
	
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 201){
				
				
				
				removeTudo();
				carregar("bilheterias");
				}
			}
			
			ajax.open("POST", URI+"bilheterias", true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		
		
		//================================================== FUNÇÕES DE ALTERAÇÃO ====================================================
		
		//---------- ALTERAR USUARIO -------------
		function alterarUser(id){
			var ajax = new XMLHttpRequest();
			var data = {
			usuario: document.getElementById('userAltera').value,
			senha: document.getElementById('senhaAltera').value,
			}
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){	
					removeTudo();
					carregar("usuarios");
				}
			}
			
			ajax.open("PUT", URI+"usuarios/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- ALTERAR GENERO -------------
		function alterarGenero(){
			var ajax = new XMLHttpRequest();
			var data = {
			genero: document.getElementById('generoAltera').value,
		
			}
			var id = document.getElementById('generoAltera').value;
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				
				
				removeTudo();
				carregar("generos");
				}
			}
			
			ajax.open("PUT", URI+"generos/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- ALTERAR SALA -------------
		function alterarSala(){
			var ajax = new XMLHttpRequest();
			var data = {
			lotacaoMaxima: document.getElementById('salaAltera').value,
		
			}
			var id = document.getElementById('salaAltera').value;
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				
				
				removeTudo();
				carregar("salas");
				}
			}
			
			ajax.open("PUT", URI+"salas/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- ALTERAR TIPO INGRESSO -------------
		function alterarTipoIngresso(){
			var ajax = new XMLHttpRequest();
			var data = {
			descricao: document.getElementById('descricaoTipoIngressoAltera').value,
			valor: document.getElementById('valorAltera').value,
	
			}
			var id = document.getElementById('TipoIngressoAltera').value;
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				
				
				removeTudo();
				carregar("tipoingresso");
				}
			}
			
			ajax.open("PUT", URI+"tipoingresso/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- ALTERAR FILME -------------
		function alterarFilme(el){
			var ajax = new XMLHttpRequest();
			var data = {
			titulo: document.getElementById('editarTitulo').value,
			ano_lancamento: parseInt(document.getElementById('editarAnoDeLancamento').value),
			idioma: document.getElementById('editarIdioma').value,
			duracao: document.getElementById('editarDuracao').value,
			sinopse: document.getElementById('editarSinopse').value,
			poster_link: document.getElementById('editarPoster').value,
			trailer_link: document.getElementById('editarTrailer').value,
	
			}
			var id = document.getElementById("editarId").value;
			console.log(id);
			
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				
				
				removeTudo();
				carregar("filmes");
				}
			}
			
			ajax.open("PUT", URI+"filmes/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- ALTERAR EM CARTAZ -------------
		function alterarEmCartaz(){
			var ajax = new XMLHttpRequest();
			var data = {
			salaId: document.getElementById('salaIdAltera').value,
			filmeId: document.getElementById('filmeIdAltera').value,
			horario: document.getElementById('horarioAltera').value,
			ativo: document.getElementById('ativoAltera').value,
	
			}
			var id = document.getElementById('emCartazAltera').value;
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				
				
				removeTudo();
				carregar("emcartaz");
				}
			}
			
			ajax.open("PUT", URI+"emcartaz/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		//---------- ALTERAR BILHETERIAS -------------
		function alterarBilheterias(){
			var ajax = new XMLHttpRequest();
			var data = {
			emCartazId: document.getElementById('emCartazIdAltera').value,
			tipoingressoId: document.getElementById('tipoingressoIdAltera').value,
			quantidade: document.getElementById('quantidadeAltera').value,
	
			}
			var id = document.getElementById('Bilheteriasltera').value;
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				
				
				removeTudo();
				carregar("bilheterias");
				}
			}
			
			ajax.open("PUT", URI+"bilheterias/"+id, true);
			ajax.setRequestHeader('Content-type', 'application/json');
			ajax.send(JSON.stringify(data));
			
		}
		
		
		
		
		
		//================================================== FUNÇÕES DE DELEÇÃO ====================================================
		function deletar(id){
			var ajax = new XMLHttpRequest();
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				removeTudo();
				carregar('filmes');
				}
			}
			ajax.open("DELETE", URI+'filmes'+"/"+id, true);
			ajax.send();
			
		}
		
		
		
		function removeTudo() {
			console.log('entrei');
			
			document.querySelectorAll(".linhas").forEach(e => e.parentNode.removeChild(e));
			
			/*
			var novaTabela = document.createElement("tbody");
			novaTabela.setAttribute("id","lista");
			document.body.replaceChild(novaTabela,tabela);
			*/
			
			//var Table = document.getElementById("tabelaFilmes");
			//Table.innerHTML = "";
    }
	
		//===========CRIAÇÃO DE IMAGEM ================
		var img = document.createElement("img");
		var urlImagem = "teste.png"
		img.setAttribute("src",urlImagem);
		document.body.appendChild(img);
// teste
	function abrirModalAltera(el) {
			var id = el.parentNode.querySelector("small").innerHTML;
			console.log(id);
			document.getElementById("formularioAlterar").style.display="";
			document.getElementById("idAltera").value=id;
   	}