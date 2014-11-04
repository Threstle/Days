var Webgl = (function(){





    function Webgl(width, height){

        
        vector = new THREE.Vector3();
        raycaster = new THREE.Raycaster();
        // Basic three.js setup
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000000);
        this.camera.position.z = 1000;
        this.camera.position.y = 200;


        camera = this.camera;
        rate = 0;
        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setSize(width, height);
      //  this.renderer.setClearColor(0xFFFFFF);

        this.sol = new Plane();
        this.sol.position.set(0,-50,0);
        this.sol.rotation.set(0,0,0);
        this.scene.add(this.sol);

        // this.river = new River();
        // this.river.position.set(0,300,0);
        // this.river.rotation.set(-Math.PI/2,0,0);
        // this.scene.add(this.river);
       
        var geometry = new THREE.BoxGeometry(3000,100,3000);
        //var geometry = new THREE.CylinderGeometry( 0, 3500*0.6, 4000*1.6, 4, 1 );
        var material = new THREE.MeshLambertMaterial({ color: 0x999999, wireframe: false, transparent : true, opacity :0.6})
        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = -100;
        cube.position.z = 0;
        // cube.rotation.z = -Math.PI;
        // cube.rotation.y = -Math.PI/4;
        this.cube = cube;
        this.scene.add( cube );

        var geometry = new THREE.BoxGeometry(3000,6000,3000);
        var material = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: false, transparent : true, opacity :0.3})
        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;

        //this.scene.add( cube );

                 someOtherObject = new Cloud(100);
                    someOtherObject.position.x = 0;
                    someOtherObject.position.y = 2600;
                    someOtherObject.position.z = 0;
                    this.cloud = someOtherObject;
                    this.scene.add(someOtherObject);


        this.pivot = new THREE.Object3D();          
        this.light = new THREE.PointLight( 0xffffff, 1.2);
        this.light.position.set(0,2000,0);
        this.sol.add(this.pivot);
        this.pivot.add(this.light);

        this.pivot2 = new THREE.Object3D(); 
        this.light2 = new THREE.PointLight( 0x006666, 0.4);
        this.light2.position.set(0,-2000,0);
        this.sol.add(this.pivot2);
        this.pivot2.add(this.light2);
        this.moon = new Moon();
        this.light2.add(this.moon);
