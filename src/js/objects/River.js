var River = (function(){

    function River(){
        THREE.Object3D.call(this);

         var geometry = new THREE.PlaneGeometry( 7500, 7500, 100, 100);


          var material = new THREE.MeshLambertMaterial({ color: 0x5F9F9F, wireframe: false, transparent : false, opacity : 1})

     
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }

    River.prototype = new THREE.Object3D;
    River.prototype.constructor = River;

    River.prototype.update = function() {

        this.mesh.rotation.y += 0.01;
    };

    return River;
})();