import { mcpServer } from "./mcp-server.js";
import { createSSEServer } from "./sse-server.js";

const sseServer = createSSEServer(mcpServer);
const port=process.env.PORT || 3001
sseServer.listen(port);

console.log('mcp sse server listening on port', port);