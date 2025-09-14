// Test Azure AI Projects endpoint
const testAzureAIProjects = async () => {
  const endpoint = "https://ezil-ai.services.ai.azure.com/api/projects/ezil";
  const apiKey = process.env.REACT_APP_AZURE_API_KEY;
  const agentId = process.env.REACT_APP_AZURE_AGENT_ID;

  console.log('🔬 Testing Azure AI Projects endpoint...');
  console.log('Endpoint:', endpoint);
  console.log('Agent ID:', agentId);
  console.log('API Key (first 10 chars):', apiKey?.substring(0, 10) + '...');

  const tests = [
    {
      name: 'List Agents',
      url: `${endpoint}/agents?api-version=2024-07-01-preview`,
      method: 'GET'
    },
    {
      name: 'Get Specific Agent',
      url: `${endpoint}/agents/${agentId}?api-version=2024-07-01-preview`,
      method: 'GET'
    },
    {
      name: 'Agent Chat',
      url: `${endpoint}/agents/${agentId}/chat?api-version=2024-07-01-preview`,
      method: 'POST',
      body: {
        messages: [{ role: 'user', content: 'Hello, please respond with just "Hi from Azure AI!"' }]
      }
    },
    {
      name: 'Agent Completions',
      url: `${endpoint}/agents/${agentId}/completions?api-version=2024-07-01-preview`,
      method: 'POST',
      body: {
        messages: [{ role: 'user', content: 'Hello test' }],
        max_tokens: 50
      }
    }
  ];

  const authMethods = [
    { name: 'api-key', headers: { 'api-key': apiKey } },
    { name: 'Authorization Bearer', headers: { 'Authorization': `Bearer ${apiKey}` } },
    { name: 'Ocp-Apim-Subscription-Key', headers: { 'Ocp-Apim-Subscription-Key': apiKey } }
  ];

  for (const test of tests) {
    for (const auth of authMethods) {
      try {
        console.log(`\n🧪 Testing: ${test.name} with ${auth.name}`);
        console.log(`URL: ${test.url}`);

        const options = {
          method: test.method,
          headers: {
            'Content-Type': 'application/json',
            ...auth.headers
          }
        };

        if (test.body) {
          options.body = JSON.stringify(test.body);
        }

        const response = await fetch(test.url, options);
        const responseText = await response.text();

        console.log(`Status: ${response.status}`);

        if (response.ok) {
          console.log('✅ SUCCESS!');
          try {
            const data = JSON.parse(responseText);
            console.log('Response:', data);
            
            // If this is a chat response, highlight it
            if (test.name.includes('Chat') || test.name.includes('Completions')) {
              console.log('🎉 CHAT WORKING! Response content:', data.choices?.[0]?.message?.content || data);
            }
            
            return { success: true, test: test.name, auth: auth.name, data };
          } catch (e) {
            console.log('Response (text):', responseText);
          }
        } else {
          console.log('❌ Failed:', responseText.substring(0, 200));
        }

      } catch (error) {
        console.log('❌ Error:', error.message);
      }
    }
  }

  console.log('\n❌ No working Azure AI Projects configuration found');
  return { success: false };
};

// Auto-run test
testAzureAIProjects();

export default testAzureAIProjects;