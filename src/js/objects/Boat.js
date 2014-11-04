var Boat = (function(){


    function Boat(){
        this.angle = 0;
        THREE.Object3D.call(this);
        this.caster = new THREE.Raycaster();
         var geometry = new THREE.BoxGeometry( 20, 20, 40);


          var material = new THREE.MeshLambertMaterial({ color: 0x5F9F9F, wireframe: false, transparent : false, opacity : 1})

     
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }

    Boat.prototype = new THREE.Object3D;
    Boat.prototype.constructor = River;

    Boat.prototype.update = function() {
        // this.caster.set(this.mesh.position, new THREE.Vector3(0,0,1));
        // collisions = this.caster.intersectObjects([webgl.sol.mesh]);
        // if (collisions.length > 0 && collisions[0].distance <= 50) {
        //     var axis = new THREE.Vector3( 0, 0, 1 );
        //     this.angle +=Math.PI / 2;
        //     var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
        //     this.mesh.rotation.applyMatrix4( matrix );
        // }
        // else{
        //     this.mesh.translateZ(1);
        // }
        
    };

    return Boat;
})();