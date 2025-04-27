import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

import { getsutta_tool,get_sutta_by_id } from "./getsutta.js";
import { z } from "zod";

const mcpServer = new McpServer({
  name: "ptkmcp-server",
  version: "0.0.1"
}, {
  capabilities: {},
});

mcpServer.tool(
  "get_sutta_by_id",
  {id : z.string()},
  async (params) => {
    const id = String(params.id);
    if (!id) {
      throw new Error("ID is required");
    }
    const sutta = await get_sutta_by_id(id);
    if (!sutta) {
      throw new Error(`Sutta ${id} not found`);
    }
    return {
      content: [{
        type: "text",
        text: sutta
      }]
    };
  }

)
/*
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        getsutta_tool
      ]
    }
});


mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "get_sutta_by_email_address":{
      const id = String(request.params.arguments?.id);
      if (!id) {
        throw new Error("ID is required");
      }
      const sutta = await get_sutta_by_email_address(id);
      if (!sutta) {
        throw new Error(`Sutta ${id} not found`);
      }
      return {
        content: [{
          type: "text",
          text: sutta
        }]
      };
    }   

    default:
      throw new Error("Unknown tool");
  }
});
*/
mcpServer.resource(
  'document',
  new ResourceTemplate("document://{name}", {
    list: async () => {
      return {
        resources: [
          {
            name: 'document-getting-started',
            uri: 'document://getting-started',
          }
        ]
      }
    }
  }),
  async (uri, variables) => {
    return {
      contents: [
        {
          uri: uri.href,
          text: 'Getting Started',
          mimeType: 'text/plain'
        }
      ]
    }
  }
);

export { mcpServer };
