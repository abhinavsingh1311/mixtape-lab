import * as THREE from 'three';

// Add the missing shader chunks
THREE.ShaderChunk['colorspace_fragment'] = `
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
`;
