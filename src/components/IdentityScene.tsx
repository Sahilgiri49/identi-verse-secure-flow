
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { toast } from '@/components/ui/use-toast';

interface IdentitySceneProps {
  isVerifying?: boolean;
  isComplete?: boolean;
}

const IdentityScene: React.FC<IdentitySceneProps> = ({
  isVerifying = false,
  isComplete = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a192f);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    // Create Identity Symbol
    const identityGroup = new THREE.Group();
    modelRef.current = identityGroup;
    scene.add(identityGroup);

    // Outer ring
    const outerRingGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
    const outerRingMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    identityGroup.add(outerRing);

    // Inner ring
    const innerRingGeometry = new THREE.TorusGeometry(1.1, 0.05, 16, 80);
    const innerRingMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRing.rotation.x = Math.PI / 4;
    identityGroup.add(innerRing);

    // Data nodes
    const nodeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5
    });

    const createNodes = () => {
      // Clear existing nodes
      identityGroup.children.forEach(child => {
        if (child.userData.isNode) {
          identityGroup.remove(child);
        }
      });

      // Add 12 nodes evenly spaced
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.3;

        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        );
        node.userData = { isNode: true };
        identityGroup.add(node);
      }

      // Add interconnecting lines
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x06b6d4, 
        transparent: true, 
        opacity: 0.4 
      });
      
      const createLine = (startIndex: number, endIndex: number) => {
        const startNode = identityGroup.children.find(
          child => child.userData.isNode && child.uuid.endsWith(startIndex.toString())
        );
        const endNode = identityGroup.children.find(
          child => child.userData.isNode && child.uuid.endsWith(endIndex.toString())
        );
        
        if (startNode && endNode) {
          const points = [];
          points.push(new THREE.Vector3().copy(startNode.position));
          points.push(new THREE.Vector3().copy(endNode.position));
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          line.userData = { isNode: true };
          identityGroup.add(line);
        }
      };
      
      // Connect some nodes to form a secure network pattern
      for (let i = 0; i < 12; i++) {
        createLine(i, (i + 3) % 12);
        createLine(i, (i + 5) % 12);
      }
    };

    createNodes();

    // Center sphere (identity core)
    const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.7
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    identityGroup.add(core);

    // Identity silhouette
    const silhouetteGeometry = new THREE.CircleGeometry(0.3, 32);
    const silhouetteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    const silhouette = new THREE.Mesh(silhouetteGeometry, silhouetteMaterial);
    silhouette.position.z = 0.51;
    identityGroup.add(silhouette);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Animation
    const animate = () => {
      if (!modelRef.current) return;

      identityGroup.rotation.y += 0.003;
      innerRing.rotation.x += 0.005;
      innerRing.rotation.z += 0.003;
      outerRing.rotation.x += 0.001;
      outerRing.rotation.z += 0.002;

      // Pulse effect
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time * 2) * 0.05 + 1;
      
      if (isVerifying) {
        // Faster rotation during verification
        identityGroup.rotation.y += 0.01;
        
        // Scanning effect
        const scanHeight = (Math.sin(time * 5) + 1) / 2;
        core.scale.set(pulse, pulse, pulse);
        
        // Change colors during verification
        (pointLight as THREE.PointLight).color.setHex(0x06b6d4);
        (coreMaterial as THREE.MeshPhongMaterial).color.setHex(0x06b6d4);
        (coreMaterial as THREE.MeshPhongMaterial).emissive.setHex(0x06b6d4);
        (coreMaterial as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
      } else if (isComplete) {
        // Completion state
        (pointLight as THREE.PointLight).color.setHex(0x22c55e);
        (coreMaterial as THREE.MeshPhongMaterial).color.setHex(0x22c55e);
        (coreMaterial as THREE.MeshPhongMaterial).emissive.setHex(0x22c55e);
        (coreMaterial as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
        core.scale.set(pulse, pulse, pulse);
      } else {
        // Default state
        (pointLight as THREE.PointLight).color.setHex(0x8b5cf6);
        (coreMaterial as THREE.MeshPhongMaterial).color.setHex(0x8b5cf6);
        (coreMaterial as THREE.MeshPhongMaterial).emissive.setHex(0x8b5cf6);
        (coreMaterial as THREE.MeshPhongMaterial).emissiveIntensity = 0.2;
        core.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Add event listener for click interactions
    const handleMouseClick = () => {
      if (isVerifying) {
        toast({
          title: "Verification in progress",
          description: "Securely validating your identity with blockchain...",
        });
      } else if (isComplete) {
        toast({
          title: "Identity Verified",
          description: "Your identity has been securely verified and cryptographically stored.",
          variant: "default",
        });
      } else {
        toast({
          title: "Identity Ready",
          description: "Click 'Verify Identity' to begin the secure verification process.",
        });
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('click', handleMouseClick);

    // Cleanup
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (domElement) {
        domElement.removeEventListener('click', handleMouseClick);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Clean up Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isVerifying, isComplete]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default IdentityScene;
