import { createRequire } from "node:module"

const require = createRequire(`${process.cwd()}/package.json`)
const { h } = require("preact")

const defaultOptions = {
  localGraph: {
    depth: 1,
    repelForce: 0.95,
    centerForce: 0.22,
    linkDistance: 64,
    fontSize: 10,
    labelDensity: 0.62,
    focusOnHover: true,
    enableRadial: false,
  },
  globalGraph: {
    depth: -1,
    repelForce: 0.82,
    centerForce: 0.18,
    linkDistance: 54,
    fontSize: 11,
    labelDensity: 0.48,
    focusOnHover: true,
    enableRadial: true,
  },
}

const style = `
.graph > h3 {
  font-size: 1rem;
  margin: 0;
}

.graph > .graph-outer {
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  box-sizing: border-box;
  height: 250px;
  margin: 0.5em 0;
  overflow: hidden;
  position: relative;
}

.graph-container {
  height: 100%;
  width: 100%;
}

.global-graph-icon {
  background: color-mix(in srgb, var(--light) 80%, transparent);
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  color: var(--dark);
  cursor: pointer;
  height: 24px;
  margin: 0.35rem;
  opacity: 0.72;
  padding: 0.18rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
}

.global-graph-icon:hover {
  background: var(--lightgray);
  opacity: 1;
}

.global-graph-outer {
  backdrop-filter: blur(4px);
  display: none;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;
}

.global-graph-outer.active {
  display: block;
}

.global-graph-container {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  box-sizing: border-box;
  height: 82vh;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(88vw, 1180px);
}

@media all and (max-width: 800px) {
  .global-graph-container {
    height: 86vh;
    width: 94vw;
  }
}
`

