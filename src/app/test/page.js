"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const RotaryValve3D = () => {
  const mountRef = useRef(null);
  const labelsRef = useRef([]);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.3 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    labelsRef.current.forEach(label => {
      if (label) label.visible = showLabels;
    });
  }, [showLabels]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 場景設置
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8f4f8);

    // 相機設置
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 5, 12);
    camera.lookAt(0, 0, 0);

    // 渲染器設置
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // 燈光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 創建主容器
    const furnaceGroup = new THREE.Group();

    // 爐體主體 - 扁平風格
    const furnaceGeometry = new THREE.BoxGeometry(7, 5, 2.5);
    const furnaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b87d4,
      flatShading: true,
      metalness: 0.1,
      roughness: 0.8
    });
    const furnace = new THREE.Mesh(furnaceGeometry, furnaceMaterial);
    furnace.castShadow = true;
    furnaceGroup.add(furnace);

    // 添加爐體窗口裝飾
    for (let i = 0; i < 4; i++) {
      const windowGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x5a7fa8,
        flatShading: true
      });
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(-2.5 + i * 1.5, 0, 1.3);
      furnaceGroup.add(window1);
    }

    // 創建扁平風格旋轉閥
    const createRotaryValve = (color, label) => {
      const valveGroup = new THREE.Group();

      // 閥體 - 更扁平的風格
      const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16);
      const cylinderMaterial = new THREE.MeshStandardMaterial({
        color: color,
        flatShading: true,
        metalness: 0.3,
        roughness: 0.7
      });
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinder.castShadow = true;
      valveGroup.add(cylinder);

      // 旋轉葉片
      const bladeGeometry = new THREE.BoxGeometry(0.6, 0.08, 0.15);
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c3e50,
        flatShading: true
      });

      for (let i = 0; i < 4; i++) {
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.rotation.y = (Math.PI / 2) * i;
        blade.castShadow = true;
        valveGroup.add(blade);
      }

      // 連接管道
      const pipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
      const pipeMaterial = new THREE.MeshStandardMaterial({
        color: 0x546e7a,
        flatShading: true
      });
      const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
      pipe.position.y = 0.9;
      pipe.castShadow = true;
      valveGroup.add(pipe);

      return valveGroup;
    };

    // 創建清晰的溫度標籤
    const createTempLabel = (text, temp) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 256;

      // 背景
      context.fillStyle = 'rgba(255, 255, 255, 0.95)';
      context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 20);
      context.fill();

      // 邊框
      context.strokeStyle = '#2196f3';
      context.lineWidth = 6;
      context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 20);
      context.stroke();

      // 文字 - 更大更清晰
      context.font = 'Bold 56px Arial';
      context.fillStyle = '#1976d2';
      context.textAlign = 'center';
      context.fillText(text, 256, 100);

      context.font = 'Bold 72px Arial';
      context.fillStyle = '#d32f2f';
      context.fillText(`${temp}°C`, 256, 190);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.5, 0.75, 1);

      return sprite;
    };

    // 創建溫度探頭
    const createTempProbe = () => {
      const probeGroup = new THREE.Group();

      const probeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
      const probeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5252,
        flatShading: true
      });
      const probe = new THREE.Mesh(probeGeometry, probeMaterial);
      probe.rotation.z = Math.PI / 2;
      probeGroup.add(probe);

      // 探頭頭部
      const tipGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      const tip = new THREE.Mesh(tipGeometry, probeMaterial);
      tip.position.x = 0.25;
      probeGroup.add(tip);

      return probeGroup;
    };

    // 添加頂部旋轉閥
    const valve79012A = createRotaryValve(0x5c6bc0, 'RV-79012A');
    valve79012A.position.set(-2.2, 3.2, 0);
    furnaceGroup.add(valve79012A);

    const valve79012B = createRotaryValve(0x5c6bc0, 'RV-79012B');
    valve79012B.position.set(2.2, 3.2, 0);
    furnaceGroup.add(valve79012B);

    // 添加底部旋轉閥
    const valve79011A = createRotaryValve(0x42a5f5, 'RV-79011A');
    valve79011A.position.set(-2.2, -3.2, 0);
    valve79011A.rotation.x = Math.PI;
    furnaceGroup.add(valve79011A);

    const valve79011B = createRotaryValve(0x42a5f5, 'RV-79011B');
    valve79011B.position.set(0, -3.2, 0);
    valve79011B.rotation.x = Math.PI;
    furnaceGroup.add(valve79011B);

    const valve79011C = createRotaryValve(0x42a5f5, 'RV-79011C');
    valve79011C.position.set(2.2, -3.2, 0);
    valve79011C.rotation.x = Math.PI;
    furnaceGroup.add(valve79011C);

    // 添加溫度探頭（上層）
    const tempDataUpper = [
      { name: 'TE-152A', temp: 850, x: -3, y: 1.3, z: 1.5 },
      { name: 'TE-152B', temp: 865, x: -1.8, y: 1.3, z: 1.5 },
      { name: 'TE-152C', temp: 880, x: -0.6, y: 1.3, z: 1.5 },
      { name: 'TE-152D', temp: 875, x: 0.6, y: 1.3, z: 1.5 },
      { name: 'TE-152E', temp: 870, x: 1.8, y: 1.3, z: 1.5 },
      { name: 'TE-152F', temp: 860, x: 3, y: 1.3, z: 1.5 }
    ];

    tempDataUpper.forEach(data => {
      const probe = createTempProbe();
      probe.position.set(data.x, data.y, data.z);
      const label = createTempLabel(data.name, data.temp);
      label.position.set(0, 0, 0.8);
      probe.add(label);
      labelsRef.current.push(label);
      furnaceGroup.add(probe);
    });

    // 添加溫度探頭（下層）
    const tempDataLower = [
      { name: 'TE-151A', temp: 780, x: -3, y: -0.3, z: 1.5 },
      { name: 'TE-151B', temp: 795, x: -1.8, y: -0.3, z: 1.5 },
      { name: 'TE-151C', temp: 810, x: -0.6, y: -0.3, z: 1.5 },
      { name: 'TE-151D', temp: 805, x: 0.6, y: -0.3, z: 1.5 },
      { name: 'TE-151E', temp: 800, x: 1.8, y: -0.3, z: 1.5 },
      { name: 'TE-151F', temp: 790, x: 3, y: -0.3, z: 1.5 }
    ];

    tempDataLower.forEach(data => {
      const probe = createTempProbe();
      probe.position.set(data.x, data.y, data.z);
      const label = createTempLabel(data.name, data.temp);
      label.position.set(0, 0, 0.8);
      probe.add(label);
      labelsRef.current.push(label);
      furnaceGroup.add(probe);
    });

    // 添加頂部溫度探頭
    const tempDataTop = [
      { name: 'TE-152I', temp: 820, x: -2.2, y: 2.5, z: 0 },
      { name: 'TE-152H', temp: 835, x: 0, y: 2.5, z: 0 },
      { name: 'TE-152G', temp: 825, x: 2.2, y: 2.5, z: 0 }
    ];

    tempDataTop.forEach(data => {
      const probe = createTempProbe();
      probe.position.set(data.x, data.y, data.z);
      probe.rotation.z = 0;
      const label = createTempLabel(data.name, data.temp);
      label.position.set(0, 0.8, 0);
      probe.add(label);
      labelsRef.current.push(label);
      furnaceGroup.add(probe);
    });

    scene.add(furnaceGroup);

    // 添加地面
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xb0bec5,
      flatShading: true
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4;
    ground.receiveShadow = true;
    scene.add(ground);

    // 動畫循環
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 旋轉閥動畫
      [valve79012A, valve79012B].forEach(valve => {
        valve.children.forEach((child, i) => {
          if (i > 0 && i <= 4) {
            child.rotation.y += 0.02;
          }
        });
      });

      [valve79011A, valve79011B, valve79011C].forEach(valve => {
        valve.children.forEach((child, i) => {
          if (i > 0 && i <= 4) {
            child.rotation.y -= 0.015;
          }
        });
      });

      // 應用旋轉
      furnaceGroup.rotation.x = rotation.x;
      furnaceGroup.rotation.y = rotation.y;

      renderer.render(scene, camera);
    };
    animate();

    // 清理
    return () => {
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      labelsRef.current = [];
    };
  }, [rotation]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;

    setRotation(prev => ({
      x: Math.max(-Math.PI/2, Math.min(Math.PI/2, prev.x + deltaY * 0.01)),
      y: prev.y + deltaX * 0.01
    }));

    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0.2, y: 0.3 });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">旋轉閥系統 3D 可視化</h1>
        <p className="text-sm mt-2 opacity-90">扁平化設計風格 | 拖動滑鼠旋轉視角</p>
      </div>

      <div
        ref={mountRef}
        className="flex-1 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div className="bg-white p-6 shadow-2xl border-t-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-semibold"
            >
              {showLabels ? '隱藏溫度' : '顯示溫度'}
            </button>
            <button
              onClick={resetView}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-md font-semibold"
            >
              重置視角
            </button>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            🖱️ 拖動旋轉 | 溫度單位：°C
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
            <div className="w-6 h-6 bg-indigo-500 rounded shadow"></div>
            <span className="font-medium">RV-79012A/B (頂部)</span>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
            <div className="w-6 h-6 bg-blue-400 rounded shadow"></div>
            <span className="font-medium">RV-79011A/B/C (底部)</span>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-red-50 rounded">
            <div className="w-6 h-6 bg-red-500 rounded shadow"></div>
            <span className="font-medium">溫度探頭</span>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
            <div className="w-6 h-6 bg-purple-400 rounded shadow"></div>
            <span className="font-medium">爐體</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotaryValve3D;
