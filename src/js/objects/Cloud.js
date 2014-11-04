var Cloud = (function(){


    function Cloud(size){
        this.angle = 0;
        this.size = size;
        THREE.Object3D.call(this);
        // this.caster = new THREE.Raycaster();
          //var geometry = new THREE.PlaneGeometry(500,500);


           //var material = new THREE.MeshBasicMaterial({transparent : true, map : THREE.ImageUtils.loadTexture('assets/images/cloud.png')});


     
         //this.mesh = new THREE.Mesh(geometry, material);
             
             // var geometry = new THREE.Geometry();

             //         for ( i = 0; i < 1000; i ++ ) {

             //             var vertex = new THREE.Vector3();
             //             vertex.x = 3000 * Math.random();
             //             vertex.y = 200 * Math.random();
             //             vertex.z = 3000 * Math.random();

             //              geometry.vertices.push( vertex );

             //         }

             //   // var material = new THREE.ParticleBasicMaterial()

             //    var material = new THREE.PointCloudMaterial( {size: this.size*10, wireframe: false, opacity: 0.04, sizeAttenuation: true, depthWrite: false, map: THREE.ImageUtils.loadTexture('assets/images/cloud.png'), transparent: true } );
             //        material.color.setHSL( 1.0, 1, 1);

             //        this.mesh = new THREE.PointCloud( geometry, material );
             //        this.mesh.sortParticles = true;
             //        this.add(this.mesh);

            var particles = 2000;
            var geometry = new THREE.BufferGeometry();
            var positions = new Float32Array( particles * 3 );
            var colors = new Float32Array( particles * 3 );
            var color = new THREE.Color();
            var n = 2500, n2 = n / 2; // particles spread in the cube

            for ( var i = 0; i < positions.length; i += 3 ) {

                    // positions

                    var x = Math.random() * n - n2;
                    var y = Math.random() * n/40 - n2*2;
                    var z = Math.random() * n - n2;

                    positions[ i ]     = x;
                    positions[ i + 1 ] = y;
                    positions[ i + 2 ] = z;

                    // colors

                    var vx = ( x / n ) + 0.5;
                    var vy = ( y / n ) + 0.5;
                    var vz = ( z / n ) + 0.5;

                    color.setRGB( vx, vy, vz );

                    colors[0]     = color.r;
                    colors[0] = color.g;
                    colors[0] = color.b;

                }
            geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

            geometry.computeBoundingSphere();
            this.geometry = geometry;
            var material = new THREE.PointCloudMaterial( {size: this.size*10, wireframe: false, opacity: 0.02, sizeAttenuation: true, depthWrite: false, map: THREE.ImageUtils.loadTexture('assets/images/cloud.png'), transparent: true } );
             //        material.color.setHSL( 1.0, 1, 1);
            var particleSystem = new THREE.PointCloud( geometry, material );
            this.system = particleSystem;
            this.mesh= particleSystem;
            this.add(particleSystem);

        }

    Cloud.prototype = new THREE.Object3D;
    Cloud.prototype.constructor = River;

    Cloud.prototype.update = function() {
         
           for(var i = 0; i < this.system.geometry.attributes.position.array.length;i+=3){
            this.system.geometry.attributes.position.array[i] += 1*Math.random();
            this.system.geometry.attributes.position.array[i+2] +=1*Math.random();
            //this.system.geometry.attributes.position.array[i+2] += 10;
            if( this.system.geometry.attributes.position.array[i] >= 1200 )  this.system.geometry.attributes.position.array[i] = -1200
            // if( this.system.geometry.attributes.position.array[i] <= -3000 )  this.system.geometry.attributes.position.array[i] = 0
             if( this.system.geometry.attributes.position.array[i+2] >= 1200 )  this.system.geometry.attributes.position.array[i+2] = -1200
            // if( this.system.geometry.attributes.position.array[i+2] <= -3000 )  this.system.geometry.attributes.position.array[i] = 0 
               // var vector = new THREE.Vector3();
               // vector.setFromMatrixPosition(this.mesh.matrixWorld).add();
               // mousePosWorld = intersects[0].point;

           // this.meshvertices[i].set(this.system.geometry.attributes.position.x+1,this.system.geometry.attributes.position[i].y, this.system.geometry.attributes.position[i].z+1);
        }
    this.system.geometry.verticesNeedUpdate = true;
    this.system.geometry.attributes.position.needsUpdate = true;

        
    };

    return Cloud;
})();