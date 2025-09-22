// Direct test of EZilSQL API endpoint
const https = require('https');

const API_URL = 'https://ezilsql.azurewebsites.net/chat';
const API_KEY = 'fygewft7gf7fg7igtf327d862';

async function testEZilSQLAPI() {
    console.log('🧪 ========== DIRECT EZILSQL API TEST ==========');
    console.log('🔗 Testing URL:', API_URL);
    console.log('🔑 Using API Key:', API_KEY ? 'CONFIGURED' : 'MISSING');
    console.log('📝 Test Message: "go to attendance"');
    
    return new Promise((resolve, reject) => {
        const requestBody = JSON.stringify({
            message: "go to attendance"
        });
        
        console.log('📤 Request Body:', requestBody);
        
        const options = {
            hostname: 'ezilsql.azurewebsites.net',
            port: 443,
            path: '/chat',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };
        
        console.log('📡 Making HTTPS request...');
        
        const req = https.request(options, (res) => {
            console.log('📡 Response Status:', res.statusCode);
            console.log('📡 Response Headers:', res.headers);
            
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const data = JSON.parse(responseData);
                        console.log('✅ ========== SUCCESS ==========');
                        console.log('📥 Full Response:', JSON.stringify(data, null, 2));
                        console.log('📝 Response Message:', data.response);
                        console.log('🔗 Portal URL:', data.portal_url);
                        console.log('🆔 Conversation ID:', data.conversation_id);
                        resolve(data);
                    } catch (parseError) {
                        console.error('❌ JSON Parse Error:', parseError.message);
                        console.error('❌ Raw Response:', responseData);
                        reject(parseError);
                    }
                } else {
                    console.error('❌ API Error Response:', responseData);
                    console.error('❌ Status Code:', res.statusCode);
                    reject(new Error(`API returned ${res.statusCode}: ${responseData}`));
                }
            });
        });
        
        req.on('error', (error) => {
            console.error('❌ ========== ERROR ==========');
            console.error('❌ Network Error:', error.message);
            console.error('❌ Full Error:', error);
            reject(error);
        });
        
        req.write(requestBody);
        req.end();
    });
}

// Run the test
testEZilSQLAPI().catch(console.error);