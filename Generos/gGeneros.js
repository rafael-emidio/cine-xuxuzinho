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
				var genero = document.createElement('td');
				var acao = document.createElement('td');
				
				
				id.innerHTML = item.id;
				genero.innerHTML = item.genero;
				
				
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
				listaElemento.appendChild(genero);
				

				
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
		carregar("generos");
		
		
		function pegarInfo(el,tipo){
			if(tipo=="editar"){
				var root = el.parentNode.parentNode;
				
				console.log(root);
				console.log(root.length);
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				var genero = root.childNodes[1].innerHTML; 


				
				console.log(id);
				document.getElementById("editarId").value = id;
				document.getElementById("editarGenero").value = genero;
				
				
				
			}
			else{
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				deletar(id);
				
			}
			
		}
		//================================================== FUNÇÕES DE CRIAÇÃO ====================================================
		//---------- CRIAR GENERO -------------
		function criarGenero(){
			var ajax = new XMLHttpRequest();
			var data = {
			genero: document.getElementById('inserirGenero').value,
		
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
		
		
		//================================================== FUNÇÕES DE ALTERAÇÃO ====================================================
		
		//---------- ALTERAR GENERO -------------
		function alterarGenero(el){
			var ajax = new XMLHttpRequest();
			var data = {
			genero: document.getElementById('editarGenero').value,
			}
			var id = document.getElementById("editarId").value;
			
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
		
		//================================================== FUNÇÕES DE DELEÇÃO ====================================================
		function deletar(id){
			var ajax = new XMLHttpRequest();
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				removeTudo();
				carregar('generos');
				}
			}
			ajax.open("DELETE", URI+'generos'+"/"+id, true);
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