/*
        this.light3 = new THREE.PointLight( 0xFFFFFF, 0.1);
        this.light3.position.set(0,500,2000);
        this.scene.add(this.light3);*/

        var helper = new THREE.PointLightHelper(this.light, 100);

        //this.scene.add(helper);

        var helper2 = new THREE.PointLightHelper(this.light2, 100);

        //this.scene.add(helper2);


        controls = new THREE.OrbitControls( camera );
        controls.damping = 0.2;
        controls.noPan = true;
        controls.minDistance = 2000;
        controls.maxDistance = 4000;

        controls.minPolarAngle =  Math.PI/3; // radians
        controls.maxPolarAngle =  Math.PI/3; // radi
        controls.update();
        //controls.addEventListener( 'change', render );

        // setInterval(function(){
            
        //     var pos = parseInt(Math.random()*this.sol.mesh.geometry.vertices.length-50);

        //           var vector = new THREE.Vector3();
        //           vector.setFromMatrixPosition(this.sol.matrixWorld).add(this.sol.mesh.geometry.vertices[pos]);

        //           if(vector.y>= 800){
                
        //              someOtherObject = new Building();
        //             someOtherObject.position.x = vector.x;
        //             someOtherObject.position.y = vector.y;
        //             someOtherObject.position.z = vector.z;
        //              this.scene.add(someOtherObject);
        //              buildings.push(someOtherObject);
        //           }
        //           else if(vector.y<= 0){
      
        //             someOtherObject = new Boat();
        //             someOtherObject.position.x = vector.x;
        //             someOtherObject.position.y = 300;
        //             someOtherObject.position.z = vector.z;
        //             this.scene.add(someOtherObject);
        //             boats.push(someOtherObject);
        //           }

                 

        // }.bind(this),1000);
        setInterval(function(){
            if(mouseDown)this.spawn();
        }.bind(this),100);

        this.makeWater();
 


                this.textureFlare0 = THREE.ImageUtils.loadTexture( "assets/images/lensflare0.png" );
                this.textureFlare2 = THREE.ImageUtils.loadTexture( "assets/images/lensflare0.png" );
                this.textureFlare3 = THREE.ImageUtils.loadTexture( "assets/images/lensflare0.png" );



                
                // this.composer = new THREE.EffectComposer( this.renderer );
                // this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );
         
               
                
                this.composer = new THREE.EffectComposer( this.renderer );
                this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );
         
                
         
                var effect = new THREE.ShaderPass( THREE.DotScreenShader );
                effect.uniforms[ 'scale' ].value = 50;
                this.composer.addPass( effect );
                effect.renderToScreen = true;

                // var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
                // effect.uniforms[ 'amount' ].value = 0.0015;
                // effect.renderToScreen = true;
                // this.composer.addPass( effect );
                

                this.addLight( 0.55, 0.9, 0.5, 0, 0, 0);
                this.addLight( 0.08, 0.8, 0.5,    0, 0, 0);
                this.addLight( 0.995, 0.5, 0.9, 0, 0, 0);

    }

               

   Webgl.prototype.addLight = function( h, s, l, x, y, z ) {

                    var flareColor = new THREE.Color( 0x000000 );
                    flareColor.setHSL( h, s, l + 0.5 );

                    var lensFlare = new THREE.LensFlare( this.textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

                    lensFlare.add(this.textureFlare2, 128, 0.0, THREE.AdditiveBlending );
                    lensFlare.add(this.textureFlare2, 128, 0.0, THREE.AdditiveBlending );
                    lensFlare.add(this.textureFlare2, 128, 0.0, THREE.AdditiveBlending );

                    lensFlare.add(this.textureFlare3, 30, 0.6, THREE.AdditiveBlending );
                    lensFlare.add(this.textureFlare3, 45, 0.7, THREE.AdditiveBlending );
                    lensFlare.add(this.textureFlare3, 60, 0.9, THREE.AdditiveBlending );
                    lensFlare.add(this.textureFlare3, 45, 1.0, THREE.AdditiveBlending );

                    lensFlare.position.copy(new THREE.Vector3(0,0,0));

                    this.light.add( lensFlare );

    }

    Webgl.prototype.spawn = function() {
  
          

            if(mousePosWorld.y>= 300){    
                
              
                var someOtherObject = new Building();
                someOtherObject.position.x = mousePosWorld.x;
                someOtherObject.position.y = mousePosWorld.y;
                someOtherObject.position.z = mousePosWorld.z;
                webgl.scene.add(someOtherObject);
                buildings.push(someOtherObject);
            }
            else if(mousePosWorld.y<= 300){

                    // someOtherObject = new Boat();
                    // someOtherObject.position.x = vector.x;
                    // someOtherObject.position.y = 300;
                    // someOtherObject.position.z = vector.z;
                    // webgl.scene.add(someOtherObject);
                    // boats.push(someOtherObject);*/
            }

    

    }

    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    Webgl.prototype.update = function(){
      //  this.checkRotation();
    //    controls.update();
    this.moon.update();
    this.cloud.update();
    this.pivot.rotation.z += 0.002;
    this.pivot2.rotation.z += 0.002;



    var oldFlag = isBeforeMidnight;

    if(this.pivot.rotation.z <= Math.PI) isBeforeMidnight = true;
    else isBeforeMidnight = false;

    if(oldFlag != isBeforeMidnight){

        var rand = parseInt(Math.random()*messagesTab.length);
        console.log(rand);
        console.log(messagesTab[rand]);
        $('#message').text(messagesTab[rand]); 

        snd2.play();
        setTimeout(function(){$('#message').fadeIn(1000)},1600);
        setTimeout(function(){$('#message').fadeOut(1000)},4000);
    }


    if(this.pivot.rotation.z >= 2*Math.PI)this.pivot.rotation.z = 0;




    if(isBeforeMidnight){
        rate +=0.3;
        this.waterMesh.position.y += 0.05; 
    }
    else{
        rate -=0.3;
        this.waterMesh.position.y -= 0.05;
    }


    $('h1').css('color',"rgb("+~~(rate)+","+~~(rate)+","+~~(rate)+")")
    $('p').css('color',"rgb("+~~(rate)+","+~~(rate)+","+~~(rate)+")")
    
    this.renderer.setClearColor("rgb("+~~(255-rate)+","+~~(255-rate)+","+~~(255-rate)+")");
    // this.cube.material.color = "rgb("+~~(rate)+","+~~(rate)+","+~~(rate)+")";
    // console.log(this.cube.material.color);
    // this.cube.geometry.colorsNeedUpdate = true;


    //this.renderer.color.r+= 0.1;
    //stats.begin();

    
    for(var i = 0; i < buildings.length;i++){
      buildings[i].update();
    }
    for(var i = 0; i < boats.length;i++){
      boats[i].update();
    }
    //stats.end();


    }

    Webgl.prototype.render = function() {    


        // find intersections

                var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject(this.camera );

                raycaster.set(this.camera.position, vector.sub(this.camera.position ).normalize() );

                var intersects = raycaster.intersectObjects( [this.sol.mesh] );

                if ( intersects.length > 0 ) {

                    if ( INTERSECTED != intersects[ 0 ].object ) {

                        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                        // INTERSECTED = intersects[ 0 ].object;
                        // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                        // INTERSECTED.material.emissive.setHex( 0xff0000 );
                       //console.log(intersects[0]);
                        var vector = new THREE.Vector3();
                        vector.setFromMatrixPosition(this.sol.matrixWorld).add(this.sol.mesh.geometry.faces[intersects[0].faceIndex]);
                        mousePosWorld = intersects[0].point;

                    }

                } else {

                    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                    INTERSECTED = null;

                }
             

                var time = performance.now() * 0.001;


                water.material.uniforms.time.value += 1.0 / 60.0;
                this.cloud.visible = false;
               // water.render();
                this.cloud.visible = true;
                
        // this.composer.render();

         this.renderer.render(this.scene, this.camera,null,true);

    };

    Webgl.prototype.makeWater = function(){
        waterNormals = new THREE.ImageUtils.loadTexture( 'assets/images/waternormals.jpg' );
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

        water = new THREE.Water( this.renderer, this.camera, this.scene, {
                    textureWidth: 512, 
                    textureHeight: 512,
                    waterNormals: waterNormals,
                    alpha:  0.3,
                    sunDirection: this.light.position.clone().normalize(),
                    sunColor: 0xfff0000,
                    waterColor: 0xfff0000,
                    distortionScale: 20.0,
                } );

        var mirrorMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(2800,300,2800),
                    water.material
                );

                mirrorMesh.add( water );
                //mirrorMesh.rotation.x = - Math.PI * 0.5;
                mirrorMesh.position.x = 0;
                mirrorMesh.position.y = 100;
                mirrorMesh.position.y = 0;
                this.waterMesh = mirrorMesh;
                this.scene.add( mirrorMesh);

    }

    Webgl.prototype.checkRotation = function(){

        var rotSpeed = 0.01;

        var x = camera.position.x,
            y = camera.position.y,
            z = camera.position.z;

       // if (keyboard.pressed("left")){ 
        camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
        // } else if (keyboard.pressed("right")){
        //     camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
        //     camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
        // }
        
        camera.lookAt(this.scene.position);
        
    };


    return Webgl;

})();





