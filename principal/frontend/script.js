let novoChamado = document.querySelector(".novo__chamado");
let modal = document.querySelector(".modal");
let cancelar = document.querySelector(".cancelar");
let cadastrar = document.querySelector(".cadastrar");

novoChamado.addEventListener("click", () => {
  modal.style.display = "block";
});

cancelar.addEventListener("click", () => {
  modal.style.display = "none";
});

let numChamados = document.querySelector(".num__chamados");
let contadorChamados = Number(numChamados.textContent);

let numAndamento = document.querySelector(".num__andamento");
let contadorAndamento = Number(numAndamento.textContent);

let numFechados = document.querySelector(".num__fechados");
let contadorFechados = Number(numFechados.textContent);

cadastrar.addEventListener("click", async (event) => {
  event.preventDefault();

  let assuntoForm = document.querySelector("#assunto__form");
  let requisitanteForm = document.querySelector("#requisitante__form");
  let prioridadeForm = document.querySelector(".prioridade__form select");
  let statusForm = document.querySelector(".status__form select");
  let dataForm = document.querySelector("#data__form");

  let tabela = document.querySelector("table");
  let linha = document.createElement("tr");

  const clientes = {
    assunto: assuntoForm.value,
    requisitante: requisitanteForm.value,
    prioridade: prioridadeForm.value,
    status: statusForm.value,
    data: dataForm.value,
  };

  if (
    assuntoForm.value === "" ||
    requisitanteForm.value === "" ||
    dataForm.value === ""
  ) {
    alert("Digite todos os campos!");
    return;
  }

  const resposta = await fetch("http://localhost:3000/adicionar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientes),
  });

  const dados = await resposta.json();
  linha.dataset.id = dados.id;

  if (statusForm.value === "Aberto") {
    contadorChamados++;
    numChamados.innerHTML = contadorChamados;
  } else if (statusForm.value === "Em andamento") {
    contadorAndamento++;
    numAndamento.innerHTML = contadorAndamento;
  } else if (statusForm.value === "Fechado") {
    contadorFechados++;
    numFechados.innerHTML = contadorFechados;
  }

  linha.innerHTML = `
  <td>#${dados.id}</td>
  <td>${assuntoForm.value}</td>
  <td>${requisitanteForm.value}</td>
  <td>
    <select id="prioridade__form">
        <option value="Baixa" ${prioridadeForm.value === "Baixa" ? "selected" : ""}>Baixa</option>
        <option value="Moderada" ${prioridadeForm.value === "Moderada" ? "selected" : ""}>Moderada</option>
        <option value="Alta" ${prioridadeForm.value == "Alta" ? "selected" : ""}>Alta</option>
    </select>
  </td>
  <td>
    <select id="status__form">
        <option value="Aberto" ${statusForm.value === "Aberto" ? "selected" : ""}>Aberto</option>
        <option value="Em andamento" ${statusForm.value === "Em andamento" ? "selected" : ""}>Em andamento</option>
        <option value="Fechado" ${statusForm.value === "Fechado" ? "selected" : ""}>Fechado</option>
    </select>
  </td>
  <td>${dataForm.value}</td>
  <td>
    <div class="acoes">
        <button class="botao__deletar"><i class="fa-solid fa-trash"></i></button>
    </div>
  </td>
  `;

  tabela.appendChild(linha);

  let statusTabela = linha.querySelector("#status__form");
  let statusAnterior = statusTabela.value;
  let prioridadeTabela = linha.querySelector("#prioridade__form");

  //salva a nova prioridade e status
  async function atualizarChamado() {
    await fetch(`http://localhost:3000/editar/${dados.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: statusTabela.value,
        prioridade: prioridadeTabela.value,
      }),
    });
  }

  statusTabela.addEventListener("change", async () => {
    let novoStatus = statusTabela.value;

    if (statusAnterior === "Aberto") {
      contadorChamados--;
      numChamados.textContent = contadorChamados;
    }

    if (statusAnterior === "Em andamento") {
      contadorAndamento--;
      numAndamento.textContent = contadorAndamento;
    }

    if (statusAnterior === "Fechado") {
      contadorFechados--;
      numFechados.textContent = contadorFechados;
    }

    if (novoStatus === "Aberto") {
      contadorChamados++;
      numChamados.textContent = contadorChamados;
    }

    if (novoStatus === "Em andamento") {
      contadorAndamento++;
      numAndamento.textContent = contadorAndamento;
    }

    if (novoStatus === "Fechado") {
      contadorFechados++;
      numFechados.textContent = contadorFechados;
    }

    statusAnterior = novoStatus;

    // atualiza o novo status
    await atualizarChamado();
  });

  // atualiza a nova prioridade
  prioridadeTabela.addEventListener("change", async () => {
    await atualizarChamado();
  });
});

let tabela = document.querySelector("table");

tabela.addEventListener("click", async (botao) => {
  if (botao.target.closest(".botao__deletar")) {
    const linha = botao.target.closest("tr");
    const id = linha.dataset.id;

    let statusTabela = linha.querySelector("#status__form");
    let novoStatus = statusTabela.value;

    const resposta = await fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    });

    linha.remove();

    if (novoStatus === "Aberto") {
      contadorChamados--;
      numChamados.textContent = contadorChamados;
    } else if (novoStatus === "Em andamento") {
      contadorAndamento--;
      numAndamento.textContent = contadorAndamento;
    } else if (novoStatus === "Fechado") {
      contadorFechados--;
      numFechados.textContent = contadorFechados;
    }
  }
});
