/* global itowns, debug, dat */

// eslint-disable-next-line no-unused-vars

// This connects to rosbridge server socket and show its messages (Pointclouds2, ...)

/*
    console.log("showRosData");
    //var ros;
    var pointclouds = [];
    var oldPostUpdate;
    var viewerDiv;
    var debugGui;
    var view;
    var controls;
    var cameraPositioned = false;
    var listCoords = [];
    var lineId = 0;

    viewerDiv = document.getElementById('viewerDiv');
    viewerDiv.style.display = 'block';

    itowns.THREE.Object3D.DefaultUp.set(0, 0, 1);

    itowns.proj4.defs('EPSG:3946',
        '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 ' +
        '+y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

    debugGui = new dat.GUI();

    view = new itowns.View('EPSG:3946', viewerDiv, { renderer: { logarithmicDepthBuffer: true } });
    view.mainLoop.gfxEngine.renderer.setClearColor(0x555555);
    controls = new itowns.FlyControls(view, { focusOnClick: true });*/


    /*
    var cmdVel = new ROSLIB.Topic({
      ros : ros,
      name : topicName,
      messageType : messageType
    });

    var twist = new ROSLIB.Message({
          linear : {
          x : 0.1,
          y : 0.2,
          z : 0.3
          },
          angular : {
          x : -0.1,
          y : -0.2,
          z : -0.3
          }
    });
    cmdVel.publish(twist);
    */


    /*var listener = new ROSLIB.Topic({
        ros : ros,
        name : topicName,
        messageType : messageType
    });*/

    /*
    function loadPoints() {
        var points;
        console.log("loadPoints");
        var particles = 5000;
        var geometry = new itowns.THREE.BufferGeometry();
        var positions = new Float32Array( particles * 3 );
        var colors = new Float32Array( particles * 3 );
        var color = new itowns.THREE.Color();
        var n = 1000, n2 = n / 2; // particles spread in the cube
        for ( var i = 0; i < positions.length; i += 3 ) {
            // positions
            var x = Math.random() * n - n2;
            var y = Math.random() * n - n2;
            var z = Math.random() * n - n2;
            positions[ i ]     = x;
            positions[ i + 1 ] = y;
            positions[ i + 2 ] = z;
            // colors
            var vx = ( x / n ) + 0.5;
            var vy = ( y / n ) + 0.5;
            var vz = ( z / n ) + 0.5;
            color.setRGB( vx, vy, vz );
            colors[ i ]     = color.r;
            colors[ i + 1 ] = color.g;
            colors[ i + 2 ] = color.b;
        }
        geometry.addAttribute( 'position', new itowns.THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'color', new itowns.THREE.BufferAttribute( colors, 3 ) );
        geometry.computeBoundingSphere();

        var material = new itowns.THREE.PointsMaterial( { transparent:true, opacity: 0, size: 1, vertexColors: itowns.THREE.VertexColors } );
        points = new itowns.THREE.Points( geometry, material );
        points.scale.set(0.5,0.5,0.5);
        view.scene.add(points);
        pointclouds.push(points);
        return points;

    }*/

   // loadPoints();
    //animateNewDataReceived();

    /*
    function placeCamera(position, lookAt) {
        view.camera.camera3D.position.set(position.x, position.y, position.z);
        view.camera.camera3D.lookAt(lookAt);
        // create controls
        controls = new itowns.FirstPersonControls(view, { focusOnClick: true });
        //debugGui.add(controls, 'moveSpeed', 1, 100).name('Movement speed');

        view.notifyChange(true);
    }*/


    /*function animateNewDataReceived() {

        requestAnimationFrame( animateNewDataReceived);

        for(var i = 0; i < pointclouds.length; ++i){
            var p = pointclouds[i];
            if(p.scale.x < 1){
                p.scale.x *= 1.01;//multiplyScalar(1.1);
                p.updateMatrixWorld(true);
            }
            if(p.material.opacity < 0.5) p.material.opacity += 0.005;

        }
        view.notifyChange(true);
    }*/
