
const ideiasExtras = [
  {
    texto: "Campanhas de conscientização ambiental",
    co2: 5000,
    pessoas: 200000
  },
  {
    texto: "Ônibus 100% elétricos",
    co2: 15000,
    pessoas: 500000
  },
  {
    texto: "Painéis solares em escolas",
    co2: 8000,
    pessoas: 100000
  },
  {
    texto: "Mais pontos de reciclagem",
    co2: 6000,
    pessoas: 300000
  },
  {
    texto: "Reutilização de água da chuva",
    co2: 3000,
    pessoas: 150000
  }
];


const ideiasIniciais = [
  { texto: "Ampliar ciclovias e incentivar o uso de bicicletas", co2: 12000, pessoas: 400000 },
  { texto: "Investir em energia solar nos prédios públicos", co2: 10000, pessoas: 250000 },
  { texto: "Mais áreas verdes e hortas urbanas", co2: 7000, pessoas: 350000 },
  { texto: "Coleta seletiva em todos os bairros", co2: 9000, pessoas: 600000 }
];

let totalIdeias = ideiasIniciais.length + ideiasExtras.length;
let ideiasMostradas = ideiasIniciais.length;
let totalCO2 = 0;
let totalPessoas = 0;


function atualizarProgresso() {
  const progresso = (ideiasMostradas / totalIdeias) * 100;
  document.getElementById('progress-bar').style.width = `${progresso}%`;
  document.getElementById('progress-text').textContent = `${ideiasMostradas}/${totalIdeias} ideias`;

 
  document.getElementById('co2-reduction').textContent = Math.round(totalCO2 / 1000);
  document.getElementById('people-impacted').textContent = Math.round(totalPessoas / 1000) + "k";
}


function mostrarNovaIdeia() {
  if (ideiasExtras.length > 0) {
    const nova = ideiasExtras.shift();
    const li = document.createElement("li");

  
    const icon = document.createElement("i");
    icon.className = "fas fa-lightbulb";
    li.appendChild(icon);

    li.appendChild(document.createTextNode(nova.texto));
    document.getElementById("lista-ideias").appendChild(li);


    totalCO2 += nova.co2;
    totalPessoas += nova.pessoas;
    ideiasMostradas++;


    atualizarProgresso();
    updateVisualization();
  } else {
    alert("Todas as ideias já foram exibidas! Obrigado por explorar soluções sustentáveis.");
  }
}


let treeSize = 100;
let trees = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas-container");
  background("#e8f5e9");

  for (let i = 0; i < ideiasIniciais.length; i++) {
    trees.push({
      x: random(100, 500),
      y: random(200, 350),
      size: map(ideiasIniciais[i].co2, 3000, 15000, 80, 150)
    });
    totalCO2 += ideiasIniciais[i].co2;
    totalPessoas += ideiasIniciais[i].pessoas;
  }

  atualizarProgresso();
}

function draw() {
  background("#e8f5e9");


  fill("#8bc34a");
  noStroke();
  rect(0, 350, width, 50);


  for (let tree of trees) {
    drawTree(tree.x, tree.y, tree.size);
  }


  fill("#2e7d32");
  textSize(16);
  text("Cada árvore representa uma ideia implementada", 20, 30);
  text(`Impacto total: ${Math.round(totalCO2 / 1000)} ton CO2 reduzidas`, 20, 60);
}

function drawTree(x, y, size) {

  fill("#8d6e63");
  rect(x - size / 8, y - size / 2, size / 4, size / 2);


  fill("#388e3c");
  ellipse(x, y - size / 1.5, size, size);
  ellipse(x - size / 3, y - size / 2, size * 0.8, size * 0.8);
  ellipse(x + size / 3, y - size / 2, size * 0.8, size * 0.8);
}

function updateVisualization() {

  trees.push({
    x: random(100, 500),
    y: random(200, 350),
    size: map(totalCO2 / ideiasMostradas, 3000, 15000, 80, 150)
  });


  for (let tree of trees) {
    tree.size = map(totalCO2 / ideiasMostradas, 3000, 15000, 80, 150);
  }
}

const perguntasQuiz = [
  {
    pergunta: "Qual destas ações ajuda mais a reduzir CO2?",
    opcoes: ["Usar bicicleta", "Beber água da chuva", "Usar sacolas plásticas"],
    correta: 0
  },
  {
    pergunta: "Qual é uma fonte de energia renovável?",
    opcoes: ["Carvão", "Solar", "Gás natural"],
    correta: 1
  }
];

let perguntaAtual = 0;

function responderQuiz(opcaoEscolhida) {
  const p = perguntasQuiz[perguntaAtual];
  const feedback = document.getElementById("quiz-feedback");

  if (opcaoEscolhida === p.correta) {
    feedback.textContent = "✅ Correto!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Errado! A resposta certa era: " + p.opcoes[p.correta];
    feedback.style.color = "red";
  }

  perguntaAtual = (perguntaAtual + 1) % perguntasQuiz.length;
  setTimeout(() => {
    document.getElementById("quiz-pergunta").textContent = perguntasQuiz[perguntaAtual].pergunta;
    const botoes = document.querySelectorAll(".quiz-opcoes button");
    botoes.forEach((btn, i) => btn.textContent = perguntasQuiz[perguntaAtual].opcoes[i]);
    feedback.textContent = "";
  }, 2000);
}
let idiomaAtual = "pt";

function trocarIdioma() {
  if (idiomaAtual === "pt") {
    document.querySelector("h1").textContent = "Sustainability in Curitiba";
    document.querySelector(".subtitle").textContent = "What can be done for a greener city?";
    document.querySelector("footer p").textContent = "Project developed for environmental awareness | Curitiba - PR";
    idiomaAtual = "en";
  } else {
    document.querySelector("h1").textContent = "Sustentabilidade em Curitiba";
    document.querySelector(".subtitle").textContent = "O que pode ser feito para uma cidade mais verde?";
    document.querySelector("footer p").textContent = "Projeto desenvolvido para conscientização ambiental | Curitiba - PR";
    idiomaAtual = "pt";
  }
}
