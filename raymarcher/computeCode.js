let cmpx;
let computeProgram;

    // Canvas setup
    const canvas2 = document.createElement("canvas")

    // Create WebGL2ComputeRenderingcmpx
    cmpx = canvas2.getContext('webgl2-compute');
    if (!cmpx) {
        document.body.className = 'error';
    }

    // ComputeShader source
    // language=GLSL
    const computeShaderSource = `#version 310 es
      layout (local_size_x = 1, local_size_y = 1, local_size_z = 1) in;
      layout (std430, binding = 0) buffer SSBO {
       float data[];
      } ssbo;
      
      float sdBox( vec3 p, vec3 b, vec3 loc )
        {
            vec3 q = abs(p - loc) - b;
            return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
        }

        float sdSphere( vec3 p, float s, vec3 loc )
        {
            return length(p - loc)-s;
        }

        float march( vec3 p, vec3 v ) {
            uint counter = uint(0);
            float step = 20.0f;
            float minStep = 0.8f;
            float maxStep = 1000.0f;
            while(step > minStep) {
                if (step > maxStep) return -1.0f;
                counter++;
                step += min(sdSphere(p, 200.0f, vec3(0.0f)), 1000.0f);
            }
            return float(counter);
        }

      void main() {
        uint threadIndex = gl_GlobalInvocationID.x;
            ssbo.data[int(threadIndex) * 6] = march(
            vec3(
                ssbo.data[int(threadIndex) * 6],
                ssbo.data[int(threadIndex) * 6 + 1], 
                ssbo.data[int(threadIndex) * 6 + 2]), 
            vec3(
                ssbo.data[int(threadIndex) * 6 + 3],
                ssbo.data[int(threadIndex) * 6 + 4], 
                ssbo.data[int(threadIndex) * 6 + 5])
                );
      }
      `;

    // create WebGLShader for ComputeShader
    const computeShader = cmpx.createShader(cmpx.COMPUTE_SHADER);
    cmpx.shaderSource(computeShader, computeShaderSource);
    cmpx.compileShader(computeShader);
    if (!cmpx.getShaderParameter(computeShader, cmpx.COMPILE_STATUS)) {
        console.log(cmpx.getShaderInfoLog(computeShader));
    }

    // create WebGLProgram for ComputeShader
    computeProgram = cmpx.createProgram();
    cmpx.attachShader(computeProgram, computeShader);
    cmpx.linkProgram(computeProgram);
    if (!cmpx.getProgramParameter(computeProgram, cmpx.LINK_STATUS)) {
        console.log(cmpx.getProgramInfoLog(computeProgram));

    }



function bulkCompute(inputData) {
    // input data
    const input = Float32Array.from(inputData);

    // create ShaderStorageBuffer
    const ssbo = cmpx.createBuffer();
    cmpx.bindBuffer(cmpx.SHADER_STORAGE_BUFFER, ssbo);
    cmpx.bufferData(cmpx.SHADER_STORAGE_BUFFER, input, cmpx.DYNAMIC_COPY);
    cmpx.bindBufferBase(cmpx.SHADER_STORAGE_BUFFER, 0, ssbo);

    // execute ComputeShader
    cmpx.useProgram(computeProgram);
    cmpx.dispatchCompute(cw * ch, 1, 1);

    // get result
    const result = new Float32Array(inputData.length);
    cmpx.getBufferSubData(cmpx.SHADER_STORAGE_BUFFER, 0, result);
    return result;
}