# Azure AI Foundry Integration Setup

This document explains how to integrate your Azure AI Foundry agent with the student portal chat system.

## Prerequisites

1. Azure AI Foundry account with an active agent
2. API key and Agent ID from Azure AI Foundry
3. Endpoint URL for your Azure AI Foundry service

## Setup Instructions

### Step 1: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your Azure credentials:
   ```
   REACT_APP_AZURE_API_KEY=your-actual-api-key
   REACT_APP_AZURE_AGENT_ID=your-actual-agent-id
   REACT_APP_AZURE_ENDPOINT=https://your-foundry-endpoint.cognitiveservices.azure.com
   REACT_APP_AZURE_API_VERSION=2024-02-15-preview
   ```

### Step 2: Update Azure Configuration (Alternative)

If you prefer not to use environment variables, you can directly edit `src/config/azureConfig.js`:

```javascript
export const AZURE_CONFIG = {
  API_KEY: 'your-actual-api-key',
  AGENT_ID: 'your-actual-agent-id',
  ENDPOINT: 'https://your-foundry-endpoint.cognitiveservices.azure.com',
  API_VERSION: '2024-02-15-preview',
};
```

### Step 3: Common Azure AI Foundry Endpoint Patterns

Depending on your Azure setup, your endpoint might follow one of these patterns:

1. **Azure OpenAI Service:**
   ```
   https://{resource-name}.openai.azure.com
   ```

2. **Azure Cognitive Services:**
   ```
   https://{resource-name}.cognitiveservices.azure.com
   ```

3. **Azure AI Foundry Specific:**
   ```
   https://{foundry-name}.api.cognitive.microsoft.com
   ```

### Step 4: API Configuration

The integration supports two API patterns:

#### Pattern 1: OpenAI-Compatible API
This is the default implementation in `AzureAIService.sendMessage()`:
- Uses `/openai/deployments/{agent-id}/chat/completions` endpoint
- Standard OpenAI chat completions format

#### Pattern 2: Azure AI Foundry Agents API
Use `AzureAIService.sendMessageAlternative()` if your setup uses:
- `/agents/{agent-id}/chat` endpoint
- Azure-specific agent API format

### Step 5: Security Considerations

1. **Never commit API keys to version control**
2. Add `.env` to your `.gitignore` file:
   ```
   # Environment variables
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

3. **For production deployment:**
   - Use Azure Key Vault or similar secure storage
   - Set environment variables in your hosting platform
   - Consider implementing backend proxy to hide API keys

### Step 6: Testing the Integration

1. Start your React application:
   ```bash
   npm start
   ```

2. Log in as a student
3. Open the chat interface
4. Send a test message
5. Check the browser console for any API errors

### Troubleshooting

#### Common Issues:

1. **CORS Errors:**
   - Configure CORS settings in Azure AI Foundry
   - Consider using a backend proxy for production

2. **Authentication Errors:**
   - Verify API key is correct
   - Check if your Azure resource is active
   - Ensure proper permissions are set

3. **Endpoint Errors:**
   - Verify the endpoint URL format
   - Check the API version compatibility
   - Try alternative endpoint patterns

4. **Rate Limiting:**
   - Azure AI Foundry may have rate limits
   - Implement retry logic if needed
   - Consider caching responses

#### Debug Steps:

1. Check browser console for error messages
2. Verify network requests in Developer Tools
3. Test API endpoints directly with Postman/curl
4. Check Azure AI Foundry logs and metrics

### Features Included

- ✅ Real-time chat with Azure AI Foundry
- ✅ Conversation history context
- ✅ Error handling and fallback responses
- ✅ Loading states and connection indicators
- ✅ Student portal-specific prompts
- ✅ Responsive design
- ✅ Security best practices

### Future Enhancements

Consider implementing:
- Message persistence in local storage
- User authentication context in AI prompts
- File upload capabilities
- Voice input/output
- Multi-language support
- Analytics and usage tracking