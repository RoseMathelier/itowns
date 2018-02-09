/* global itowns, document, renderer */
// # Simple Globe viewer

// Define initial camera position
var positionOnGlobe = {
    longitude: 2.33481381638492,
    latitude: 48.850602961052147,
    altitude: 20 };
var promises = [];

// `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
var viewerDiv = document.getElementById('viewerDiv');

// Instanciate iTowns GlobeView*
var globeView = new itowns.GlobeView(viewerDiv, positionOnGlobe, {
//    immersiveControls: true,
    renderer: renderer,
    handleCollision: false,
    sseSubdivisionThreshold: 10,
});

globeView.controls.minDistance = 0;

// speed up controls
// globeView.controls.moveSpeed = 10;

function addLayerCb(layer) {
    return globeView.addLayer(layer);
}

// Define projection that we will use (taken from https://epsg.io/3946, Proj4js section)
itowns.proj4.defs('EPSG:3946',
    '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

// Add one imagery layer to the scene
// This layer is defined in a json file but it could be defined as a plain js
// object. See Layer* for more info.
promises.push(itowns.Fetcher.json('./layers/JSONLayers/Ortho.json').then(addLayerCb));

// Add two elevation layers.
// These will deform iTowns globe geometry to represent terrain elevation.
promises.push(itowns.Fetcher.json('./layers/JSONLayers/WORLD_DTM.json').then(addLayerCb));
promises.push(itowns.Fetcher.json('./layers/JSONLayers/IGN_MNT_HIGHRES.json').then(addLayerCb));

function orientedImagesInit(orientedImages) {
    var i;
    var ori;
    var axis;
    var camera;
    var cameraHelper;
    var listOrientation;
    var quaternion = new itowns.THREE.Quaternion();
    var coordView = new itowns.Coordinates(globeView.referenceCrs, 0, 0, 0);

    // decode oriented images list
    listOrientation = itowns.OrientedImageDecoder.decode(orientedImages, itowns.STEREOPOLIS);

    for (i = 0; i < listOrientation.length; i++) {
        ori = listOrientation[i];
        ori.coord.as(globeView.referenceCrs, coordView);

        // add axis helper
        axis = new itowns.THREE.AxesHelper(1);
        axis.position.copy(coordView.xyz());
        axis.lookAt(coordView.geodesicNormal.clone().add(axis.position));
        quaternion.setFromEuler(ori.orientation);
        axis.quaternion.multiply(quaternion);

        // add a mini camera oriented on Z
        camera = new itowns.THREE.PerspectiveCamera(45, 1, 0.2, 0.8);
        camera.position.set(0, 0, 0);
        camera.lookAt(new itowns.THREE.Vector3(0, 1, 0));
        axis.add(camera);

        // add axis to scene and update matrix world
        globeView.scene.add(axis);
        axis.updateMatrixWorld();

        // add a camera helper on the camera (to see it)
        cameraHelper = new itowns.THREE.CameraHelper(camera);
        globeView.scene.add(cameraHelper);
        cameraHelper.updateMatrixWorld(true);
    }
}

itowns.Fetcher.json('http://www.itowns-project.org/itowns-sample-data/panoramicsMetaData.json',
{ crossOrigin: '' }).then(orientedImagesInit);

exports.view = globeView;
exports.initialPosition = positionOnGlobe;