const script = String.raw`
function readableGraphHash(value) {
  var hash = 2166136261;
  for (var i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function readableGraphSlug() {
  var slug = document.body.dataset.slug || "";
  return slug.replace(/^\/+|\/+$/g, "") || "index";
}

function readableGraphHref(slug) {
  var base = document.body.dataset.basepath || "";
  var target = slug === "index" ? "" : slug;
  return (base ? "/" + base.replace(/^\/+|\/+$/g, "") : "") + "/" + target;
}

function readableGraphLoadScript(src) {
  var existing = document.querySelector('script[src="' + src + '"]');
  if (existing) return Promise.resolve();
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = src;
    script.crossOrigin = "anonymous";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function readableGraphColor(value, fallback) {
  if (!value) return fallback;
  var el = document.createElement("div");
  el.style.color = value;
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  document.body.appendChild(el);
  var resolved = getComputedStyle(el).color;
  el.remove();
  return resolved || fallback;
}

function readableGraphTitleScore(node, degree, currentSlug) {
  if (node.id === currentSlug) return 1;
  if (node.id === "index") return 0.96;
  if (node.id.endsWith("/index")) return 0.9;
  if (/^00-|overview|project-overview|ending-dag|post-scarcity/.test(node.id)) return 0.86;
  if (degree >= 4) return 0.78;
  if (/总览|首页|设计树|结局|接口|系统|模型|规范|说明/.test(node.text)) return 0.74;
  return 0.38 + Math.min(degree, 3) * 0.08;
}

function readableGraphShortTitle(text) {
  if (text.length <= 14) return text;
  return text.slice(0, 13) + "...";
}

async function readableGraphRender(container, fullSlug, mode) {
  if (!window.d3 || !window.PIXI) {
    container.textContent = "Graph could not load.";
    return function () {};
  }

  container.replaceChildren();

  var cfg = JSON.parse(container.dataset.cfg || "{}");
  var currentSlug = (fullSlug || readableGraphSlug()).replace(/^\/+|\/+$/g, "") || "index";
  var raw = await fetchData;
  var data = new Map();
  Object.keys(raw).forEach(function (key) {
    if (!key.startsWith("tags/")) data.set(key, raw[key]);
  });

  var allLinks = [];
  data.forEach(function (details, source) {
    (details.links || []).forEach(function (target) {
      if (data.has(target) && !target.startsWith("tags/")) {
        allLinks.push({ source: source, target: target });
      }
    });
  });

  var neighbourhood = new Set();
  var depth = Number.isFinite(cfg.depth) ? cfg.depth : 1;
  if (depth >= 0) {
    var queue = [currentSlug];
    var seen = new Set(queue);
    for (var d = 0; d <= depth && queue.length; d++) {
      var next = [];
      queue.forEach(function (slug) {
        neighbourhood.add(slug);
        allLinks.forEach(function (link) {
          var other = null;
          if (link.source === slug) other = link.target;
          if (link.target === slug) other = link.source;
          if (other && !seen.has(other)) {
            seen.add(other);
            next.push(other);
          }
        });
      });
      queue = next;
    }
  } else {
    data.forEach(function (_, slug) {
      neighbourhood.add(slug);
    });
  }

  if (!neighbourhood.has(currentSlug) && data.has(currentSlug)) neighbourhood.add(currentSlug);

  var degrees = new Map();
  allLinks.forEach(function (link) {
    degrees.set(link.source, (degrees.get(link.source) || 0) + 1);
    degrees.set(link.target, (degrees.get(link.target) || 0) + 1);
  });

  var width = Math.max(container.offsetWidth, 260);
  var height = Math.max(container.offsetHeight, 250);
  var nodes = Array.from(neighbourhood)
    .filter(function (slug) { return data.has(slug); })
    .map(function (slug) {
      var details = data.get(slug) || {};
      return {
        id: slug,
        text: details.title || slug,
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
      };
    });

  var nodeMap = new Map(nodes.map(function (node) { return [node.id, node]; }));
  var links = allLinks
    .filter(function (link) { return nodeMap.has(link.source) && nodeMap.has(link.target); })
    .map(function (link) { return { source: nodeMap.get(link.source), target: nodeMap.get(link.target) }; });

  var styles = getComputedStyle(document.documentElement);
  var secondary = readableGraphColor(styles.getPropertyValue("--secondary").trim(), "#8f4f4f");
  var tertiary = readableGraphColor(styles.getPropertyValue("--tertiary").trim(), "#8a6d3b");
  var gray = readableGraphColor(styles.getPropertyValue("--gray").trim(), "#8d8d8d");
  var lightgray = readableGraphColor(styles.getPropertyValue("--lightgray").trim(), "#d8d8d8");
  var dark = readableGraphColor(styles.getPropertyValue("--dark").trim(), "#1f1f1f");
  var light = readableGraphColor(styles.getPropertyValue("--light").trim(), "#fbfaf7");
  var bodyFont = styles.getPropertyValue("--bodyFont").trim() || "sans-serif";

  var app = new PIXI.Application();
  await app.init({
    width: width,
    height: height,
    antialias: true,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });
  container.appendChild(app.canvas);

  var stage = new PIXI.Container();
  var linkLayer = new PIXI.Container();
  var nodeLayer = new PIXI.Container();
  var labelLayer = new PIXI.Container();
  stage.addChild(linkLayer);
  stage.addChild(nodeLayer);
  stage.addChild(labelLayer);
  app.stage.addChild(stage);

  var repel = cfg.repelForce || 0.9;
  var linkDistance = cfg.linkDistance || 58;
  var centerForce = cfg.centerForce || 0.22;
  var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-110 * repel))
    .force("center", d3.forceCenter().strength(centerForce))
    .force("link", d3.forceLink(links).distance(linkDistance))
    .force("collide", d3.forceCollide().radius(function (node) {
      return 7 + Math.sqrt(degrees.get(node.id) || 1) * 3;
    }).iterations(3));

  if (cfg.enableRadial) {
    simulation.force("radial", d3.forceRadial(Math.min(width, height) * 0.38).strength(0.12));
  }

  var renderNodes = [];
  var renderLinks = [];
  var zoomK = 1;
  var currentTransform = d3.zoomIdentity;
  var hovered = null;
  var draggingNode = false;
  var lastDragEnd = 0;
  var labelDensity = Math.max(0.1, Math.min(1, cfg.labelDensity || 0.55));
  var crowded = nodes.length > (mode === "global" ? 18 : 8);

  function nodeRadius(node) {
    return 3 + Math.sqrt(degrees.get(node.id) || 1) * 1.7;
  }

  function baseLabelAlpha(item) {
    var node = item.node;
    var score = item.score;
    var jitter = item.jitter;
    var zoomReveal = Math.max(0, Math.min(0.7, (zoomK - 0.75) * 0.5));
    var alpha = score >= 0.86 ? 0.96 : score >= 0.72 ? 0.72 : 0.28;
    if (crowded && score < 0.86) {
      alpha *= jitter < labelDensity ? 0.68 : 0.18;
    }
    if (score < 0.72 && zoomK < 1.2) alpha *= 0.45;
    if (node.id === currentSlug || hovered === node.id) alpha = 1;
    if (hovered && hovered !== node.id && cfg.focusOnHover) alpha *= item.nearHover ? 0.92 : 0.16;
    return Math.max(0, Math.min(1, alpha + zoomReveal));
  }

  nodes.forEach(function (node) {
    var degree = degrees.get(node.id) || 0;
    var score = readableGraphTitleScore(node, degree, currentSlug);
    var jitter = readableGraphHash(node.id);
    var circle = new PIXI.Graphics();
    var radius = nodeRadius(node);
    var fill = node.id === currentSlug ? secondary : score >= 0.86 ? tertiary : gray;
    circle.circle(0, 0, radius);
    circle.fill({ color: fill });
    circle.eventMode = "static";
    circle.cursor = "pointer";
    circle.on("pointerover", function () {
      hovered = node.id;
      updateHover();
      updateLabels();
    });
    circle.on("pointerleave", function () {
      hovered = null;
      updateHover();
      updateLabels();
    });
    circle.on("click", function () {
      if (Date.now() - lastDragEnd < 220) return;
      window.location.href = readableGraphHref(node.id);
    });
    nodeLayer.addChild(circle);

    var label = new PIXI.Text({
      text: readableGraphShortTitle(node.text),
      style: {
        fontFamily: bodyFont,
        fontSize: cfg.fontSize || 10,
        fill: dark,
        align: "center",
      },
      resolution: (window.devicePixelRatio || 1) * 3,
    });
    label.anchor.set(0.5, 1.35);
    labelLayer.addChild(label);

    renderNodes.push({
      node: node,
      circle: circle,
      label: label,
      score: score,
      jitter: jitter,
      nearHover: false,
    });
  });

  links.forEach(function (link) {
    var line = new PIXI.Graphics();
    linkLayer.addChild(line);
    renderLinks.push({ link: link, line: line, active: false });
  });

  function updateHover() {
    var neighbours = new Set();
    if (hovered) {
      links.forEach(function (link) {
        if (link.source.id === hovered || link.target.id === hovered) {
          neighbours.add(link.source.id);
          neighbours.add(link.target.id);
        }
      });
      neighbours.add(hovered);
    }
    renderNodes.forEach(function (item) {
      item.nearHover = !hovered || neighbours.has(item.node.id);
      item.circle.alpha = !hovered || item.nearHover || !cfg.focusOnHover ? 1 : 0.22;
    });
    renderLinks.forEach(function (item) {
      item.active = hovered && (item.link.source.id === hovered || item.link.target.id === hovered);
    });
  }

  function updateLabels() {
    var ordered = renderNodes.slice().sort(function (a, b) {
      return (b.score + b.jitter * 0.05) - (a.score + a.jitter * 0.05);
    });
    var kept = [];
    ordered.forEach(function (item) {
      var alpha = baseLabelAlpha(item);
      if (crowded && item.score < 0.86 && !hovered) {
        for (var i = 0; i < kept.length; i++) {
          var other = kept[i];
          var dx = item.node.x - other.node.x;
          var dy = item.node.y - other.node.y;
          if (Math.abs(dx) < 70 / zoomK && Math.abs(dy) < 26 / zoomK) {
            alpha *= item.jitter > other.jitter ? 0.18 : 0.35;
            break;
          }
        }
      }
      if (alpha > 0.42 || item.score >= 0.86) kept.push(item);
      item.label.alpha = alpha;
      item.label.scale.set(1 / Math.max(1, zoomK * 0.88));
    });
  }

  function pointerToSimulation(event) {
    return {
      x: (event.x - currentTransform.x) / currentTransform.k - width / 2,
      y: (event.y - currentTransform.y) / currentTransform.k - height / 2,
    };
  }

  function nodeAtSimulationPoint(point) {
    var best = null;
    var bestDistance = Infinity;
    nodes.forEach(function (node) {
      var dx = point.x - node.x;
      var dy = point.y - node.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var hitRadius = nodeRadius(node) + 10 / Math.max(currentTransform.k, 0.8);
      if (distance < hitRadius && distance < bestDistance) {
        best = node;
        bestDistance = distance;
      }
    });
    return best;
  }

  function domEventHitsNode(event) {
    var pointer = d3.pointer(event, app.canvas);
    return Boolean(nodeAtSimulationPoint(pointerToSimulation({ x: pointer[0], y: pointer[1] })));
  }

  var zoom = d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([0.45, 4])
    .filter(function (event) {
      if (event.type === "wheel") return true;
      if (event.button) return false;
      return !domEventHitsNode(event);
    })
    .on("zoom", function (event) {
      currentTransform = event.transform;
      zoomK = event.transform.k;
      stage.scale.set(event.transform.k, event.transform.k);
      stage.position.set(event.transform.x, event.transform.y);
      updateLabels();
    });
  d3.select(app.canvas).call(zoom);

  var drag = d3.drag()
    .container(app.canvas)
    .subject(function (event) {
      var point = pointerToSimulation(event);
      return nodeAtSimulationPoint(point);
    })
    .on("start", function (event) {
      if (!event.subject) return;
      draggingNode = true;
      hovered = event.subject.id;
      updateHover();
      if (!event.active) simulation.alphaTarget(0.45).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
      var point = pointerToSimulation(event);
      event.subject.__dragOffset = {
        x: point.x - event.subject.x,
        y: point.y - event.subject.y,
      };
    })
    .on("drag", function (event) {
      if (!event.subject) return;
      var point = pointerToSimulation(event);
      var offset = event.subject.__dragOffset || { x: 0, y: 0 };
      event.subject.fx = point.x - offset.x;
      event.subject.fy = point.y - offset.y;
      simulation.alpha(0.55).restart();
    })
    .on("end", function (event) {
      if (!event.subject) return;
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
      event.subject.__dragOffset = null;
      draggingNode = false;
      hovered = null;
      lastDragEnd = Date.now();
      updateHover();
      updateLabels();
    });
  d3.select(app.canvas).call(drag);

  var stopped = false;
  function draw() {
    if (stopped) return;
    renderNodes.forEach(function (item) {
      var x = item.node.x + width / 2;
      var y = item.node.y + height / 2;
      item.circle.position.set(x, y);
      item.label.position.set(x, y);
    });
    renderLinks.forEach(function (item) {
      var source = item.link.source;
      var target = item.link.target;
      item.line.clear();
      item.line.moveTo(source.x + width / 2, source.y + height / 2);
      item.line.lineTo(target.x + width / 2, target.y + height / 2);
      item.line.stroke({
        alpha: item.active ? 0.95 : 0.48,
        width: item.active ? 1.4 : 1,
        color: item.active ? gray : lightgray,
      });
    });
    updateLabels();
    requestAnimationFrame(draw);
  }

  updateHover();
  updateLabels();
  simulation.restart();
  draw();

  return function () {
    stopped = true;
    simulation.stop();
    try {
      app.destroy(true);
    } catch (_) {}
  };
}

(function () {
  Promise.all([
    readableGraphLoadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"),
    readableGraphLoadScript("https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.js"),
  ]).then(function () {
    var cleanups = [];
    function cleanup() {
      cleanups.forEach(function (fn) { fn(); });
      cleanups = [];
    }
    function renderLocal() {
      cleanup();
      var slug = readableGraphSlug();
      document.querySelectorAll(".graph-container[data-mode='local']").forEach(function (container) {
        readableGraphRender(container, slug, "local").then(function (fn) { cleanups.push(fn); });
      });
    }
    function closeGlobal() {
      document.querySelectorAll(".global-graph-outer.active").forEach(function (el) {
        el.classList.remove("active");
      });
      document.querySelectorAll(".global-graph-container").forEach(function (container) {
        container.replaceChildren();
      });
    }
    function openGlobal() {
      var slug = readableGraphSlug();
      document.querySelectorAll(".global-graph-outer").forEach(function (outer) {
        outer.classList.add("active");
        var container = outer.querySelector(".global-graph-container");
        readableGraphRender(container, slug, "global");
      });
    }
    document.addEventListener("nav", renderLocal);
    document.addEventListener("click", function (event) {
      if (event.target.closest(".global-graph-icon")) {
        event.preventDefault();
        openGlobal();
        return;
      }
      if (event.target.classList && event.target.classList.contains("global-graph-outer")) {
        closeGlobal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeGlobal();
      if (event.key === "g" && (event.ctrlKey || event.metaKey) && !event.shiftKey) {
        event.preventDefault();
        openGlobal();
      }
    });
    renderLocal();
  }).catch(function () {
    document.querySelectorAll(".graph-container").forEach(function (container) {
      container.textContent = "Graph could not load. Check your network connection.";
      container.style.alignItems = "center";
      container.style.color = "var(--gray)";
      container.style.display = "flex";
      container.style.fontSize = "0.9rem";
      container.style.justifyContent = "center";
    });
  });
})();
`

