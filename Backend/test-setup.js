require('dotenv').config();

console.log('=== Code Reviewer API Setup Test ===\n');

// Check environment variables
console.log('1. Environment Variables:');
if (process.env.GOOGLE_GEMINI_API) {
    console.log('✅ GOOGLE_GEMINI_API is set');
    console.log(`   Key: ${process.env.GOOGLE_GEMINI_API.substring(0, 10)}...`);
} else {
    console.log('❌ GOOGLE_GEMINI_API is NOT set');
    console.log('   Please create a .env file with your API key');
}

console.log(`✅ PORT: ${process.env.PORT || 3000}`);
console.log(`✅ NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

// Test API connectivity
console.log('2. Testing Google AI API connectivity...');

const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GOOGLE_GEMINI_API) {
    console.log('❌ Cannot test API - no API key provided');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function testAPI() {
    try {
        console.log('   Testing with a simple prompt...');
        const result = await model.generateContent("Hello, this is a test.");
        const response = await result.response;
        console.log('✅ API connection successful!');
        console.log(`   Response: ${response.text().substring(0, 50)}...`);
    } catch (error) {
        console.log('❌ API connection failed:');
        console.log(`   Error: ${error.message}`);
        
        if (error.message.includes('fetch failed')) {
            console.log('   This might be a network connectivity issue');
        } else if (error.message.includes('400') || error.message.includes('API_KEY')) {
            console.log('   This might be an invalid API key');
        }
    }
}

testAPI(); 