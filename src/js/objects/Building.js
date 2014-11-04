var Building = (function(){

    

    function Building(){
        var antenna;
        this.antennaBuilt;
        THREE.Object3D.call(this);
        var rand = Math.random();
        this.tailleMax = 10*rand;
        var geometry = new THREE.BoxGeometry(50*rand,50*rand,50*rand,50);

        var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: false, transparent : true, opacity : 0.9})
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = "Building";
        this.add(this.mesh);
    }

    Building.prototype = new THREE.Object3D;
    Building.prototype.constructor = Sphere;

    Building.prototype.update = function() {
        if(this.mesh.scale.y < this.tailleMax){
            this.mesh.scale.y += 0.1*Math.random();
            this.mesh.position.y+=0.1;
        }
        else{
            if(this.tailleMax > 5 && !this.antennaBuilt){
                 this.buildAntenna();
                 this.antennaBuilt = true;
            }
            if(this.antennaBuilt){
                antenna.update();
            }
        }
    };

    Building.prototype.buildAntenna = function(){
        antenna = new Antenna(this.mesh.position,this.tailleMax)
        this.mesh.add(antenna);
    }

    return Building
})();