var PointLight = (function(){

    function PointLight(){
        this.pointLight = new THREE.PointLight( 0xFFFFFF);
        
    }
    PointLight.prototype = new THREE.Object3D;
    PointLight.prototype.constructor = PointLight;

    PointLight.prototype.update = function(){};

    return PointLight;
})();

var Plane = (function(){

    function Plane(){

         THREE.Object3D.call(this);
         var geometry = new THREE.PlaneGeometry( 3000, 3000, 100, 100);
         


        var waterNormals = new THREE.ImageUtils.loadTexture( 'assets/images/noise.png' );
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 
        var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false, transparent : false, opacity : 1})
          //material.overdraw = true;


        var oceanTexture = new THREE.ImageUtils.loadTexture( 'assets/images/dirt.jpg' );
        oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping; 
        
        var sandyTexture = new THREE.ImageUtils.loadTexture( 'assets/images/sand.jpg' );
        sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping; 
        
        var grassTexture = new THREE.ImageUtils.loadTexture( 'assets/images/grass.jpg' );
        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; 
        
        var rockyTexture = new THREE.ImageUtils.loadTexture( 'assets/images/rock.jpg' );
        rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping; 
        
        var snowyTexture = new THREE.ImageUtils.loadTexture( 'assets/images/snow.jpg' );
        snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping; 

        var bumpTexture = new THREE.ImageUtils.loadTexture( 'assets/images/snow.jpg' );
        bumpTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping; 

        
        // use "this." to create global object
        customUniforms = {

            oceanTexture:   { type: "t", value: oceanTexture },
            sandyTexture:   { type: "t", value: sandyTexture },
            grassTexture:   { type: "t", value: grassTexture },
            rockyTexture:   { type: "t", value: rockyTexture },
            snowyTexture:   { type: "t", value: snowyTexture },
        };
        
        // create custom material from the shader code above
        //   that is within specially labelled script tags
        var customMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: customUniforms,
            vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            // side: THREE.DoubleSide
        }   );



         this.mesh = new THREE.Mesh(applyMatrix(), material);
         this.add(this.mesh);
    }

    function applyMatrix(){
          data = generateHeight( worldWidth, worldDepth );

                camera.position.y = data[ worldHalfWidth + worldHalfDepth * worldWidth ] * 10 + 500;

                var geometry = new THREE.PlaneGeometry( 3000, 3000, worldWidth - 1, worldDepth - 1 );
                geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

                var vertices = geometry.vertices;

                for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

                    vertices[ i ].y = data[ i ] * 10;
                    if(vertices[i].x ==  - 3000/2 ||vertices[i].x == 3000/2 || vertices[i].z ==  - 3000/2 ||vertices[i].z == 3000/2 ){
                        vertices[i].y = 0;
                    }


                }
                return geometry;
    }


    function generateHeight( width, height ) {

                var size = width * height, data = new Uint8Array( size ),
                perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

                for ( var j = 0; j < 4; j ++ ) {

                    for ( var i = 0; i < size; i ++ ) {

                        var x = i % width, y = ~~ ( i / width );
                        data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

                    }

                    quality *= 5;

                }

                return data;

            }

    Plane.prototype = new THREE.Object3D;
    Plane.prototype.constructor = Plane;

    Plane.prototype.update = function() {};
      
      return Plane;  
    

})();