
let config: Config = {
  sky: {
    properties: {
      height: 720,
      width: 1280,
      pixelSize: 1,
      colour: [94, 122, 187],
      opacity: 1,
      mutationSpeed: 1
    }
  },
  stars: {
    include: false,
    properties: {
      opacity: 1,
      density: 0.005,
    }
  },
  moon: {
    include: false,
    properties: {
      colour: [200, 200, 200],
      radius: 10,
      halfMoon: false,
      noise: 2
    }
  },
  sunset: {
    include: true,
    properties: {
      layers: [
        {
          colour: [254, 207, 199],
          maxOpacity: 0.7,
          proportion: 0.7,
          mutationSpeed: 1,
          xStretch: 0.7,
          yStretch: 0.5,
        },
        {
          colour: [253, 227, 228],
          maxOpacity: 0.5,
          proportion: 0.7,
          mutationSpeed: 1,
          xStretch: 0.6,
          yStretch: 0.3,
        }
      ]
    }
  },
  clouds: {
    include: false,
    properties: {
      quantity: 10,
      layers: [
        {
          colour: [235, 235, 235],
          opacity: 0.2,
          minSize: 100,
          maxSize: 10000,
          pH: 0.7, // Probability of horizontal expansion
          pV: 0.3, // Probability of vertical expansion
        },
        {
          colour: [235, 235, 235],
          opacity: 0.15,
          minSize: 100,
          maxSize: 10000,
          pH: 0.7,
          pV: 0.3,
        },
        {
          colour: [235, 235, 235],
          opacity: 0.15,
          minSize: 100,
          maxSize: 10000,
          pH: 0.7,
          pV: 0.3,
        },
        {
          colour: [235, 235, 235],
          opacity: 0.15,
          minSize: 100,
          maxSize: 10000,
          pH: 0.7,
          pV: 0.3,
        },
        {
          colour: [173, 216, 230],
          opacity: 0.15,
          minSize: 100,
          maxSize: 10000,
          pH: 0.6,
          pV: 0.2,
        },
        {
          colour: [173, 216, 230],
          opacity: 0.15,
          minSize: 100,
          maxSize: 10000,
          pH: 0.6,
          pV: 0.2,
        },
        {
          colour: [240, 240, 240],
          opacity: 0.2,
          minSize: 100,
          maxSize: 10000,
          pH: 0.6,
          pV: 0.2,
        },
      ],
    }
  }
}

function fillSkyDefaults() {
  document.getElementById('skyWidth').value = config.sky.properties.width;
  document.getElementById('skyHeight').value = config.sky.properties.height;
  document.getElementById('skyPixelSize').value = config.sky.properties.pixelSize;
  document.getElementById('skyRed').value = config.sky.properties.colour[0];
  document.getElementById('skyGreen').value = config.sky.properties.colour[1];
  document.getElementById('skyBlue').value = config.sky.properties.colour[2];
  document.getElementById('skyOpacity').value = config.sky.properties.opacity;
  document.getElementById('skyMutationSpeed').value = config.sky.properties.mutationSpeed;
}

function fillStarsDefault() {
  document.getElementById('starsInclude').value = config.stars.include;
  document.getElementById('starsOpacity').value = config.stars.properties.opacity;
  document.getElementById('starsDensity').value = config.stars.properties.density;
}

function fillMoonDefault() {
  document.getElementById('moonInclude').value = config.moon.include;
  document.getElementById('moonRed').value = config.moon.properties.colour[0];
  document.getElementById('moonGreen').value = config.moon.properties.colour[1];
  document.getElementById('moonBlue').value = config.moon.properties.colour[2];
  document.getElementById('moonRadius').value = config.moon.properties.radius;
  document.getElementById('moonHalfMoon').value = config.moon.properties.halfMoon;
  document.getElementById('moonNoise').value = config.moon.properties.noise;
}

function renameLayers(layersID: string) {
  let layers = document.getElementById(layersID);
  for (let i = 0; i < layers.children.length; i++) {
    layers.children[i].children[0].textContent = 'Layer' + (i + 1);
  }
}

