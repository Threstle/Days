var Moon = (function(){

    

    function Moon(){
        THREE.Object3D.call(this);
        var geometry = new THREE.SphereGeometry(200,200,5);
        moonTexture = new THREE.ImageUtils.loadTexture( 'assets/images/moonTexture.jpg' );
        moonTexture.wrapS =  moonTexture.wrapT = THREE.RepeatWrapping; 
        var material = new THREE.MeshLambertMaterial({ shininess:100, map:  moonTexture, color: 0xFFFFFF, wireframe: false, transparent : false, opacity : 1})
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = "Moon";
        this.add(this.mesh);
    }

    Moon.prototype = new THREE.Object3D;
    Moon.prototype.constructor = Sphere;

    Moon.prototype.update = function() {
     this.rotation.x += 0.005;
    };

    

    return Moon
})();