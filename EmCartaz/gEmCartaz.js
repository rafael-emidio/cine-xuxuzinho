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
				var sala_id = document.createElement('td');
				var filme_id = document.createElement('td');
				var horario = document.createElement('td');
				var ativo = document.createElement('td');
				var acao = document.createElement('td');
				
				
				id.innerHTML = item.id;
				sala_id.innerHTML = item.sala_id;
				filme_id.innerHTML = item.filme_id;
				horario.innerHTML = item.horario;
				ativo.innerHTML = item.ativo;
				
				
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
				listaElemento.appendChild(sala_id);
				listaElemento.appendChild(filme_id);
				listaElemento.appendChild(horario);
				listaElemento.appendChild(ativo);
				

				
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
		carregar("emcartaz");
		
		
		function pegarInfo(el,tipo){
			if(tipo=="editar"){
				var root = el.parentNode.parentNode;
				
				console.log(root);
				console.log(root.length);
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				var sala_id = root.childNodes[1].innerHTML; 
				var filme_id = root.childNodes[2].innerHTML; 
				var horario = root.childNodes[3].innerHTML; 
				var ativo = root.childNodes[4].innerHTML; 


				
				console.log(id);
				document.getElementById("editarId").value = id;
				document.getElementById("editarSalaId").value = sala_id;
				document.getElementById("editarFilmeId").value = filme_id;
				document.getElementById("editarHorario").value = horario;
				document.getElementById("editarAtivo").checked = ativo;
				
				
				
			}
			else{
				var id = el.parentNode.parentNode.querySelector("th").innerHTML;
				deletar(id);
				
			}
			
		}
		//================================================== FUNÇÕES DE CRIAÇÃO ====================================================
		//---------- CRIAR TIPO FILME EM CARTAZ -------------
		function criarEmCartaz(){
			var ajax = new XMLHttpRequest();
			var data = {
			sala_id: parseInt(document.getElementById('inserirSalaId').value),
			filme_id: parseInt(document.getElementById('inserirFilmeId').value),
			horario: document.getElementById('inserirHorario').value,
			ativo: document.getElementById('inserirAtivo').checked,
		
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
		
		
		//================================================== FUNÇÕES DE ALTERAÇÃO ====================================================
		
		//---------- ALTERAR TIPO DE INGRESSO -------------
		function alterarEmCartaz(el){
			var ajax = new XMLHttpRequest();
			var data = {
			sala_id: parseInt(document.getElementById('editarSalaId').value),
			filme_id: parseInt(document.getElementById('editarFilmeId').value),
			horario: document.getElementById('editarHorario').value,
			ativo: document.getElementById('editarAtivo').checked,
			}
			var id = document.getElementById("editarId").value;
			
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
		
		//================================================== FUNÇÕES DE DELEÇÃO ====================================================
		function deletar(id){
			var ajax = new XMLHttpRequest();
			
			ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
				removeTudo();
				carregar('emcartaz');
				}
			}
			ajax.open("DELETE", URI+'emcartaz'+"/"+id, true);
			ajax.send();
			
		}
		
		
		
		function removeTudo() {
			
			document.querySelectorAll(".linhas").forEach(e => e.parentNode.removeChild(e));
    }
	
		