const aiService = require('../Services/ai.services');

 

module.exports.getReview = async (req,res)=>{
    const code =req.body.code;
    
    if(!code){
        return res.status(400).send("Prompt is required");
    }
    
    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("Error calling aiService:", error);
        res.status(500).send("Error processing the request");
    }
    
}