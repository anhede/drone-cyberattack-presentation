// js/three-scene-manager.js
;(function(){
    let active = null;
  
    // —– Scene factories —– each returns a context { scene, camera, renderer, mesh }
    const scenes = {
      cube: container => {
        const scene    = new THREE.Scene();
        const camera   = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, .1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 2;
  
        const geo  = new THREE.BoxGeometry();
        const mat  = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
  
        return { scene, camera, renderer, mesh };
      },
  
      sphere: container => {
        const scene    = new THREE.Scene();
        const camera   = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, .1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 2;
  
        const geo  = new THREE.SphereGeometry(0.75, 32, 16);
        const mat  = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
  
        return { scene, camera, renderer, mesh };
      },
  
      torus: container => {
        const scene    = new THREE.Scene();
        const camera   = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, .1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 3;
  
        const geo  = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
        const mat  = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
  
        return { scene, camera, renderer, mesh };
      }
    };
  
    // —– Animation loop —–
    function animate() {
      if (!active) return;
      requestAnimationFrame(animate);
      active.mesh.rotation.x += 0.01;
      active.mesh.rotation.y += 0.01;
      active.renderer.render(active.scene, active.camera);
    }
  
    // —– Init one scene —–
    function initScene(type, container) {
      if (active) return;               // already animating
      if (!scenes[type]) return;        // no such scene
      active = scenes[type](container); // build scene
      animate();                        // kick off loop
    }
  
    // —– Tear-down —–
    function disposeScene() {
      if (!active) return;
      active.renderer.dispose();
      active.renderer.domElement.remove();
      active = null;
    }
  
    // —– Reveal.js hooks —–
    Reveal.on('slidechanged', e => {
      const ctr = e.currentSlide.querySelector('.three-container');
      if (ctr) initScene(ctr.dataset.scene, ctr);
      else    disposeScene();
    });
  
    // If you deep-link straight to a scene slide:
    Reveal.on('ready', e => {
      const ctr = e.currentSlide.querySelector('.three-container');
      if (ctr) initScene(ctr.dataset.scene, ctr);
    });
  
  })();
  