function createSunsetLayers() {
  document.getElementById('sunsetLayers').removeChild(originalSunsetLayer);
  for (let i = 0; i < config.sunset.properties.layers.length; i++) {
    let layer: any = originalSunsetLayer.cloneNode(true);
    layer.removeAttribute("id");
    layer.children[0].textContent = 'Layer ' + (i + 1);
    layer.children[1].onclick = function() {
      document.getElementById('sunsetLayers').removeChild(layer);
      sunsetLayerCount -= 1;
      renameLayers('sunsetLayers');
    }
    layer.children[2].children[0].value = config.sunset.properties.layers[i].colour[0];
    layer.children[2].children[1].value = config.sunset.properties.layers[i].colour[1];
    layer.children[2].children[2].value = config.sunset.properties.layers[i].colour[2];
    layer.children[3].children[0].value = config.sunset.properties.layers[i].maxOpacity;
    layer.children[4].children[0].value = config.sunset.properties.layers[i].proportion;
    layer.children[5].children[0].value = config.sunset.properties.layers[i].mutationSpeed;
    layer.children[6].children[0].value = config.sunset.properties.layers[i].xStretch;
    layer.children[7].children[0].value = config.sunset.properties.layers[i].yStretch;
    document.getElementById('sunsetLayers').appendChild(layer);
    sunsetLayerCount += 1;
  }
}

function addSunsetLayer() {
  let layer: any = originalSunsetLayer.cloneNode(true);
  layer.removeAttribute("id");
  sunsetLayerCount += 1
  layer.children[0].textContent = 'Layer ' + sunsetLayerCount;
  document.getElementById('sunsetLayers').appendChild(layer);
}

function fillSunsetDefault() {
  document.getElementById('sunsetInclude').value = config.sunset.include;
  createSunsetLayers()
}

function createCloudsLayers() {
  document.getElementById('cloudsLayers').removeChild(originalCloudLayer);
  for (let i = 0; i < config.clouds.properties.layers.length; i++) {
    let layer: any = originalCloudLayer.cloneNode(true);
    layer.removeAttribute("id");
    layer.children[0].textContent = 'Layer ' + (i + 1);
    layer.children[1].onclick = function() {
      document.getElementById('cloudsLayers').removeChild(layer);
      cloudLayerCount -= 1;
      renameLayers('cloudsLayers');
    }
    layer.children[2].children[0].value = config.clouds.properties.layers[i].colour[0];
    layer.children[2].children[1].value = config.clouds.properties.layers[i].colour[1];
    layer.children[2].children[2].value = config.clouds.properties.layers[i].colour[2];
    layer.children[3].children[0].value = config.clouds.properties.layers[i].opacity;
    layer.children[4].children[0].value = config.clouds.properties.layers[i].minSize;
    layer.children[5].children[0].value = config.clouds.properties.layers[i].maxSize;
    layer.children[6].children[0].value = config.clouds.properties.layers[i].pH;
    layer.children[7].children[0].value = config.clouds.properties.layers[i].pV;
    document.getElementById('cloudsLayers').appendChild(layer);
    cloudLayerCount += 1;
  }
}

function addCloudsLayer() {
  let layer: any = originalCloudLayer.cloneNode(true);
  layer.removeAttribute("id");
  cloudLayerCount += 1
  layer.children[0].textContent = 'Layer ' + cloudLayerCount;
  document.getElementById('cloudsLayers').appendChild(layer);

}

function fillCloudsDefault() {
  document.getElementById('cloudsInclude').value = config.clouds.include;
  document.getElementById('cloudsQuantity').value = config.clouds.properties.quantity;
  createCloudsLayers()
}

function init() {
  fillSkyDefaults();
  fillStarsDefault();
  fillMoonDefault();
  fillSunsetDefault();
  fillCloudsDefault();
}


