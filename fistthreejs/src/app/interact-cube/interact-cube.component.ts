import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
@Component({
  selector: 'app-interact-cube',
  templateUrl: './interact-cube.component.html',
  styleUrls: ['./interact-cube.component.scss']
})
export class InteractCubeComponent implements AfterViewInit {
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;
  texturesCache: THREE.MeshLambertMaterial;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas', { static: false })
  private canvasRef: ElementRef;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;

  private cubeHeight = 50;


  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 400;


  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() { }

  /* STAGING, ANIMATION, AND RENDERING */
  controls: any;
  /* CURSEUR */
  rollOverMesh;
  rollOverMaterial;
  /* intersection */
  plane;
  mouse = new THREE.Vector2();
  raycaster;
  objects = [];
  cubeGeo;
  cubeMaterial;
  decalage:any;

  /* MODE DE L'ecran */
  mode= 'edition';
  /**
   * Create the scene
   */
  private createScene() {
    
    /* Scene */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 1, 10000);
    this.camera.position.set(500, 800, 1300);
    this.camera.lookAt(0, 0, 0);

    var gridHelper = new THREE.GridHelper(2000, 40);
    this.scene.add(gridHelper);
    this.camera.position.z = this.cameraZ;
//    this.controls = new MapControls(this.camera);
//    this.controls.rotateSpeed = 1.0;
//    this.controls.zoomSpeed = 1.2;
    /* Curseur */
    var rollOverGeo = new THREE.BoxBufferGeometry(50, this.cubeHeight, 50);
    this.rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    this.rollOverMesh = new THREE.Mesh(rollOverGeo, this.rollOverMaterial);
    this.scene.add(this.rollOverMesh);

    // cubes
    this.cubeGeo = new THREE.BoxBufferGeometry(50, 10, 50);
    var ambientLight = new THREE.AmbientLight( 0x606060 );
    this.scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    this.scene.add( directionalLight );


    /* Intercepteur de rayon*/
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
    geometry.rotateX(- Math.PI / 2);
    this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    this.scene.add(this.plane);
    this.objects.push(this.plane);
    // calculd décalage
    this.decalage = (window.innerWidth - this.canvas.clientWidth);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    let component: InteractCubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
    
      component.renderer.render(component.scene, component.camera);
    }());
  }
  /* EVENTS */

  /**
   * Update scene after resizing. 
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    const getTextures = ()=> new Promise((resolve, reject)=>{
      const loader = new THREE.TextureLoader();
      THREE.DefaultLoadingManager.onLoad = ()=>resolve(textures);
      const textures = [
        "../assets/textures/grass_dirt.png"
       
      ].map(filename=>loader.load(filename));
    });
    getTextures().then(result=> {
      let params:any;
      params = {};
      params.map = result[0];
      this.cubeMaterial =  new THREE.MeshLambertMaterial(params);;
      this.createScene();
      this.startRenderingLoop();
    });
    /* Chargement des textures */
    this.loadMaterial().then(elements => {
      this.texturesCache = elements;
     
    });
  }
  @HostListener('mousemove', ['$event'])
  onDocumentMouseMove(event) {
    event.preventDefault();
    // 80 vient de barre de navigation d'une hauteur de 80px
    if (this.mode === 'edition') {
      this.mouse.set(((event.clientX - this.decalage) / this.canvas.clientWidth) * 2 - 1, - ((event.clientY - 80) / this.canvas.clientHeight) * 2 + 1);
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        var intersect = intersects[0];
        this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
      }
      this.render();
    }
  }
  @HostListener('mousedown', ['$event'])
  onDocumentMouseDown(event) {
    event.preventDefault();
    if (this.mode === 'edition') {
      this.mouse.set(((event.clientX - this.decalage) / this.canvas.clientWidth) * 2 - 1, - ((event.clientY - 80) / this.canvas.clientHeight) * 2 + 1);
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        var intersect = intersects[0];
        console.log(this.cubeMaterial + '-');
        var voxel = new THREE.Mesh(this.cubeGeo, this.cubeMaterial);
        voxel.position.copy(intersect.point).add(intersect.face.normal);
        voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        this.scene.add(voxel);
        this.objects.push(voxel);

        this.render();
      }
    }
  }
  render() {
    let component: InteractCubeComponent = this;
    component.renderer.render(component.scene, component.camera);
  }
  /*
  * CHARGEMENT DES TEXTURES
  */
  loadTexture(url): Promise<any> {
    return new Promise(resolve => {
      new THREE.TextureLoader().load(url, resolve);
    });


  }
  loadMaterial() {
    const textures = {
      map: '../assets/textures/square-outline-textured.png'
    };

    let params: any;
    params = {};
    const promises = Object.keys(textures).map(key => {
      return this.loadTexture(textures[key]).then(texture => {
        params[key] = texture;
      });
    });
    return Promise.all(promises).then(() => {
      return new THREE.MeshLambertMaterial(params);
    });
  }

  changeMode(newMode:string) {
    var prevCamera = this.camera;
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 1, 10000);
    var vector = new THREE.Vector3( 0, 0, - 1 );
    var dirVector = vector.applyQuaternion( prevCamera.quaternion );
   console.log('position' + prevCamera.position);
    this.camera.position.copy( prevCamera.position );
    this.camera.rotation.copy( prevCamera.rotation );
  
    this.mode = newMode;
    if (this.mode==='edition') {
    }
    if (this.mode==='orbit') {
      this.controls = new OrbitControls(this.camera);
      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
    
    }
    if (this.mode==='map') {
      this.controls = new MapControls(this.camera);
      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
    }
    console.log('position' + this.camera.position.x);
  }
}