export function Graph(userOptions = {}) {
  const localGraph = { ...defaultOptions.localGraph, ...(userOptions.localGraph || {}) }
  const globalGraph = { ...defaultOptions.globalGraph, ...(userOptions.globalGraph || {}) }

  function GraphComponent() {
    return h("div", { class: "graph" }, [
      h("h3", {}, "关系图谱"),
      h("div", { class: "graph-outer" }, [
        h("div", {
          class: "graph-container",
          "data-mode": "local",
          "data-cfg": JSON.stringify(localGraph),
        }),
        h(
          "button",
          { class: "global-graph-icon", "aria-label": "打开全局关系图谱" },
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
            [
              h("circle", { cx: "6", cy: "6", r: "2" }),
              h("circle", { cx: "18", cy: "7", r: "2" }),
              h("circle", { cx: "12", cy: "18", r: "2" }),
              h("path", { d: "M8 6.2 16 6.8" }),
              h("path", { d: "m7.2 7.7 3.7 8.5" }),
              h("path", { d: "m16.9 8.8-3.8 7.5" }),
            ],
          ),
        ),
      ]),
      h("div", { class: "global-graph-outer" }, [
        h("div", {
          class: "global-graph-container",
          "data-mode": "global",
          "data-cfg": JSON.stringify(globalGraph),
        }),
      ]),
    ])
  }

  GraphComponent.css = style
  GraphComponent.afterDOMLoaded = script

  return GraphComponent
}
