<template>
  <div class="flying-carrot">
    <canvas
      width="1903"
      height="947"
      style="width: 1903px; height: 947px"
    ></canvas>
  </div>
</template>

<script>
// import "assets/js/orbitControls";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {Geometry} from 'three/examples/jsm/deprecated/Geometry.js';
import {TweenMax, TweenLite} from 'gsap'
// import "assets/js/tweenMax.min";
export default {
  name: "FlyingCarrot",
  data() {
    return {
      internals: {},
    };
  },
  created() {
    
  },
  mounted() {
    this.internals.width = 500;
    this.internals.height = 500;

    this.internals.randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    this.internals.materials = {
      orange: new THREE.MeshPhongMaterial({
        color: 0xb7513c,
        flatShading: true,
      }),
      green: new THREE.MeshPhongMaterial({
        color: 0x379351,
        flatShading: true,
      }),
      brown: new THREE.MeshPhongMaterial({
        color: 0x5c2c22,
        flatShading: true,
      }),
      pink: new THREE.MeshPhongMaterial({
        color: 0xb1325e,
        flatShading: true,
      }),
      gray: new THREE.MeshPhongMaterial({
        color: 0x666666,
        flatShading: true,
      }),
      clouds: new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        flatShading: true,
      }),
      rabbit: new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        flatShading: true,
      }),
    };

    this.internals.shadowSupport = function (group) {
      group.traverse(function (object) {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    };

    this.internals.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.internals.camera = new THREE.PerspectiveCamera(
      45,
      this.internals.width / this.internals.height,
      1,
      1000
    );
    this.internals.scene = new THREE.Scene();
    this.internals.scene.fog = new THREE.Fog(0xd5f8f8, 100, 300);

    // setup renderer
    this.internals.renderer.setPixelRatio(window.devicePixelRatio);
    this.internals.renderer.setClearColor(0xc5f5f5, 0.7);
    this.internals.renderer.setSize(this.internals.width, this.internals.height);
    this.internals.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.internals.renderer.domElement);

    // setup camera
    this.internals.camera.position.set(40, 20, 100);
    this.internals.scene.add(this.internals.camera);

    // controls
    this.internals.controls = new OrbitControls(
      this.internals.camera,
      this.internals.renderer.domElement
    );
    this.internals.controls.minDistance = 50;
    this.internals.controls.maxDistance = 250;

    this.setupLights();

    this.internals.resizeHandler = () => {
      let width = window.innerWidth,
        height = window.innerHeight;
      this.internals.width = width;
      this.internals.height = height;

      this.internals.renderer.setSize(width, height);
      this.internals.camera.aspect = width / height;
      this.internals.camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", this.internals.resizeHandler, false);
    this.internals.resizeHandler();
    this.internals.render = () => {
      return this.internals.renderer.render(
        this.internals.scene,
        this.internals.camera
      );
    };
    console.log("111", TweenLite.ticker);
    TweenLite.ticker.addEventListener("tick", this.internals.render);
  },
  methods: {
    _createClass() {
      function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
          let descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }
    },

    _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    },

    Cloud() {
      function Cloud(config) {
        _classCallCheck(this, Cloud);

        this.mesh = new THREE.Group();

        var cloud = this._createCould();

        this.mesh.position.x = 200;
        this.mesh.position.y = config.y || Math.random();
        this.mesh.position.z = config.z || 0;

        this.mesh.add(cloud);

        this.animate(config);
      }
      this._createClass(Cloud, [
        {
          key: "animate",
          value: function animate(config) {
            var _this = this;

            TweenMax.to(this.mesh.position, 3.5, {
              x: -200,
              repeat: Infinity,
              delay: config.delay || 0,
              onRepeat: function onRepeat() {
                _this.mesh.position.y = this.internals.randomIntFromInterval(
                  -10,
                  20
                );
              },
            });
          },
        },
        {
          key: "_createCould",
          value: function _createCould() {
            var group = new THREE.Group();

            var cloudGeo = new THREE.SphereGeometry(5, 4, 6);
            var cloud = new THREE.Mesh(
              cloudGeo,
              this.internals.materials.clouds
            );
            cloud.scale.set(1, 0.8, 1);

            var cloud2 = cloud.clone();
            cloud2.scale.set(0.55, 0.35, 1);
            cloud2.position.set(5, -1.5, 2);

            var cloud3 = cloud.clone();
            cloud3.scale.set(0.75, 0.5, 1);
            cloud3.position.set(-5.5, -2, -1);

            group.add(cloud);
            group.add(cloud2);
            group.add(cloud3);

            this.internals.shadowSupport(group);

            return group;
          },
        },
      ]);
      return Cloud;
    },

    Carrot() {
      function Carrot() {
        _classCallCheck(this, Carrot);

        this.mesh = new THREE.Group();

        this.body = this._createBody();
        this.wings = this._createWings();
        this.leafs = this._createLeafs();
        this.pilot = new Pilot();

        this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);

        this.mesh.add(this.body);
        this.mesh.add(this.wings);
        this.mesh.add(this.leafs);
        this.mesh.add(this.pilot.mesh);

        this.animate();
      }
      this._createClass(Carrot, [
        {
          key: "animate",
          value: function animate() {
            TweenMax.to(this.mesh.position, 1, {
              x: -2,
              y: 4,
              repeat: Infinity,
              yoyo: true,
              ease: Sine.easeInOut,
            });

            TweenMax.to(this.mesh.rotation, 1, {
              x: -1.7,
              repeat: Infinity,
              yoyo: true,
              ease: Sine.easeInOut,
            });

            TweenMax.to(this.leafs.rotation, 0.1, {
              y: Math.PI,
              repeat: Infinity,
              ease: Power0.easeNone,
            });
          },
        },
        {
          key: "_createBody",
          value: function _createBody() {
            var group = new THREE.Group();

            var bodyGeom = new THREE.CylinderGeometry(5, 2, 25);
            bodyGeom.vertices[16].y += 3;
            bodyGeom.vertices[17].y -= 2;

            group.add(
              new THREE.Mesh(bodyGeom, this.internals.materials.orange)
            );

            this.internals.shadowSupport(group);

            return group;
          },
        },
        {
          key: "_createWings",
          value: function _createWings() {
            var group = new THREE.Group();
            var geometry = new Geometry(7, 7, 0.5);

            geometry.vertices[2].y += 2;
            geometry.vertices[3].y += 2;
            geometry.vertices[2].x -= 1;
            geometry.vertices[3].x -= 1;

            var wingR = new THREE.Mesh(
              geometry,
              this.internals.materials.brown
            );
            wingR.position.x = 6;
            wingR.position.y = 2;
            wingR.position.z = 1;

            var wingL = wingR.clone();
            wingL.position.x = -6;
            wingL.rotation.y = Math.PI;

            group.add(wingR);
            group.add(wingL);

            this.internals.shadowSupport(group);

            return group;
          },
        },
        {
          key: "_createLeafs",
          value: function _createLeafs() {
            var group = new THREE.Group();
            var geometry = new THREE.CylinderGeometry(1.5, 1, 5, 4);

            geometry.vertices[8].y += 0.5;

            var leafA = new THREE.Mesh(
              geometry,
              this.internals.materials.green
            );
            leafA.position.y = 16;

            var leafB = leafA.clone();
            leafB.position.x = -1.75;
            leafB.position.y = 15;
            leafB.rotation.z = 0.4;

            var leafC = leafB.clone();
            leafC.position.x = leafB.position.x * -1;
            leafC.rotation.z = leafB.rotation.z * -1;

            group.add(leafA);
            group.add(leafB);
            group.add(leafC);

            this.internals.shadowSupport(group);

            return group;
          },
        },
      ]);
      return Carrot;
    },

    Pilot() {
      function Pilot() {
        _classCallCheck(this, Pilot);

        this.mesh = new THREE.Group();

        this.pilot = this._createPilot();

        this.mesh.rotation.x = 1.5;
        this.mesh.position.set(0, 7, 5);

        this.mesh.add(this.pilot);

        this.animate();
      }
      this._createClass(Pilot, [
        {
          key: "animate",
          value: function animate() {
            TweenMax.to(this.earPivotL.rotation, 0.1, {
              x: Math.sin(-Math.PI / 3),
              repeat: Infinity,
              yoyo: true,
            });

            TweenMax.to(this.earPivotR.rotation, 0.1, {
              x: -Math.PI / 2.25,
              repeat: Infinity,
              yoyo: true,
            });

            TweenMax.to(this.eye.scale, 0.5, {
              y: 0.1,
              repeat: Infinity,
              yoyo: true,
              delay: 5,
              repeatDelay: 3,
            });

            TweenMax.to(this.eyeb.scale, 0.5, {
              y: 0.1,
              repeat: Infinity,
              yoyo: true,
              delay: 5,
              repeatDelay: 3,
            });
          },
        },
        {
          key: "_createPilot",
          value: function _createPilot() {
            var group = new THREE.Group();

            var bodyGeo = new Geometry(5, 5, 5);
            bodyGeo.vertices[3].y += 0.5;
            bodyGeo.vertices[6].y += 0.5;

            var body = new THREE.Mesh(bodyGeo, this.internals.materials.rabbit);
            body.position.y = 1;
            body.position.z = 4;

            var seatGeo = new Geometry(6, 1, 6);
            var seat = new THREE.Mesh(seatGeo, this.internals.materials.brown);
            seat.position.set(0, -2.5, 0);
            seat.rotation.set(0.25, 0, 0);
            body.add(seat);

            this.earPivotL = new THREE.Object3D();
            this.earPivotL.applyMatrix(
              new THREE.Matrix4().makeTranslation(0, 2.5, 0)
            );
            this.earPivotL.rotation.x = -Math.PI / 2.25;

            this.earPivotR = this.earPivotL.clone();
            this.earPivotR.rotation.x = -Math.PI / 3;

            var earGeo = new Geometry(2, 6, 0.5);
            earGeo.vertices[2].x -= 0.5;
            earGeo.vertices[3].x -= 0.5;
            earGeo.vertices[6].x += 0.5;
            earGeo.vertices[7].x += 0.5;

            var ear = new THREE.Mesh(earGeo, this.internals.materials.rabbit);
            ear.position.x = -1.5;
            ear.position.y = 2.5;

            var earInside = new THREE.Mesh(
              earGeo,
              this.internals.materials.pink
            );
            earInside.scale.set(0.5, 0.7, 0.5);
            earInside.position.set(0, 0, 0.25);
            ear.add(earInside);

            this.earPivotL.add(ear);
            body.add(this.earPivotL);

            var ear2 = ear.clone();
            ear2.position.x = ear.position.x * -1;
            this.earPivotR.add(ear2);
            body.add(this.earPivotR);

            var eyeGeo = new Geometry(0.5, 1, 0.5);
            var eye = new THREE.Mesh(eyeGeo, this.internals.materials.gray);
            eye.position.set(1, 0.5, 2.5);
            body.add(eye);
            this.eye = eye;

            var eyeb = eye.clone();
            eyeb.position.x = eye.position.x * -1;
            this.eyeb = eyeb;
            body.add(eyeb);

            var noseGeo = new Geometry(0.5, 0.5, 0.5);
            noseGeo.vertices[2].x = 0;
            noseGeo.vertices[3].x = 0;
            noseGeo.vertices[6].x = 0;
            noseGeo.vertices[7].x = 0;
            var nose = new THREE.Mesh(noseGeo, this.internals.materials.pink);
            nose.position.set(0, -0.5, 2.5);
            body.add(nose);

            var mouthGeo = new Geometry(0.25, 0.25, 0.5);
            var mouth = new THREE.Mesh(mouthGeo, this.internals.materials.gray);
            mouth.position.set(0, -1.5, 2.5);
            body.add(mouth);

            group.add(body);

            this.internals.shadowSupport(group);

            return group;
          },
        },
      ]);
      return Pilot;
    },

    setupLights() {
      let directional = new THREE.DirectionalLight(0xffffff, 1);
      directional.position.set(30, 20, 0);
      directional.castShadow = true;

      this.internals.scene.add(new THREE.AmbientLight(0xc5f5f5, 1));
      this.internals.scene.add(directional);
    },

    createFloor() {
      var floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0xe0dacd,
        })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -100;

      this.internals.scene.add(floor);
    },

    addElements() {
      this.internals.scene.add(new Carrot().mesh);
      this.internals.scene.add(
        new Cloud({
          y: -5,
          z: 20,
        }).mesh
      );
      this.internals.scene.add(
        new Cloud({
          y: 0,
          z: 10,
          delay: 1,
        }).mesh
      );
      this.internals.scene.add(
        new Cloud({
          y: 15,
          z: -10,
          delay: 0.5,
        }).mesh
      );
      this.internals.scene.add(
        new Cloud({
          y: -15,
          z: 10,
          delay: 2,
        }).mesh
      );
    },
  },
};
</script>

<style scoped lang="scss">
</style>
