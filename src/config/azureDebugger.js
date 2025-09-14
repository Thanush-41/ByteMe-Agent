// Azure AI Debug Utility
import { AZURE_CONFIG } from './azureConfig';

export class AzureDebugger {
  static async testAllEndpoints() {
    console.log('=== Azure AI Foundry Debug Test ===');
    console.log('Endpoint:', AZURE_CONFIG.ENDPOINT);
    console.log('Agent ID:', AZURE_CONFIG.AGENT_ID);
    console.log('API Key (first 10 chars):', AZURE_CONFIG.API_KEY?.substring(0, 10) + '...');
    
    const results = {
      agentDetails: null,
      threadCreation: null,
      authMethod: null
    };

    // Test different endpoint patterns
    const endpointVariations = [
      AZURE_CONFIG.ENDPOINT, // Base URL
      AZURE_CONFIG.ENDPOINT + '/openai', // OpenAI path
    ];

    const authMethods = [
      {
        name: 'api-key (Azure OpenAI)',
        headers: { 'api-key': AZURE_CONFIG.API_KEY }
      },
      {
        name: 'Ocp-Apim-Subscription-Key',
        headers: { 'Ocp-Apim-Subscription-Key': AZURE_CONFIG.API_KEY }
      },
      {
        name: 'Authorization Bearer',
        headers: { 'Authorization': `Bearer ${AZURE_CONFIG.API_KEY}` }
      },
      {
        name: 'x-api-key',
        headers: { 'x-api-key': AZURE_CONFIG.API_KEY }
      }
    ];

    // Test different API endpoints
    const testEndpoints = [
      // Azure OpenAI Chat Completions
      {
        name: 'Azure OpenAI Chat (gpt-4)',
        path: '/openai/deployments/gpt-4/chat/completions',
        method: 'POST',
        body: {
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        }
      },
      // Azure OpenAI Chat Completions with your agent ID as deployment
      {
        name: 'Azure OpenAI Chat (your agent ID)',
        path: `/openai/deployments/${AZURE_CONFIG.AGENT_ID}/chat/completions`,
        method: 'POST',
        body: {
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10
        }
      },
      // Azure AI Projects Agents
      {
        name: 'Azure AI Projects Agent',
        path: `/agents/${AZURE_CONFIG.AGENT_ID}`,
        method: 'GET',
        body: null
      }
    ];

    // Test agent details endpoint
    for (const endpoint of endpointVariations) {
      for (const authMethod of authMethods) {
        for (const testEndpoint of testEndpoints) {
          try {
            const testUrl = `${endpoint}${testEndpoint.path}?api-version=${AZURE_CONFIG.API_VERSION}`;
            console.log(`Testing: ${testEndpoint.name} - ${testUrl} with ${authMethod.name}`);
            
            const fetchOptions = {
              method: testEndpoint.method,
              headers: {
                'Content-Type': 'application/json',
                ...authMethod.headers
              }
            };

            if (testEndpoint.body) {
              fetchOptions.body = JSON.stringify(testEndpoint.body);
            }

            const response = await fetch(testUrl, fetchOptions);
            console.log(`Response: ${response.status} ${response.statusText}`);
            
            if (response.ok) {
              const data = await response.json();
              console.log(`✅ SUCCESS! ${testEndpoint.name}:`, data);
              results.agentDetails = data;
              results.authMethod = authMethod;
              results.workingEndpoint = { endpoint, testEndpoint };
              return results;
            } else {
              const errorText = await response.text();
              console.log(`❌ Failed: ${errorText}`);
            }
          } catch (error) {
            console.log(`❌ Error:`, error.message);
          }
        }
      }
    }

    return results;
  }

  static async testThreadCreation(endpoint, authMethod) {
    try {
      console.log(`Testing thread creation with working auth method...`);
      
      const testUrl = `${endpoint}/agents/threads?api-version=${AZURE_CONFIG.API_VERSION}`;
      console.log(`Thread creation URL: ${testUrl}`);
      
      const response = await fetch(testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authMethod.headers
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        const thread = await response.json();
        console.log('✅ Thread creation successful:', thread);
        return thread;
      } else {
        const errorText = await response.text();
        console.log(`❌ Thread creation failed: ${errorText}`);
      }
    } catch (error) {
      console.log(`❌ Thread creation error:`, error);
    }
  }

  // Quick test function for React component
  static async quickTest() {
    const results = await this.testAllEndpoints();
    
    if (results.agentDetails) {
      return {
        success: true,
        message: 'Azure AI connection successful!',
        authMethod: results.authMethod.name,
        agentName: results.agentDetails.name || 'Unknown'
      };
    } else {
      return {
        success: false,
        message: 'Unable to connect to Azure AI. Please check your credentials and endpoint.',
        details: 'Check browser console for detailed error logs.'
      };
    }
  }
}