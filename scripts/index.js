//! Bar graph.js

const graphCreator = (value, label, height) => {
  return `<div class="singleGraph">
  <div class="small"  style="height: ${height}%;">${value}</div>
  <p class="text">${label}</p>
</div>`;
};

const styling = (length) => {
  return `
  <style>
    .chartName {
      display:block;
    }
    #content {
      display: flex;
      width : ${(length + 2) * 60}px ;
    }
    #yAxisLabel > div > span {
      padding-right: ${length * 60 + 10}px;
    }
  </style> 
    `;
};

const newRow = () => {
  const x = document.querySelectorAll("tr").length;
  document.querySelector("table").innerHTML += `<tr>
  <td class="sno">${x}</td>
  <td contenteditable="true" class="barLabel"></td>
  <td contenteditable="true"  class="barValue"></td>
  <td><button class="danger" onclick="deleteRow(${x})">Delete</button></td>
</tr>`;
};

const deleteRow = (n) => {
  document.querySelectorAll("tr")[n].remove();
  document.querySelectorAll("tr > .sno").forEach((sno, i) => {
    sno.innerHTML = i + 1;
  });
};

const createChart = () => {
  let x = [];
  document.querySelectorAll("tr > .barLabel").forEach((label, i) => {
    x[i] = {};
    x[i].label = label.innerHTML;
  });
  document.querySelectorAll("tr > .barValue").forEach((value, i) => {
    let nan = false;
    if (isNaN(value.innerHTML) && Number(value.innerHTML) > 0) {
      console.log(value.innerHTML);
      alert("Value can be positive numbers");
      nan = true;
      return;
    }
    if (nan) return;
    x[i].value = Number(value.innerHTML);
  });
  createBarChart(x);
};

const createBarChart = (values) => {
  let max = 0;
  values.forEach((value) => {
    if (value.value > max) max = value.value;
  });
  max *= 0.012;
  values.forEach((value) => {
    value.height = value.value / max;
  });

  let graph = "";

  values.forEach((value) => {
    graph += graphCreator(value.value, value.label, value.height);
  });

  document.querySelector("#graph").innerHTML = graph;
  if (document.querySelector("head > style"))
    document.querySelector("head > style").remove();

  document.querySelector("head").innerHTML += styling(values.length);

  document.querySelectorAll("#yAxisLabel > div > span").forEach((span, i) => {
    if (i !== 0 && 1 !== 5) span.innerHTML = max * (5 - i) * 20;
  });

  document.querySelector(".chartName").innerHTML = document.querySelector(
    "#graphName"
  ).value;
};