function collectSky() {
  config.sky.properties.width = parseInt(document.getElementById('skyWidth').value);
  config.sky.properties.height = parseInt(document.getElementById('skyHeight').value);
  config.sky.properties.pixelSize = parseInt(document.getElementById('skyPixelSize').value);
  config.sky.properties.colour[0] = parseInt(document.getElementById('skyRed').value);
  config.sky.properties.colour[1] = parseInt(document.getElementById('skyGreen').value);
  config.sky.properties.colour[2] = parseInt(document.getElementById('skyBlue').value);
  config.sky.properties.opacity = parseFloat(document.getElementById('skyOpacity').value);
  config.sky.properties.mutationSpeed = parseInt(document.getElementById('skyMutationSpeed').value);
}

function collectStars() {
  config.stars.include = document.getElementById('starsInclude').value == 'true';
  config.stars.properties.opacity = parseFloat(document.getElementById('starsOpacity').value);
  config.stars.properties.density = parseFloat(document.getElementById('starsDensity').value);
}

function collectMoon() {
  config.moon.include = document.getElementById('moonInclude').value == 'true';
  config.moon.properties.colour[0] = parseInt(document.getElementById('moonRed').value);
  config.moon.properties.colour[1] = parseInt(document.getElementById('moonGreen').value);
  config.moon.properties.colour[2] = parseInt(document.getElementById('moonBlue').value);
  config.moon.properties.radius = parseInt(document.getElementById('moonRadius').value);
  config.moon.properties.halfMoon = document.getElementById('moonHalfMoon').value == 'true';
  config.moon.properties.noise = parseInt(document.getElementById('moonNoise').value);
}

function collectSunsetLayers() {
  let layers = document.getElementById('sunsetLayers');
  let configLayers: SunsetLayer[] = [];
  for (let i = 0; i < layers.children.length; i++) {
    let layer = layers.children[i];
    let configLayer: SunsetLayer = {
      colour: [parseInt(layer.children[2].children[0].value), parseInt(layer.children[2].children[1].value), parseInt(layer.children[2].children[2].value)],
      maxOpacity: parseFloat(layer.children[3].children[0].value),
      proportion: parseFloat(layer.children[4].children[0].value),
      mutationSpeed: parseInt(layer.children[5].children[0].value),
      xStretch: parseFloat(layer.children[6].children[0].value),
      yStretch: parseFloat(layer.children[7].children[0].value),
    }
    configLayers.push(configLayer);
  }
  config.sunset.properties.layers = configLayers;
}

function collectSunset() {
  config.sunset.include = document.getElementById('sunsetInclude').value == 'true';
  collectSunsetLayers();
}

function collectCloudsLayers() {
  let layers = document.getElementById('cloudsLayers');
  let configLayers: CloudLayer[] = [];
  for (let i = 0; i < layers.children.length; i++) {
    let layer = layers.children[i];
    let configLayer: CloudLayer = {
      colour: [parseInt(layer.children[2].children[0].value), parseInt(layer.children[2].children[1].value), parseInt(layer.children[2].children[2].value)],
      opacity: parseFloat(layer.children[3].children[0].value),
      maxSize: parseInt(layer.children[4].children[0].value),
      minSize: parseInt(layer.children[5].children[0].value),
      pH: parseFloat(layer.children[6].children[0].value),
      pV: parseFloat(layer.children[7].children[0].value),
    }
    configLayers.push(configLayer);
  }
  config.clouds.properties.layers = configLayers;
}

function collectClouds() {
  config.clouds.include = document.getElementById('cloudsInclude').value == 'true';
  config.clouds.properties.quantity = parseInt(document.getElementById('cloudsQuantity').value);
  collectCloudsLayers();
}

function collectInputs() {
  collectSky();
  collectStars();
  collectMoon();
  collectSunset();
  collectClouds();
}

function run() {
  collectInputs();
  runSkyGeneration();
  document.getElementById('config').style.display = 'none';
}

let originalSunsetLayer = document.getElementById('sunsetLayer');
let sunsetLayerCount = 0;
let originalCloudLayer = document.getElementById('cloudsLayer');
let cloudLayerCount = 0;

init();