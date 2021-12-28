<template>
  <div class="flying-carrot">
    <!-- <canvas
      width="1903"
      height="947"
      style="width: 1903px; height: 947px"
    ></canvas> -->
    <!-- <div id="container"></div> -->
    <div id="flying-carrot"></div>
  </div>
</template>

<script>
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);
import { Geometry } from "three/examples/jsm/deprecated/Geometry.js";
import "assets/js/tweenMax.min.js";
export default {
  name: "FlyingCarrot",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      internals: {
        width: 500,
        height: 500,
      },
    };
  },
  created() {
    this.isClass()
    console.log(new this.IsClass());
    this._createClass();
    // this.Cloud()
    // this.Carrot()
  },
  mounted() {
    // this.init();
    // this.animate();
    this.init1();
  },
  methods: {
    init1() {
      let _this = this;
      let internals = _this.internals;

      internals.randomIntFromInterval = _this.randomIntFromInterval;
      internals.shadowSupport = _this.shadowSupport;
      internals.resizeHandler = _this.resizeHandler;
      internals.render = _this.render;

      /**
       * 构造器
       * alpha：canvas是否包含透明度，默认为false
       * antialias：是否执行抗锯齿，默认为false
       */
      internals.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      /**
       * 透视相机 fov : Number, aspect : Number, near : Number, far : Number
       * fov — 摄像机视锥体垂直视野角度
       * aspect — 摄像机视锥体长宽比
       * near — 摄像机视锥体近端面
       * far — 摄像机视锥体远端面
       */
      internals.camera = new THREE.PerspectiveCamera(
        45,
        _this.internals.width / _this.internals.height,
        1,
        1000
      );

      // 场景
      internals.scene = new THREE.Scene();
      // 雾
      internals.scene.fog = new THREE.Fog(0xd5f8f8, 100, 300);

      // 设置材质
      internals.materials = {
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

      // 设置设备像素比
      internals.renderer.setPixelRatio(window.devicePixelRatio);
      // 设置颜色及其透明度
      internals.renderer.setClearColor(0xc5f5f5, 0.7);
      // 将输出canvas的大小调整为(width, height)并考虑设备像素比
      internals.renderer.setSize(_this.internals.width, _this.internals.height);
      internals.renderer.shadowMap.enabled = true;

      // 添加相机至场景
      internals.camera.position.set(40, 20, 100);
      internals.scene.add(internals.camera);

      // 控件
      internals.controls = new OrbitControls(
        internals.camera,
        internals.renderer.domElement
      );
      // 镜头移动范围，仅限透视镜头
      internals.controls.minDistance = 50;
      internals.controls.maxDistance = 250;

      // 平行光
      let directional = new THREE.DirectionalLight(0xffffff, 1);
      directional.position.set(30, 20, 0);
      directional.castShadow = true;
      internals.scene.add(new THREE.AmbientLight(0xc5f5f5, 1)); // 环境光
      internals.scene.add(directional);

      // 地板
      let floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1000, 1000), // 平面缓冲几何体
        new THREE.MeshBasicMaterial({
          color: 0xe0dacd,
        })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -100;
      internals.scene.add(floor);

      // 胡萝卜、云
      internals.scene.add(new this.Carrot().mesh);
      internals.scene.add(
        new Cloud({
          y: -5,
          z: 20,
        }).mesh
      );
      internals.scene.add(
        new Cloud({
          y: 0,
          z: 10,
          delay: 1,
        }).mesh
      );
      internals.scene.add(
        new Cloud({
          y: 15,
          z: -10,
          delay: 0.5,
        }).mesh
      );
      internals.scene.add(
        new Cloud({
          y: -15,
          z: 10,
          delay: 2,
        }).mesh
      );

      // 窗口大小变化事件
      window.addEventListener("resize", internals.resizeHandler, false);
      internals.resizeHandler();

      _this.internals = internals;

      TweenLite.ticker.addEventListener("tick", this.internals.render);
      console.log("internals", _this.internals);

      let container = document.getElementById("flying-carrot");
      container.appendChild(_this.internals.renderer.domElement);
    },

    // 区间随机整数
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // 阴影
    shadowSupport(group) {
      group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    },

    // 调整大小
    resizeHandler() {
      let width = window.innerWidth,
        height = window.innerHeight;
      this.internals.width = width;
      this.internals.height = height;

      this.internals.renderer.setSize(width, height);
      this.internals.camera.aspect = width / height;
      this.internals.camera.updateProjectionMatrix();
    },

    // 渲染
    render() {
      return this.internals.renderer.render(
        this.internals.scene,
        this.internals.camera
      );
    },

    isClass() {
      console.log("isClass", this);
    },

    IsClass() {
      console.log("isClass", this);
      function Carrot() {
        this._classCallCheck(this, Carrot);

        console.log("class Carrot");

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
      return Carrot
    },

    // 创建类
    _createClass() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      console.log("_createClass", this);
      return function (Constructor, protoProps, staticProps) {
        console.log("222", defineProperties);
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    },

    _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    },

    Cloud() {
      function Cloud(config) {
        _classCallCheck(this, Cloud);

        console.log("Cloud");

        this.mesh = new THREE.Group();

        let cloud = this._createCould();

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
            let _this = this;

            TweenMax.to(this.mesh.position, 3.5, {
              x: -200,
              repeat: Infinity,
              delay: config.delay || 0,
              onRepeat: function onRepeat() {
                _this.mesh.position.y = _this.internals.randomIntFromInterval(
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
            let group = new THREE.Group();

            let cloudGeo = new THREE.SphereGeometry(5, 4, 6);
            let cloud = new THREE.Mesh(
              cloudGeo,
              _this.internals.materials.clouds
            );
            cloud.scale.set(1, 0.8, 1);

            let cloud2 = cloud.clone();
            cloud2.scale.set(0.55, 0.35, 1);
            cloud2.position.set(5, -1.5, 2);

            let cloud3 = cloud.clone();
            cloud3.scale.set(0.75, 0.5, 1);
            cloud3.position.set(-5.5, -2, -1);

            group.add(cloud);
            group.add(cloud2);
            group.add(cloud3);

            _this.internals.shadowSupport(group);

            return group;
          },
        },
      ]);
      return Cloud;
    },

    Carrot() {
      console.log("Carrot", this);
      function Carrot() {
        this._classCallCheck(this, Carrot);

        console.log("class Carrot");

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
              new THREE.Mesh(bodyGeom, _this.internals.materials.orange)
            );

            _this.internals.shadowSupport(group);

            return group;
          },
        },
        {
          key: "_createWings",
          value: function _createWings() {
            console.log("??");

            var group = new THREE.Group();
            var geometry = new THREE.CubeGeometry(7, 7, 0.5);

            geometry.vertices[2].y += 2;
            geometry.vertices[3].y += 2;
            geometry.vertices[2].x -= 1;
            geometry.vertices[3].x -= 1;

            var wingR = new THREE.Mesh(
              geometry,
              _this.internals.materials.brown
            );
            wingR.position.x = 6;
            wingR.position.y = 2;
            wingR.position.z = 1;

            var wingL = wingR.clone();
            wingL.position.x = -6;
            wingL.rotation.y = Math.PI;

            group.add(wingR);
            group.add(wingL);

            _this.internals.shadowSupport(group);

            return group;
          },
        },
        {
          key: "_createLeafs",
          value: function _createLeafs() {
            console.log("??");

            var group = new THREE.Group();
            var geometry = new THREE.CylinderGeometry(1.5, 1, 5, 4);

            geometry.vertices[8].y += 0.5;

            var leafA = new THREE.Mesh(
              geometry,
              _this.internals.materials.green
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

            _this.internals.shadowSupport(group);

            return group;
          },
        },
      ]);
      return Carrot;
    },

    init() {
      let container = document.getElementById("container");

      // 创建一个相机 参数：fov、aspect、near、far
      this.camera = new THREE.PerspectiveCamera(30, 1, 0.01, 1000);
      // 相机离屏幕的距离
      this.camera.position.z = 1;
      // 创建场景
      this.scene = new THREE.Scene();
      // 创建一个立方体 参数 width、height、depth
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      // 立方体的材质 参数为obj
      let material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
      // 将立方体和材质包添加到网格
      this.mesh = new THREE.Mesh(geometry, material);
      // 将网格添加到场景中
      this.scene.add(this.mesh);
      // 渲染器 参数为obj antialias：true 开启抗锯齿（默认为false）
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor(0xb9d3ff, 1);
      // 设置渲染大小
      this.renderer.setSize(500, 500);
      this.renderer.render(this.scene, this.camera);
      container.appendChild(this.renderer.domElement);
      new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped lang="scss">
#container {
  width: 90vw;
  height: 100vh;
}
</style>
