// Azure AI Foundry Configuration
export const AZURE_CONFIG = {
  // Use environment variables for security (recommended)
  API_KEY: process.env.REACT_APP_AZURE_API_KEY || 'your-azure-api-key-here',
  AGENT_ID: process.env.REACT_APP_AZURE_AGENT_ID || 'your-agent-id-here',
  ENDPOINT: process.env.REACT_APP_AZURE_ENDPOINT || 'https://your-foundry-endpoint.cognitiveservices.azure.com',
  API_VERSION: process.env.REACT_APP_AZURE_API_VERSION || '2024-02-15-preview',
};

// Azure AI Foundry API service
export class AzureAIService {
  static async sendMessage(message, conversationHistory = []) {
    try {
      console.log('Using Azure OpenAI API format...');
      console.log('Endpoint:', AZURE_CONFIG.ENDPOINT);
      console.log('Agent ID (Deployment):', AZURE_CONFIG.AGENT_ID);
      
      // Use Azure OpenAI Chat Completions API with working deployment
      const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/openai/deployments/gpt-4o/chat/completions?api-version=2024-06-01`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_CONFIG.API_KEY,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for a student portal. Help students with their academic queries, course information, attendance, exams, and general student life questions. Be friendly, informative, and supportive.'
            },
            ...conversationHistory.slice(-10).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Azure OpenAI API Error:', response.status, errorText);
        throw new Error(`Azure OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process your request at the moment.';
    } catch (error) {
      console.error('Azure AI Service Error:', error);
      return 'I apologize, but I\'m experiencing technical difficulties. Please try again later. Error: ' + error.message;
    }
  }

  // Test endpoint connectivity
  static async testEndpoint() {
    console.log('Testing endpoint connectivity...');
    
    // Try to get agent details first
    const authMethods = [
      {
        name: 'Ocp-Apim-Subscription-Key',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_CONFIG.API_KEY,
        }
      },
      {
        name: 'Authorization Bearer',
        headers: {
          'Authorization': `Bearer ${AZURE_CONFIG.API_KEY}`,
        }
      },
      {
        name: 'api-key',
        headers: {
          'api-key': AZURE_CONFIG.API_KEY,
        }
      }
    ];

    for (const authMethod of authMethods) {
      try {
        const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/${AZURE_CONFIG.AGENT_ID}`, {
          method: 'GET',
          headers: authMethod.headers
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`Agent details retrieved with ${authMethod.name}:`, data);
          return authMethod;
        } else {
          const errorText = await response.text();
          console.log(`Agent test failed with ${authMethod.name}: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.log(`Agent test error with ${authMethod.name}:`, error);
      }
    }
    
    throw new Error('Unable to authenticate with any method');
  }

  // Create a new thread
  static async createThread() {
    // Try different authentication methods
    const authMethods = [
      {
        name: 'Ocp-Apim-Subscription-Key',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': AZURE_CONFIG.API_KEY,
        }
      },
      {
        name: 'Authorization Bearer',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AZURE_CONFIG.API_KEY}`,
        }
      },
      {
        name: 'api-key',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_CONFIG.API_KEY,
        }
      },
      {
        name: 'x-api-key',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': AZURE_CONFIG.API_KEY,
        }
      }
    ];

    let lastError = null;

    for (const authMethod of authMethods) {
      try {
        console.log(`Trying authentication method: ${authMethod.name}`);
        
        const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/threads`, {
          method: 'POST',
          headers: authMethod.headers,
          body: JSON.stringify({})
        });

        if (response.ok) {
          console.log(`Success with authentication method: ${authMethod.name}`);
          return await response.json();
        } else {
          const errorText = await response.text();
          console.log(`Failed with ${authMethod.name}: ${response.status} - ${errorText}`);
          lastError = new Error(`${authMethod.name} failed: ${response.status}`);
        }
      } catch (error) {
        console.log(`Error with ${authMethod.name}:`, error);
        lastError = error;
      }
    }

    // If all methods fail, throw the last error
    throw lastError || new Error('All authentication methods failed');
  }

  // Add message to thread
  static async addMessageToThread(threadId, message) {
    const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/threads/${threadId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_CONFIG.API_KEY,
      },
      body: JSON.stringify({
        role: 'user',
        content: message
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Add Message Error:', response.status, errorText);
      throw new Error(`Failed to add message: ${response.status}`);
    }

    return await response.json();
  }

  // Create and process run
  static async createAndProcessRun(threadId) {
    const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/threads/${threadId}/runs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_CONFIG.API_KEY,
      },
      body: JSON.stringify({
        assistant_id: AZURE_CONFIG.AGENT_ID
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create Run Error:', response.status, errorText);
      throw new Error(`Failed to create run: ${response.status}`);
    }

    const run = await response.json();
    
    // Wait for run to complete
    return await AzureAIService.waitForRunCompletion(threadId, run.id);
  }

  // Wait for run completion
  static async waitForRunCompletion(threadId, runId, maxAttempts = 30) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers: {
          'api-key': AZURE_CONFIG.API_KEY,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to check run status: ${response.status}`);
      }

      const run = await response.json();
      
      if (run.status === 'completed') {
        return run;
      } else if (run.status === 'failed') {
        throw new Error(`Run failed: ${run.last_error || 'Unknown error'}`);
      }
      
      // Wait 1 second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error('Run timed out');
  }

  // Get messages from thread
  static async getThreadMessages(threadId) {
    const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/threads/${threadId}/messages?order=asc`, {
      method: 'GET',
      headers: {
        'api-key': AZURE_CONFIG.API_KEY,
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Messages Error:', response.status, errorText);
      throw new Error(`Failed to get messages: ${response.status}`);
    }

    const data = await response.json();
    
    // Find the last assistant message
    const messages = data.data || data.messages || [];
    const lastAssistantMessage = messages
      .filter(msg => msg.role === 'assistant')
      .pop();

    if (lastAssistantMessage && lastAssistantMessage.content) {
      // Handle different content formats
      if (Array.isArray(lastAssistantMessage.content)) {
        const textContent = lastAssistantMessage.content.find(c => c.type === 'text');
        return textContent?.text?.value || 'No response received.';
      } else if (lastAssistantMessage.content.text) {
        return lastAssistantMessage.content.text.value || lastAssistantMessage.content.text;
      } else {
        return lastAssistantMessage.content;
      }
    }

    return 'No response received from the assistant.';
  }

  // Alternative method for different Azure AI Foundry endpoint patterns
  static async sendMessageAlternative(message, conversationHistory = []) {
    try {
      // This is for Azure AI Foundry Agents API (different from OpenAI-compatible endpoint)
      const response = await fetch(`${AZURE_CONFIG.ENDPOINT}/agents/${AZURE_CONFIG.AGENT_ID}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': AZURE_CONFIG.API_KEY,
          'Authorization': `Bearer ${AZURE_CONFIG.API_KEY}`,
        },
        body: JSON.stringify({
          message: message,
          conversation_history: conversationHistory,
          parameters: {
            max_tokens: 500,
            temperature: 0.7,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Azure AI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.response || data.message || 'Sorry, I could not process your request at the moment.';
    } catch (error) {
      console.error('Azure AI Service Error:', error);
      return 'I apologize, but I\'m experiencing technical difficulties. Please try again later.';
    }
  }
}