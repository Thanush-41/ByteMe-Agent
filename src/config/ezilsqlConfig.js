// EZilSQL API Configuration
export const EZILSQL_CONFIG = {
  // Use proxy URL for development to avoid CORS issues
  API_URL: process.env.NODE_ENV === 'development' 
    ? '/api/chat'  // Use proxy route
    : (process.env.REACT_APP_EZILSQL_API_URL || 'https://ezilsql.azurewebsites.net/chat'),
  API_KEY: process.env.REACT_APP_EZILSQL_API_KEY || '',
};

// EZilSQL API service
export class EZilSQLService {
  static conversationId = null;

  static async sendMessage(message, conversationHistory = []) {
    try {
      console.log('🚀 Using EZilSQL API...');
      console.log('Endpoint:', EZILSQL_CONFIG.API_URL);
      
      // Prepare request body
      const requestBody = {
        message: message
      };

      // Include conversation_id if we have one
      if (this.conversationId) {
        requestBody.conversation_id = this.conversationId;
      }

      console.log('📤 Request body:', requestBody);

      const response = await fetch(EZILSQL_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': EZILSQL_CONFIG.API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('EZilSQL API Error:', response.status, errorText);
        
        // Handle specific error cases
        if (response.status === 401) {
          throw new Error('API key required. Please check your configuration.');
        } else if (response.status === 403) {
          throw new Error('Invalid API key. Please check your credentials.');
        } else if (response.status === 400) {
          throw new Error('Bad request. Message field may be missing.');
        } else if (response.status === 500) {
          throw new Error('Server error. OpenAI client may not be available.');
        }
        
        throw new Error(`EZilSQL API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📥 Response data:', data);

      // Store conversation ID for future requests
      if (data.conversation_id) {
        this.conversationId = data.conversation_id;
        console.log('💾 Stored conversation ID:', this.conversationId);
      }

      // Return both the response and any portal navigation data
      return {
        response: data.response || 'Sorry, I could not process your request at the moment.',
        conversationId: data.conversation_id,
        messageCount: data.message_count,
        portalUrl: data.portal_url || null, // For automatic navigation
        isPortalNavigation: !!data.portal_url
      };

    } catch (error) {
      console.error('EZilSQL Service Error:', error);
      
      let errorMessage = 'I apologize, but I\'m experiencing technical difficulties. Please try again later.';
      
      // Provide specific error messages for common issues
      if (error.message.includes('Failed to fetch')) {
        if (process.env.NODE_ENV === 'development') {
          errorMessage = 'Connection failed. Please restart the development server to apply proxy settings, or check if the API endpoint is accessible.';
        } else {
          errorMessage = 'Unable to connect to the API. Please check your internet connection or try again later.';
        }
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Cross-origin request blocked. Please contact support to configure API access.';
      }
      
      return {
        response: errorMessage + ' Error: ' + error.message,
        conversationId: null,
        messageCount: 0,
        portalUrl: null,
        isPortalNavigation: false
      };
    }
  }

  // Test endpoint connectivity
  static async testConnection() {
    try {
      console.log('🔍 Testing EZilSQL connection...');
      console.log('🔧 Environment:', process.env.NODE_ENV);
      console.log('🌐 API URL:', EZILSQL_CONFIG.API_URL);
      
      const testMessage = "Hello";
      const response = await fetch(EZILSQL_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': EZILSQL_CONFIG.API_KEY,
        },
        body: JSON.stringify({ message: testMessage }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `${response.status} ${response.statusText}: ${errorText}`,
          endpoint: EZILSQL_CONFIG.API_URL
        };
      }

      const data = await response.json();
      return {
        success: true,
        response: data.response || 'Connection successful',
        endpoint: EZILSQL_CONFIG.API_URL,
        conversationId: data.conversation_id
      };

    } catch (error) {
      let errorMessage = error.message;
      if (error.message.includes('Failed to fetch') && process.env.NODE_ENV === 'development') {
        errorMessage += ' (Try restarting the development server)';
      }
      
      return {
        success: false,
        error: errorMessage,
        endpoint: EZILSQL_CONFIG.API_URL
      };
    }
  }

  // Reset conversation
  static resetConversation() {
    this.conversationId = null;
    console.log('🔄 Conversation reset');
  }
}

// Export both new and legacy functions for compatibility
export const sendMessage = EZilSQLService.sendMessage.bind(EZilSQLService);
export const testConnection = EZilSQLService.testConnection.bind(EZilSQLService);