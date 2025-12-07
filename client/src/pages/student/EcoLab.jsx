import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Text,
  RoundedBox,
  MeshTransmissionMaterial,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Beaker,
  Leaf,
  Wind,
  FlaskConical,
  ThermometerSun,
  AlertTriangle,
} from "lucide-react";

// ============================================
// WATER LAB COMPONENTS
// ============================================

function WaterBeaker({ pollutionLevel }) {
  const beakerRef = useRef();
  const waterRef = useRef();
  const particlesRef = useRef();

  // Rotate beaker slowly
  useFrame((state) => {
    if (beakerRef.current) {
      beakerRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Water color based on pollution
  const waterColor = useMemo(() => {
    const clean = new THREE.Color("#00a8ff");
    const polluted = new THREE.Color("#3d2914");
    return clean.lerp(polluted, pollutionLevel / 100);
  }, [pollutionLevel]);

  // Generate pollution particles
  const particles = useMemo(() => {
    const count = Math.floor(pollutionLevel * 5);
    const positions = [];
    const sizes = [];

    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 1.2,
        Math.random() * 2 - 0.5,
        (Math.random() - 0.5) * 1.2
      );
      sizes.push(Math.random() * 0.08 + 0.02);
    }

    return { positions: new Float32Array(positions), sizes };
  }, [pollutionLevel]);

  return (
    <group ref={beakerRef} position={[0, -0.5, 0]}>
      {/* Glass Beaker */}
      <mesh>
        <cylinderGeometry args={[1.2, 1, 3, 32, 1, true]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.3}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={0.5}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ffffff"
          transmission={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Beaker Bottom */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <MeshTransmissionMaterial
          thickness={0.2}
          transmission={0.9}
          roughness={0.1}
          color="#e8e8e8"
        />
      </mesh>

      {/* Beaker Rim */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 32]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Water */}
      <mesh ref={waterRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 0.95, 2.8, 32]} />
        <meshStandardMaterial
          color={waterColor}
          transparent
          opacity={0.7 + pollutionLevel * 0.003}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Pollution Particles */}
      {pollutionLevel > 5 && (
        <PollutionParticles
          positions={particles.positions}
          pollutionLevel={pollutionLevel}
        />
      )}

      {/* Water Surface Ripples */}
      <mesh position={[0, 1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 32]} />
        <meshStandardMaterial
          color={waterColor}
          transparent
          opacity={0.5}
          roughness={0}
          metalness={0.5}
        />
      </mesh>

      {/* Measurement Lines */}
      {[0.5, 1, 1.5, 2].map((y, i) => (
        <mesh key={i} position={[1.15, y - 1, 0]}>
          <boxGeometry args={[0.15, 0.02, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

function PollutionParticles({ positions, pollutionLevel }) {
  const particlesRef = useRef();
  const count = positions.length / 3;

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // Add subtle floating motion
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;

        // Keep particles within bounds
        if (positions[i * 3 + 1] > 1.3) positions[i * 3 + 1] = -0.8;
        if (positions[i * 3 + 1] < -1) positions[i * 3 + 1] = 1.3;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#2d1810"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function WaterLabUI({ pollutionLevel, temperature }) {
  return (
    <group position={[2.5, 1, 0]}>
      {/* Temperature Display */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <RoundedBox args={[1.5, 0.8, 0.1]} radius={0.1} position={[0, 1, 0]}>
          <meshStandardMaterial
            color="#1a365d"
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
        <Text position={[0, 1.15, 0.1]} fontSize={0.12} color="#60a5fa">
          Temperature
        </Text>
        <Text position={[0, 0.9, 0.1]} fontSize={0.25} color="#ffffff">
          {temperature}°C
        </Text>
      </Float>

      {/* Contamination Meter */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <RoundedBox args={[1.5, 0.8, 0.1]} radius={0.1} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#7c2d12"
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
        <Text position={[0, 0.15, 0.1]} fontSize={0.12} color="#fdba74">
          Contamination
        </Text>
        <Text position={[0, -0.1, 0.1]} fontSize={0.25} color="#ffffff">
          {pollutionLevel}%
        </Text>
      </Float>
    </group>
  );
}

// ============================================
// SOIL LAB COMPONENTS
// ============================================

function SoilCrossSection({ plasticLevel }) {
  const soilRef = useRef();

  // Soil darkness based on plastic waste
  const topSoilColor = useMemo(() => {
    const healthy = new THREE.Color("#5c4033");
    const damaged = new THREE.Color("#1a1a1a");
    return healthy.lerp(damaged, plasticLevel / 100);
  }, [plasticLevel]);

  const subSoilColor = useMemo(() => {
    const healthy = new THREE.Color("#8b6914");
    const damaged = new THREE.Color("#2d2d2d");
    return healthy.lerp(damaged, plasticLevel / 100);
  }, [plasticLevel]);

  return (
    <group ref={soilRef} position={[0, -0.5, 0]}>
      {/* Glass Container */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2.5, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.2}
          transmission={0.9}
          roughness={0.1}
          color="#ffffff"
        />
      </mesh>

      {/* Top Soil Layer */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.9, 0.8, 1.9]} />
        <meshStandardMaterial color={topSoilColor} roughness={0.9} />
      </mesh>

      {/* Sub Soil Layer */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.9, 0.6, 1.9]} />
        <meshStandardMaterial color={subSoilColor} roughness={0.85} />
      </mesh>

      {/* Rock/Clay Layer */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.9, 0.6, 1.9]} />
        <meshStandardMaterial color="#696969" roughness={0.8} />
      </mesh>

      {/* Plant */}
      <Plant plasticLevel={plasticLevel} />

      {/* Roots */}
      <Roots plasticLevel={plasticLevel} />

      {/* Worms */}
      <Worms plasticLevel={plasticLevel} />

      {/* Plastic Waste Particles */}
      {plasticLevel > 10 && <PlasticWaste plasticLevel={plasticLevel} />}
    </group>
  );
}

function Plant({ plasticLevel }) {
  const plantRef = useRef();

  // Wilting animation
  useFrame((state) => {
    if (plantRef.current) {
      const wiltAngle = (plasticLevel / 100) * 0.6;
      plantRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + wiltAngle;
    }
  });

  const plantHealth = 1 - plasticLevel / 100;
  const stemColor = new THREE.Color("#228b22").lerp(
    new THREE.Color("#8b4513"),
    plasticLevel / 100
  );
  const leafColor = new THREE.Color("#32cd32").lerp(
    new THREE.Color("#9b7653"),
    plasticLevel / 100
  );

  return (
    <group ref={plantRef} position={[0, 1.3, 0]}>
      {/* Stem */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
        <meshStandardMaterial color={stemColor} roughness={0.7} />
      </mesh>

      {/* Leaves */}
      {plantHealth > 0.2 && (
        <>
          <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, -0.3]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={leafColor} roughness={0.6} />
          </mesh>
          <mesh position={[-0.15, 0.3, 0]} rotation={[0, 0, 0.3]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color={leafColor} roughness={0.6} />
          </mesh>
          {plantHealth > 0.5 && (
            <mesh position={[0.1, 0.45, 0.1]} rotation={[0.2, 0, -0.2]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color={leafColor} roughness={0.6} />
            </mesh>
          )}
        </>
      )}
    </group>
  );
}

function Roots({ plasticLevel }) {
  const rootHealth = Math.max(0.3, 1 - plasticLevel / 100);
  const rootColor = new THREE.Color("#8b4513").lerp(
    new THREE.Color("#2d2d2d"),
    plasticLevel / 100
  );

  return (
    <group position={[0, 0.5, 0]}>
      {/* Main Root */}
      <mesh position={[0, -0.3, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[0.03 * rootHealth, 0.05 * rootHealth, 0.6, 6]}
        />
        <meshStandardMaterial color={rootColor} roughness={0.8} />
      </mesh>

      {/* Side Roots */}
      {rootHealth > 0.5 && (
        <>
          <mesh position={[0.2, -0.4, 0.1]} rotation={[0.3, 0, 0.5]}>
            <cylinderGeometry args={[0.015, 0.025, 0.4, 6]} />
            <meshStandardMaterial color={rootColor} roughness={0.8} />
          </mesh>
          <mesh position={[-0.15, -0.35, -0.1]} rotation={[-0.2, 0, -0.4]}>
            <cylinderGeometry args={[0.015, 0.02, 0.35, 6]} />
            <meshStandardMaterial color={rootColor} roughness={0.8} />
          </mesh>
        </>
      )}
    </group>
  );
}

function Worms({ plasticLevel }) {
  const wormRefs = useRef([]);
  const wormCount = Math.max(0, Math.floor(4 - plasticLevel / 25));

  useFrame((state) => {
    wormRefs.current.forEach((worm, i) => {
      if (worm) {
        worm.rotation.z = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        worm.position.y = -0.3 + Math.sin(state.clock.elapsedTime + i) * 0.05;
      }
    });
  });

  const wormPositions = [
    [-0.8, -0.3, 0.5],
    [0.6, -0.5, 0.3],
    [-0.4, -0.1, 0.6],
    [0.9, -0.2, 0.4],
  ];

  return (
    <>
      {wormPositions.slice(0, wormCount).map((pos, i) => (
        <group key={i} ref={(el) => (wormRefs.current[i] = el)} position={pos}>
          {/* Worm Body */}
          <mesh>
            <capsuleGeometry args={[0.03, 0.15, 8, 8]} />
            <meshStandardMaterial color="#d4748c" roughness={0.6} />
          </mesh>
          {/* Worm Segments */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, 0.3]}>
            <capsuleGeometry args={[0.025, 0.1, 8, 8]} />
            <meshStandardMaterial color="#c96b82" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function PlasticWaste({ plasticLevel }) {
  const count = Math.floor(plasticLevel / 5);
  const meshRefs = useRef([]);

  const plasticItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 2.5,
          Math.random() * 1.5 - 0.5,
          (Math.random() - 0.5) * 1.5,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.05 + Math.random() * 0.08,
        color: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#f38181"][
          Math.floor(Math.random() * 5)
        ],
      });
    }
    return items;
  }, [count]);

  return (
    <>
      {plasticItems.map((item, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={item.color}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </>
  );
}

// ============================================
// AIR LAB COMPONENTS
// ============================================

function AirCube({ smokeLevel }) {
  const cubeRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={cubeRef} position={[0, 0, 0]}>
      {/* Transparent Cube */}
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.15}
          transmission={0.95}
          roughness={0.05}
          color="#ffffff"
        />
      </mesh>

      {/* Cube Edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
        <lineBasicMaterial color="#60a5fa" linewidth={2} />
      </lineSegments>

      {/* Air Particles */}
      <AirParticles smokeLevel={smokeLevel} />

      {/* Light Rays */}
      <LightRays smokeLevel={smokeLevel} />
    </group>
  );
}

function AirParticles({ smokeLevel }) {
  const particlesRef = useRef();
  const count = Math.floor(50 + smokeLevel * 10);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;

      // Color from clean (light) to polluted (dark gray/brown)
      const pollution = smokeLevel / 100;
      const r = 0.8 - pollution * 0.5;
      const g = 0.8 - pollution * 0.6;
      const b = 0.8 - pollution * 0.4;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    return { positions, colors };
  }, [count, smokeLevel]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // Brownian motion
        positions[i * 3] += (Math.random() - 0.5) * 0.01;
        positions[i * 3 + 1] += (Math.random() - 0.5) * 0.01 + 0.002;
        positions[i * 3 + 2] += (Math.random() - 0.5) * 0.01;

        // Wrap around
        if (Math.abs(positions[i * 3]) > 1.3) positions[i * 3] *= -0.9;
        if (positions[i * 3 + 1] > 1.3) positions[i * 3 + 1] = -1.2;
        if (Math.abs(positions[i * 3 + 2]) > 1.3) positions[i * 3 + 2] *= -0.9;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04 + smokeLevel * 0.001}
        vertexColors
        transparent
        opacity={0.6 + smokeLevel * 0.004}
        sizeAttenuation
      />
    </points>
  );
}

function LightRays({ smokeLevel }) {
  const rayRef = useRef();

  useFrame((state) => {
    if (rayRef.current) {
      rayRef.current.material.opacity = 0.1 + (smokeLevel / 100) * 0.4;
    }
  });

  return (
    <mesh ref={rayRef} position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
      <coneGeometry args={[0.5, 3, 32, 1, true]} />
      <meshBasicMaterial
        color="#fff8dc"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function AQIDisplay({ smokeLevel }) {
  const aqi = Math.floor(50 + (smokeLevel / 100) * 200);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "#00e400";
    if (aqi <= 100) return "#ffff00";
    if (aqi <= 150) return "#ff7e00";
    if (aqi <= 200) return "#ff0000";
    return "#7e0023";
  };

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy (SG)";
    if (aqi <= 200) return "Unhealthy";
    return "Very Unhealthy";
  };

  return (
    <group position={[2.5, 1, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <RoundedBox args={[1.8, 1.2, 0.1]} radius={0.1}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
        <Text position={[0, 0.35, 0.1]} fontSize={0.15} color="#94a3b8">
          Air Quality Index
        </Text>
        <Text position={[0, 0, 0.1]} fontSize={0.35} color={getAQIColor(aqi)}>
          {aqi}
        </Text>
        <Text
          position={[0, -0.35, 0.1]}
          fontSize={0.12}
          color={getAQIColor(aqi)}
        >
          {getAQILabel(aqi)}
        </Text>
      </Float>
    </group>
  );
}

// ============================================
// MAIN LAB SCENE COMPONENTS
// ============================================

function WaterLabScene({ pollutionLevel }) {
  const temperature = Math.floor(22 + pollutionLevel * 0.08);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.5} color="#60a5fa" />

      <WaterBeaker pollutionLevel={pollutionLevel} />
      <WaterLabUI pollutionLevel={pollutionLevel} temperature={temperature} />

      <Sparkles
        count={30}
        scale={5}
        size={2}
        speed={0.3}
        opacity={0.3}
        color="#60a5fa"
      />

      <OrbitControls
        enablePan={false}
        maxDistance={8}
        minDistance={4}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="studio" />
    </>
  );
}

function SoilLabScene({ plasticLevel }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} castShadow />
      <pointLight position={[-2, 3, 2]} intensity={0.4} color="#fcd34d" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={0.5}
      />

      <SoilCrossSection plasticLevel={plasticLevel} />

      <OrbitControls
        enablePan={false}
        maxDistance={8}
        minDistance={4}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset="forest" />
    </>
  );
}

function AirLabScene({ smokeLevel }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
      <spotLight
        position={[3, 4, 2]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.8}
        color="#fff8dc"
      />

      <AirCube smokeLevel={smokeLevel} />
      <AQIDisplay smokeLevel={smokeLevel} />

      <Sparkles
        count={20}
        scale={6}
        size={1.5}
        speed={0.2}
        opacity={0.2}
        color="#fcd34d"
      />

      <OrbitControls
        enablePan={false}
        maxDistance={10}
        minDistance={5}
        autoRotate
        autoRotateSpeed={0.3}
      />
      <Environment preset="sunset" />
    </>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

const EcoLab = () => {
  const [pollutionLevel, setPollutionLevel] = useState(15);
  const [plasticLevel, setPlasticLevel] = useState(10);
  const [smokeLevel, setSmokeLevel] = useState(20);

  const getWaterQualityStatus = (level) => {
    if (level < 20) return { label: "Clean", color: "bg-green-500" };
    if (level < 50) return { label: "Moderate", color: "bg-yellow-500" };
    if (level < 75) return { label: "Polluted", color: "bg-orange-500" };
    return { label: "Hazardous", color: "bg-red-500" };
  };

  const getSoilHealthStatus = (level) => {
    if (level < 20) return { label: "Healthy", color: "bg-green-500" };
    if (level < 50) return { label: "Stressed", color: "bg-yellow-500" };
    if (level < 75) return { label: "Damaged", color: "bg-orange-500" };
    return { label: "Critical", color: "bg-red-500" };
  };

  const getAirQualityStatus = (level) => {
    if (level < 25) return { label: "Good", color: "bg-green-500" };
    if (level < 50) return { label: "Moderate", color: "bg-yellow-500" };
    if (level < 75) return { label: "Poor", color: "bg-orange-500" };
    return { label: "Hazardous", color: "bg-red-500" };
  };

  const waterStatus = getWaterQualityStatus(pollutionLevel);
  const soilStatus = getSoilHealthStatus(plasticLevel);
  const airStatus = getAirQualityStatus(smokeLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Eco-Lab Virtual Experiments
              </h1>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Explore how pollution affects our environment through interactive
              3D simulations. Adjust the sliders to see real-time changes in
              water, soil, and air quality.
            </p>
          </div>

          {/* 3 Lab Panels */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Water Lab Panel */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-slate-700 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Beaker className="w-5 h-5 text-blue-400" />
                  </div>
                  Water Lab
                  <Badge className={`ml-auto ${waterStatus.color}`}>
                    {waterStatus.label}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* 3D Canvas */}
                <div className="h-[350px] w-full">
                  <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <WaterLabScene pollutionLevel={pollutionLevel} />
                  </Canvas>
                </div>

                {/* Controls */}
                <div className="p-4 space-y-4 border-t border-slate-700">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Pollutant Level
                      </label>
                      <span className="text-sm font-bold text-blue-400">
                        {pollutionLevel}%
                      </span>
                    </div>
                    <Slider
                      value={[pollutionLevel]}
                      onValueChange={(value) => setPollutionLevel(value[0])}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <ThermometerSun className="w-4 h-4" />
                        Temperature
                      </div>
                      <div className="text-xl font-bold text-white">
                        {Math.floor(22 + pollutionLevel * 0.08)}°C
                      </div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">pH Level</div>
                      <div className="text-xl font-bold text-white">
                        {(7 - pollutionLevel * 0.025).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Lab Panel */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-slate-700 bg-gradient-to-r from-amber-900/50 to-orange-900/50">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Leaf className="w-5 h-5 text-amber-400" />
                  </div>
                  Soil Lab
                  <Badge className={`ml-auto ${soilStatus.color}`}>
                    {soilStatus.label}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* 3D Canvas */}
                <div className="h-[350px] w-full">
                  <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
                    <SoilLabScene plasticLevel={plasticLevel} />
                  </Canvas>
                </div>

                {/* Controls */}
                <div className="p-4 space-y-4 border-t border-slate-700">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Plastic Waste
                      </label>
                      <span className="text-sm font-bold text-amber-400">
                        {plasticLevel}%
                      </span>
                    </div>
                    <Slider
                      value={[plasticLevel]}
                      onValueChange={(value) => setPlasticLevel(value[0])}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">Worm Count</div>
                      <div className="text-xl font-bold text-white">
                        {Math.max(0, Math.floor(4 - plasticLevel / 25))} 🪱
                      </div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">Plant Health</div>
                      <div className="text-xl font-bold text-white">
                        {Math.max(0, 100 - plasticLevel)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Air Lab Panel */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-slate-700 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Wind className="w-5 h-5 text-purple-400" />
                  </div>
                  Air Lab
                  <Badge className={`ml-auto ${airStatus.color}`}>
                    {airStatus.label}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* 3D Canvas */}
                <div className="h-[350px] w-full">
                  <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <AirLabScene smokeLevel={smokeLevel} />
                  </Canvas>
                </div>

                {/* Controls */}
                <div className="p-4 space-y-4 border-t border-slate-700">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Smoke Emission
                      </label>
                      <span className="text-sm font-bold text-purple-400">
                        {smokeLevel}%
                      </span>
                    </div>
                    <Slider
                      value={[smokeLevel]}
                      onValueChange={(value) => setSmokeLevel(value[0])}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">AQI Index</div>
                      <div
                        className="text-xl font-bold"
                        style={{
                          color:
                            smokeLevel < 25
                              ? "#00e400"
                              : smokeLevel < 50
                              ? "#ffff00"
                              : smokeLevel < 75
                              ? "#ff7e00"
                              : "#ff0000",
                        }}
                      >
                        {Math.floor(50 + (smokeLevel / 100) * 200)}
                      </div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">PM 2.5</div>
                      <div className="text-xl font-bold text-white">
                        {Math.floor(12 + smokeLevel * 1.5)} µg/m³
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Educational Info Section */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-900/30 border-blue-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  💧 Water Pollution Facts
                </h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 80% of wastewater flows back untreated</li>
                  <li>• Pollutants increase water temperature</li>
                  <li>• Changes pH levels affect aquatic life</li>
                  <li>• Clean water is essential for ecosystems</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-amber-900/30 border-amber-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-2">
                  🌱 Soil Health Facts
                </h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Plastic takes 500+ years to decompose</li>
                  <li>• Earthworms are vital soil ecosystem engineers</li>
                  <li>• Healthy soil contains billions of organisms</li>
                  <li>• Microplastics affect plant root growth</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  💨 Air Quality Facts
                </h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• AQI above 150 is unhealthy for everyone</li>
                  <li>• PM2.5 particles penetrate deep into lungs</li>
                  <li>• Trees can filter up to 100 pollutants daily</li>
                  <li>• Indoor air can be 5x more polluted</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EcoLab;
