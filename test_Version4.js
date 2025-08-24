// Simple test for /api/predict
const axios = require('axios');
const server = require('./server');
const http = require('http');

const PORT = 3999;

async function runTest() {
  let srv;
  try {
    // Start server
    srv = http.createServer(server);
    srv.listen(PORT);

    // Give server a moment to start
    await new Promise(r => setTimeout(r, 2000));

    // Test predict endpoint for BETIKA
    const res = await axios.post(`http://localhost:${PORT}/api/predict`, { platform: "betika" }, { timeout: 40000 });
    if (res.data && res.data.success && res.data.value) {
      console.log("✅ Prediction success!", res.data.value);
      process.exit(0);
    } else {
      console.error("❌ Prediction failed:", res.data.error);
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Test error:", err.message);
    process.exit(1);
  } finally {
    if (srv) srv.close();
  }
}
runTest();