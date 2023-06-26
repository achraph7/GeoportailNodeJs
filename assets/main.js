// const { enable } = require("express/lib/application");

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Zoom",
  "esri/widgets/Search",
  "esri/layers/FeatureLayer",
  "esri/renderers/UniqueValueRenderer",
  "esri/renderers/ClassBreaksRenderer",
  "esri/symbols/FillSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/renderers/PieChartRenderer",
  "esri/widgets/Editor",
  "esri/widgets/BasemapGallery",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/Directions",
], function (
  esriConfig,
  Map,
  MapView,
  Zoom,
  Search,
  FeatureLayer,
  UniqueValueRenderer,
  ClassBreaksRenderer,
  FillSymbol,
  SimpleFillSymbol,
  SimpleRenderer,
  PieChartRenderer,
  Editor,
  BasemapGallery,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  Legend,
  Expand,
  Directions
) {
  esriConfig.apiKey =
    "AAPKcbdac394ec6343c9930a92d349527d5aWTzN2AI0QzH4s1CC3-RWJRxuaMB2aFpUJAH1x0xi9pIr9nEPzol_1RFz4U3Qaewq";
  let activeWidget = null;
  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });

  const divf = document.getElementById("ff");
  const view = new MapView({
    map: map,
    center: [-7.62, 33.59], // Longitude, latitude
    zoom: 10, // Zoom level
    container: "viewDiv", // Div element
  });

  view.ui.add(divf);
  const searchWidget = new Search({
    view: view,
  });
  view.ui.add(searchWidget, {
    position: "top-right",
  });
  view.ui.add("topbar", "top-right");

  document
    .getElementById("distanceButton")
    .addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

  document.getElementById("areaButton").addEventListener("click", function () {
    setActiveWidget(null);
    if (!this.classList.contains("active")) {
      setActiveWidget("area");
    } else {
      setActiveButton(null);
    }
  });

  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DistanceMeasurement2D({
          view: view,
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("distanceButton"));
        break;
      case "area":
        activeWidget = new AreaMeasurement2D({
          view: view,
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        if (activeWidget) {
          view.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    view.focus();
    let elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  let zoom = new Zoom({
    view: view,
  });
  view.ui.add(zoom, "top-right");
  const surfRenderer = {
    type: "class-breaks",
    // attribute of interest
    field: "Shape_Area",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 8000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [241, 238, 246],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 8000001,
        maxValue: 16000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [212, 185, 218],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 16000001,
        maxValue: 26000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [201, 148, 199],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 26000001,
        maxValue: 48000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [223, 101, 176],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 48000001,
        maxValue: 78000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [221, 28, 119],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
      {
        minValue: 78000001,
        maxValue: 135000000,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [152, 0, 67],
          style: "solid",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "white",
            width: 1,
          },
        },
      },
    ],
  };
  const Prenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    field: "PREFECTURE",
    defaultSymbol: { type: "simple-fill" }, // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [
      {
        // All features with value of "North" will be blue
        value: "PREFECTURE DE CASABLANCA",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "blue",
        },
      },
      {
        // All features with value of "East" will be green
        value: "PREFECTURE DE MOHAMMEDIA",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "green",
        },
      },
      {
        // All features with value of "South" will be red
        value: "PROVINCE DE NOUACEUR",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "red",
        },
      },
      {
        // All features with value of "West" will be yellow
        value: "PROVINCE DE MEDIOUNA",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "yellow",
        },
      },
      {
        // All features with value of "West" will be yellow
        value: "PROVINCE DE BEN SLIMANE",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "orange",
        },
      },
    ],
  };
  var Comrenderer = new UniqueValueRenderer({
    field: "COMMUNE_AR", // Remplacez par la propriété des communes utilisée pour le rendu unique
    defaultSymbol: FillSymbol,
  });
  var communeProperties = [
    { nom: "MUNICIPALITE NOUACEUR", couleur: "#2ca25f" }, // Exemple de commune avec une couleur rouge
    { nom: "COMMUNE RURALE OULED SALEH", couleur: "#99d8c9" }, // Exemple de commune avec une couleur verte
    { nom: "COMMUNE RURALE OULED AZZOUZ", couleur: "#8856a7" }, // Exemple de commune avec une couleur bleue
    { nom: "MUNICIPALITE DAR BOUAZZA", couleur: "#9ebcda" }, // Exemple de commune avec une couleur rouge
    { nom: "MUNICIPALITE TIT MELLIL", couleur: "#43a2ca" }, // Exemple de commune avec une couleur verte
    { nom: "ARRONDISSEMENT BEN M'SICK", couleur: "#a8ddb5" },
    { nom: "ARRONDISSEMENT EL FIDA", couleur: "#e34a33" }, // Exemple de commune avec une couleur rouge
    { nom: "ARRONDISSEMENT SIDI OTHMANE", couleur: "#fdbb84" }, // Exemple de commune avec une couleur verte
    { nom: "COMMUNE DU MECHOUAR", couleur: "#2b8cbe" },
    { nom: "ARRONDISSEMENT MERS SULTAN", couleur: "#a6bddb" }, // Exemple de commune avec une couleur rouge
    { nom: "ARRONDISSEMENT MAARIF", couleur: "#1c9099" }, // Exemple de commune avec une couleur verte
    { nom: "ARRONDISSEMENT HAY MOHAMMADI", couleur: "#ece2f0" },

    { nom: "ARRONDISSEMENT ESSOUKHOUR ASSAWDA", couleur: "#dd1c77" }, // Exemple de commune avec une couleur rouge
    { nom: "ARRONDISEMENT ANFA", couleur: "#c994c7" }, // Exemple de commune avec une couleur verte
    { nom: "ARRONDISSEMENT SIDI BELYOUT", couleur: "#c51b8a" }, // Exemple de commune avec une couleur bleue
    { nom: "ARRONDISSEMENT AIN SEBAA", couleur: "#fa9fb5" }, // Exemple de commune avec une couleur rouge
    { nom: "ARRONDISSEMENT SIDI BERNOUSSI", couleur: "#fde0dd" }, // Exemple de commune avec une couleur verte
    { nom: "MUNICIPALITE AIN HARROUDA", couleur: "#31a354" },
    { nom: "MUNICIPALITE MANSOURIA", couleur: "#addd8e" }, // Exemple de commune avec une couleur rouge
    { nom: "MUNICIPALITE BOUSKOURA", couleur: "#f7fcb9" }, // Exemple de commune avec une couleur verte
    { nom: "MUNICIPALITE LAHRAOUIYINE", couleur: "#2c7fb8" },
    { nom: "COMMUNE RURALE MEJJATIA OULED TALEB", couleur: "#7fcdbb" }, // Exemple de commune avec une couleur rouge
    { nom: "MUNICIPALITE MEDIOUNA", couleur: "#d95f0e" }, // Exemple de commune avec une couleur verte
    { nom: "COMMUNE RURALE ECHELLALATE", couleur: "#fec44f" },

    { nom: "COMMUNE RURALE SIDI MOUSSA BEN MEJDOUB", couleur: "#f03b20" }, // Exemple de commune avec une couleur bleue
    { nom: "COMMUNE RURALE BENI YACKLEF", couleur: "#feb24c" }, // Exemple de commune avec une couleur rouge
    { nom: "MUNICIPALITE MOHAMMEDIA", couleur: "#e6550d" }, // Exemple de commune avec une couleur verte
    { nom: "COMMUNE RURALE SIDI HAJJAJ OUED HASSAR", couleur: "#fdae6b" },
    { nom: "COMMUNE RURALE SIDI MOUSSA BEN ALI", couleur: "#756bb1" }, // Exemple de commune avec une couleur rouge
    { nom: "ARRONDISSEMENT SIDI MOUMEN", couleur: "#bcbddc" }, // Exemple de commune avec une couleur verte
    { nom: "ARRONDISSEMENT SBATA", couleur: "#de2d26" },
    { nom: "ARRONDISSEMENT AIN CHOCK", couleur: "#fc9272" }, // Exemple de commune avec une couleur rouge
    { nom: "ARRONDISSEMENT MOULAY R'CHID", couleur: "#fee0d2" }, // Exemple de commune avec une couleur verte
    { nom: "ARRONDISSEMENT HAY HASSANI", couleur: "#a1d99b" },
  ];
  for (var i = 0; i < communeProperties.length; i++) {
    var communes = communeProperties[i];

    // Créer le symbole unique pour la commune
    var uniqueSymbol = new SimpleFillSymbol({
      color: communes.couleur, // Utilisez directement la couleur hexadécimale
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    });

    // Ajouter le symbole unique au rendu
    Comrenderer.addUniqueValueInfo(communes.nom, uniqueSymbol);
  }
  let popRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      size: 6,
      color: "green",
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "white",
      },
    },
  };
  const sizeVisualVariable = {
    type: "size",
    field: "TOTAL2004",
    minDataValue: 3365,
    maxDataValue: 323944,
    minSize: 8,
    maxSize: 30,
  };
  popRenderer.visualVariables = [sizeVisualVariable];
  let popRenderer2 = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      size: 6,
      color: "red",
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "white",
      },
    },
  };
  const sizeVisualVariable2 = {
    type: "size",
    field: "TOTAL1994",
    minDataValue: 3365,
    maxDataValue: 323944,
    minSize: 8,
    maxSize: 30,
  };
  popRenderer2.visualVariables = [sizeVisualVariable2];

  let symbol3 = {
    type: "picture-marker", // Utiliser un picture-marker pour afficher une icône
    url: "assets/image/dexclamation.png", // Spécifier le chemin vers l'icône d'hôtel
    width: "25px", // Ajuster la largeur de l'icône si nécessaire
    height: "25px", // Ajuster la hauteur de l'icône si nécessaire
    xoffset: 0, // Décalage horizontal de l'icône par rapport à la géométrie
    yoffset: 0,
  };

  const commune = new FeatureLayer({
    url: "https://services7.arcgis.com/O0M7sZ9k5yutjMOD/arcgis/rest/services/data/FeatureServer/5",
  });
  const population = new FeatureLayer({
    url: "https://services7.arcgis.com/O0M7sZ9k5yutjMOD/arcgis/rest/services/data/FeatureServer/0",
  });
  const voirie = new FeatureLayer({
    url: "https://services7.arcgis.com/O0M7sZ9k5yutjMOD/arcgis/rest/services/data/FeatureServer/4",
  });

  const hotels = new FeatureLayer({
    url: "https://services7.arcgis.com/O0M7sZ9k5yutjMOD/arcgis/rest/services/data/FeatureServer/2",
  });

  const reclamation = new FeatureLayer({
    url: "https://services7.arcgis.com/O0M7sZ9k5yutjMOD/arcgis/rest/services/data/FeatureServer/3",
    symbol: symbol3,
  });

  const grand_surface = new FeatureLayer({
    url: "https://services7.arcgis.com/O0M7sZ9k5yutjMOD/arcgis/rest/services/data/FeatureServer/1",
  });
  const reclPopupTemplate = {
    title: "<b>reclamation : {Objet}</b>",
    content:
      "<p> Message : {Message} </p> + <p> Demarche : {Demarche_d} </p>  + <p> E-mail : {Mail} </p> ",
  };
  const roadPopup = {
    title: "Road Info",
    content: "<p>Nom: {NOM}</p><p>Length: {LENGTH}m</p>",
  };

  voirie.popupTemplate = roadPopup;

  reclamation.popupTemplate = reclPopupTemplate;

  //map.add(layer);

  map.add(commune);
  map.add(voirie);
  //map.add(grand_surface);
  //map.add(hotels);
  //map.add(population);
  map.add(reclamation);

  const parcelLayerSQL = [
    "-- Critère de recherche --",
    "Type='Marjane'",
    "Type='Metro'",
    "Type='Acima'",
    "Type='Grande Surface Spécialisée'",
    "Type='LABEL VIE'",
    "Type='Twin Center'",
    "Type='Marina'",
  ];
  let whereClause = parcelLayerSQL[0];
  const select5 = document.getElementById("GSSelect");

  select5.addEventListener("change", (event) => {
    whereClause = event.target.value;
    queryFeatureLayer5(view.extent);
  });

  function queryFeatureLayer5(extent) {
    const parcelQuery5 = {
      where: whereClause, // Set by select element
      geometry: extent, // Restricted to visible extent of the map
      outFields: ["Type", "Adresse", "OBJECTID"],
      returnGeometry: true,
    };
    grand_surface
      .queryFeatures(parcelQuery5)
      .then((results) => {
        console.log("Feature count: " + results.features.length);
        displayResults5(results);
      })
      .catch((error) => {
        console.log(error.error);
      });
  }

  function displayResults5(results) {
    // Create a blue polygon
    const symbol1 = {
      type: "picture-marker", // Utiliser un picture-marker pour afficher une icône
      url: "assets/image/magasin.png", // Spécifier le chemin vers l'icône d'hôtel
      width: "20px", // Ajuster la largeur de l'icône si nécessaire
      height: "20px", // Ajuster la hauteur de l'icône si nécessaire
      xoffset: 0, // Décalage horizontal de l'icône par rapport à la géométrie
      yoffset: 0,
    };
    const popupTemplate1 = {
      title: "Nom {Type}",
      content: "Type : {Type} <br> Adresse : {Adresse} ",
    };

    results.features.map((feature) => {
      feature.symbol = symbol1;
      feature.popupTemplate = popupTemplate1;
      return feature;
    });

    view.popup.close();
    view.graphics.removeAll();
    view.graphics.addMany(results.features);
  }

  //======================================================================================//
  const parcelLayerSQL1 = [
    "-- Critère de recherche --",
    "CATÉGORIE = '1*'",
    "CATÉGORIE = '2*'",
    "CATÉGORIE = '3*'",
    "CATÉGORIE = '4*'",
    "CATÉGORIE = '5*'",
  ];

  let whereClause1 = parcelLayerSQL1[0];
  const select1 = document.getElementById("hotelSelect");

  select1.addEventListener("change", (event) => {
    whereClause1 = event.target.value;
    queryFeatureLayer1(view.extent);
  });

  function queryFeatureLayer1(extent) {
    const parcelQuery1 = {
      where: whereClause1, // Set by select element
      geometry: extent, // Restricted to visible extent of the map
      outFields: [
        "HOTEL",
        "CATÉGORIE",
        "NUMERO",
        "ADRESSE",
        "PHONE1",
        "PHONE_2",
      ],
      returnGeometry: true,
    };
    hotels
      .queryFeatures(parcelQuery1)
      .then((results) => {
        console.log("Feature count: " + results.features.length);
        displayResults1(results);
      })
      .catch((error) => {
        console.log(error.error);
      });
  }

  function displayResults1(results) {
    // Create a blue polygon
    const symbol2 = {
      type: "picture-marker", // Utiliser un picture-marker pour afficher une icône
      url: "assets/image/hotels.png", // Spécifier le chemin vers l'icône d'hôtel
      width: "25px", // Ajuster la largeur de l'icône si nécessaire
      height: "25px", // Ajuster la hauteur de l'icône si nécessaire
      xoffset: 0, // Décalage horizontal de l'icône par rapport à la géométrie
      yoffset: 0,
    };
    const popupTemplate2 = {
      title: "Nom {HOTEL}",
      content:
        "Catégorie : {CATÉGORIE} <br> Adresse : {ADRESSE} <br> Numero 1:{PHONE1} <br> Numero2:{PHONE_2}",
    };

    results.features.map((feature) => {
      feature.symbol = symbol2;
      feature.popupTemplate = popupTemplate2;
      return feature;
    });

    view.popup.close();
    view.graphics.removeAll();
    view.graphics.addMany(results.features);
  }

  document
    .getElementById("communeSelect")
    .addEventListener("change", function (event) {
      var selectedRenderer1 = event.target.value;

      // Mettre à jour le rendu de la couche en fonction de l'option sélectionnée
      switch (selectedRenderer1) {
        case "surfRenderer":
          commune.renderer = surfRenderer;
          commune.popupTemplate = ComTemplate;
          break;
        case "Comrenderer":
          commune.renderer = Comrenderer;
          commune.popupTemplate = ComTemplate;

          break;
        case "Prenderer":
          commune.renderer = Prenderer;
          commune.popupTemplate = ComTemplate;

          break;
        default:
          break;
      }
    });

  const ComTemplate = {
    title: " Commune : {numero}",
    content:
      "<p>Prefecture: {PREFECTURE}</p><p>Pan d'amenagement : {PLAN_AMENA}</p>",
  };

  document
    .getElementById("populationSelect")
    .addEventListener("change", function (event) {
      var selectedRenderer2 = event.target.value;

      // Mettre à jour le rendu de la couche en fonction de l'option sélectionnée
      switch (selectedRenderer2) {
        case "popRenderer":
          population.renderer = popRenderer;
          map.add(population);
          break;
        case "popRenderer2":
          population.renderer = popRenderer2;
          map.add(population);
          break;
        case "pierenderer":
          population.renderer = {
            type: "pie-chart", // autocasts as new PieChartRenderer()
            attributes: [
              {
                field: "TOTAL2004",
                label: "Population 2004",
                color: "red",
              },
              {
                field: "TOTAL1994",
                label: "Population 1994",
                color: "blue",
              },
            ],
          };
          map.add(population);
          break;
        default:
          break;
      }
    });
  var editter = document.createElement("div");

  // Attribuer un ID à l'élément div

  const editor = new Editor({
    view: view,
    container: editter,
    layerInfos: [
      {
        layer: reclamation, // pass in the feature layer,
        formTemplate: {
          // autocastable to FormTemplate
          elements: [
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Objet",
              label: "Objet de réclamation",
            },
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Message",
              label: "Message",
            },
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Demarche_d",
              label: "Démarche",
            },
            {
              // autocastable to FieldElement
              type: "field",
              fieldName: "Mail",
              label: "E-mail",
            },
          ],
        },
        enabled: true, // Default is true, set to false to disable editing functionality.
        addEnabled: true, // Default is true, set to false to disable the ability to add a new feature.
        updateEnabled: true, // Default is true, set to false to disable the ability to edit an existing feature.
        deleteEnabled: true, // Default is true, set to false to disable the ability to delete features.
        attributeUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit attributes in the update workflow.
        geometryUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit feature geometries in the update workflow.
        attachmentsOnCreateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while creating features.
        attachmentsOnUpdateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while updating/deleting features.
      },
      {
        layer: commune, // pass in the feature layer,
        enabled: false, // Default is true, set to false to disable editing functionality.
      },
      {
        layer: voirie, // pass in the feature layer,
        enabled: false, // Default is true, set to false to disable editing functionality.
      },
    ],
  });

  const editbutton = document.getElementById("affihceEdit");
  editbutton.addEventListener("click", function () {
    if (editter.style.display === "none") {
      view.ui.add(editor, "top-right");
      editter.style.display = "block";
    } else {
      editter.style.display = "none";
    }
  });

  var toggleButton = document.getElementById("toggleButton");
  var contentDiv = document.createElement("div");

  // Attribuer un ID à l'élément div
  contentDiv.id = "basemapGalleryDiv";

  const basemapGallery = new BasemapGallery({
    view: view,
    container: contentDiv,

    source: {
      query: {
        title: '"World Basemaps for Developers" AND owner:esri',
      },
    },
  });
  view.ui.add(toggleButton, "bottom-right");
  toggleButton.addEventListener("click", function () {
    if (contentDiv.style.display === "none") {
      view.ui.add(contentDiv, "bottom-right");
      contentDiv.style.display = "block";
    } else {
      contentDiv.style.display = "none";
    }
  });

  const legend = new Expand({
    content: new Legend({
      view: view,
      style: "card", // other styles include 'classic'
    }),
    view: view,
    // expanded: true,
  });
  view.ui.add(legend, "bottom-right");

  var directions = new Expand({
    content: new Directions({
      view: view,
    }),
    view: view,
  });

  view.ui.add(directions, "top-right");

  directions.on("load", function () {
    var routeSymbol = {
      type: "simple-line",

      color: [255, 0, 0],

      width: 4,
    };

    directions.routeSymbol = routeSymbol;
  });
});
