// Test academic question to EZilSQL API
const https = require('https');

const API_URL = 'https://ezilsql.azurewebsites.net/chat';
const API_KEY = 'fygewft7gf7fg7igtf327d862';

async function testAcademicQuestion() {
    console.log('🧪 ========== ACADEMIC QUESTION TEST ==========');
    console.log('🔗 Testing URL:', API_URL);
    console.log('📝 Test Message: Academic physics question');
    
    return new Promise((resolve, reject) => {
        const requestBody = JSON.stringify({
            message: "When equal force acts for equal time on two different masses, both will gain: a) Same velocity b) Same acceleration c) Same kinetic energy d) Same momentum",
            conversation_id: "e3b9732f-7659-4d48-b951-827a7ea1b36f" // Use the conversation ID from previous test
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
            
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const data = JSON.parse(responseData);
                        console.log('✅ ========== ACADEMIC RESPONSE SUCCESS ==========');
                        console.log('📥 Full Response:', JSON.stringify(data, null, 2));
                        console.log('📝 Academic Answer:', data.response);
                        console.log('🔗 Portal URL:', data.portal_url);
                        resolve(data);
                    } catch (parseError) {
                        console.error('❌ JSON Parse Error:', parseError.message);
                        console.error('❌ Raw Response:', responseData);
                        reject(parseError);
                    }
                } else {
                    console.error('❌ API Error Response:', responseData);
                    reject(new Error(`API returned ${res.statusCode}: ${responseData}`));
                }
            });
        });
        
        req.on('error', (error) => {
            console.error('❌ Network Error:', error.message);
            reject(error);
        });
        
        req.write(requestBody);
        req.end();
    });
}

// Run the test
testAcademicQuestion().catch(console.error);