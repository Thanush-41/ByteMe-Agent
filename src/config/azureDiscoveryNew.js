// Azure Resource Discovery Tool
class AzureDiscovery {
  constructor() {
    this.endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
    this.apiKey = process.env.REACT_APP_AZURE_API_KEY;
    this.agentId = process.env.REACT_APP_AZURE_AGENT_ID;
  }

  async discoverResources() {
    console.log('🔍 Starting Azure Resource Discovery...');
    console.log('Endpoint:', this.endpoint);
    console.log('Agent ID:', this.agentId);
    console.log('API Key (first 10 chars):', this.apiKey?.substring(0, 10) + '...');

    const results = [];

    // Test 1: List OpenAI Deployments
    try {
      console.log('\n📋 Testing: List OpenAI Deployments');
      const response = await fetch(`${this.endpoint}/openai/deployments?api-version=2024-06-01`, {
        method: 'GET',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('✅ Success! Available deployments:', data);
        results.push({ test: 'List Deployments', status: 'success', data });
      } else {
        console.log('❌ Failed:', data);
        results.push({ test: 'List Deployments', status: 'failed', error: data });
      }
    } catch (error) {
      console.log('❌ Error:', error.message);
      results.push({ test: 'List Deployments', status: 'error', error: error.message });
    }

    // Test 2: Azure AI Foundry Agents API
    try {
      console.log('\n🤖 Testing: Azure AI Foundry Agents');
      const response = await fetch(`${this.endpoint}/agents?api-version=2024-07-01-preview`, {
        method: 'GET',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('✅ Success! Available agents:', data);
        results.push({ test: 'List Agents', status: 'success', data });
      } else {
        console.log('❌ Failed:', data);
        results.push({ test: 'List Agents', status: 'failed', error: data });
      }
    } catch (error) {
      console.log('❌ Error:', error.message);
      results.push({ test: 'List Agents', status: 'error', error: error.message });
    }

    // Test 3: Direct Agent Access
    try {
      console.log('\n👤 Testing: Direct Agent Access');
      const response = await fetch(`${this.endpoint}/agents/${this.agentId}?api-version=2024-07-01-preview`, {
        method: 'GET',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('✅ Success! Agent details:', data);
        results.push({ test: 'Get Agent', status: 'success', data });
      } else {
        console.log('❌ Failed:', data);
        results.push({ test: 'Get Agent', status: 'failed', error: data });
      }
    } catch (error) {
      console.log('❌ Error:', error.message);
      results.push({ test: 'Get Agent', status: 'error', error: error.message });
    }

    // Test 4: Common deployment names
    const commonDeployments = ['gpt-4o', 'gpt-4-turbo', 'gpt-35-turbo', 'text-davinci-003'];
    
    for (const deployment of commonDeployments) {
      try {
        console.log(`\n🔄 Testing Deployment: ${deployment}`);
        const response = await fetch(`${this.endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-06-01`, {
          method: 'POST',
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Test' }],
            max_tokens: 5
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${deployment} works!`, data);
          results.push({ test: `Deployment ${deployment}`, status: 'success', data });
          break; // Found working deployment
        } else {
          console.log(`❌ ${deployment} failed:`, response.status);
        }
      } catch (error) {
        console.log(`❌ ${deployment} error:`, error.message);
      }
    }

    console.log('\n📊 Discovery Complete! Summary:');
    results.forEach(result => {
      console.log(`${result.status === 'success' ? '✅' : '❌'} ${result.test}: ${result.status}`);
    });

    return results;
  }
}

// Auto-run discovery
const discovery = new AzureDiscovery();
export default discovery;