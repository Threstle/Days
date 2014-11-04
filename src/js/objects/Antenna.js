var Antenna = (function(){

    function Antenna(pos,taille){
        THREE.Object3D.call(this);
        this.tailleMax = taille;
        if(this.tailleMax >=  1) tailleMax = 1;
        var geometry = new THREE.BoxGeometry(taille,taille,taille,50);

        var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: false, transparent : false, opacity : 1})

        this.mesh = new THREE.Mesh(geometry, material);

                this.mesh.position = new THREE.Vector3(pos.x,pos.y+taille*3,pos.z);
        this.add(this.mesh);
       
    }

    Antenna.prototype = new THREE.Object3D;
    Antenna.prototype.constructor = Antenna;

    Antenna.prototype.update = function() {
        if(this.mesh.scale.y < this.tailleMax){
            this.mesh.scale.y += 0.01;
        }
      
    };

    return Antenna
})();