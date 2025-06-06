const width = 960;
const height = 570;
const padding = { top: 40, right: 20, bottom: 60, left: 60 };

const svg = d3.select("#treemap")
  .attr("width", width)
  .attr("height", height);

const tooltip = d3.select("#tooltip");

const legendContainer = d3.select("#legend");

const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

fetch(url)
  .then(res => res.json())
  .then(data => {
    createTreemap(data);
  });

function createTreemap(data) {

  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  d3.treemap()
    .size([width - padding.left - padding.right, height - padding.top - padding.bottom])
    .paddingInner(1)
    (root);

  const g = svg.append("g")
    .attr("transform", `translate(${padding.left},${padding.top})`);


  const categories = root.children.map(d => d.data.name);
  const colorScale = d3.scaleOrdinal()

    .domain(categories)
    .range(d3.schemeCategory10);

  const leaf = g.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  leaf.append("rect")
    .attr("class", "tile")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => colorScale(d.data.category))
    .attr("data-name", d => d.data.name)
    .attr("data-category", d => d.data.category)
    .attr("data-value", d => d.data.value)
    .on("mousemove", (event, d) => {
      tooltip
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 30 + "px")
        .style("display", "block")
        .attr("data-value", d.data.value)
        .html(
          `<strong>${d.data.name}</strong><br/>
          Category: ${d.data.category}<br/>
          Value: ${d.data.value.toLocaleString()}`
        );
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    });

  leaf.append("text")
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g)) 
    .join("tspan")
    .attr("x", 4)
    .attr("y", (d, i) => 13 + i * 11)
    .text(d => d)
    .attr("font-size", "10px")
    .attr("fill", "white")
    .attr("pointer-events", "none");

  const legendItems = legendContainer.selectAll(".legend-container")
    .data(categories)
    .join("div")
    .attr("class", "legend-container");

  legendItems.append("div")
    .attr("class", "legend-item")
    .style("background-color", d => colorScale(d));

  legendItems.append("span")
    .attr("class", "legend-label")
    .text(d => d);

  const xScale = d3.scaleLinear()
    .domain([0, width - padding.left - padding.right])
    .range([0, width - padding.left - padding.right]);

  const xAxis = d3.axisBottom(xScale)
    .ticks(8)
    .tickSizeOuter(0);

  g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height - padding.top - padding.bottom})`)
    .call(xAxis);

  const yScale = d3.scaleLinear()
    .domain([0, height - padding.top - padding.bottom])
    .range([0, height - padding.top - padding.bottom]);

  const yAxis = d3.axisLeft(yScale)
    .ticks(8)
    .tickSizeOuter(0);

  g.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);
}