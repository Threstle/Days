var Sphere = (function(){

    function Sphere(){
        THREE.Object3D.call(this);

        var geometry = new THREE.SphereGeometry(10);

        var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: false, transparent : false, opacity : 1})
        material.overdraw = true;
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }

    Sphere.prototype = new THREE.Object3D;
    Sphere.prototype.constructor = Sphere;

    Sphere.prototype.update = function() {

        this.mesh.rotation.y += 0.01;
    };

    return Sphere;
})();