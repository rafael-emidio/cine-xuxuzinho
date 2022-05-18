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
				var lotacao_maxima = document.createElement('td');
				var acao = document.createElement('td');
				
				
				id.innerHTML = item.id;
				lotacao_maxima.innerHTML = item.lotacao_maxima;
				
				
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
				listaElemento.appendChild(lotacao_maxima);
				
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
		carregar("salas");
		
		
		function pegarInfo(el,tipo){
			if(tipo=="editar"){
				var root = el.parentNode.parentNode;
				
				console.log(root);
				console.log(root.length);
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				var lotacao_maxima = root.childNodes[1].innerHTML; 

				console.log(id);
				document.getElementById("editarId").value = id;
				document.getElementById("editarLotacao").value = lotacao_maxima;
			}
			else{
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				deletar(id);
				
			}
			
		}
		//================================================== FUNÇÕES DE CRIAÇÃO ====================================================
		//---------- CRIAR SALA -------------
		function criarSala(){
			var ajax = new XMLHttpRequest();
			var data = {
			lotacao_maxima: parseInt(document.getElementById('inserirLotacao').value),
		
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
		
		
		//================================================== FUNÇÕES DE ALTERAÇÃO ====================================================
		
		//---------- ALTERAR SALA -------------
		function alterarSala(el){
			var ajax = new XMLHttpRequest();
			var data = {
			lotacao_maxima: parseInt(document.getElementById('editarLotacao').value),
			}
			var id = document.getElementById("editarId").value;
			
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
		
		//================================================== FUNÇÕES DE DELEÇÃO ====================================================
		function deletar(id){
			var ajax = new XMLHttpRequest();
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				removeTudo();
				carregar('salas');
				}
			}
			ajax.open("DELETE", URI+'salas'+"/"+id, true);
			ajax.send();
			
		}
		function removeTudo() {
			
			document.querySelectorAll(".linhas").forEach(e => e.parentNode.removeChild(e));
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