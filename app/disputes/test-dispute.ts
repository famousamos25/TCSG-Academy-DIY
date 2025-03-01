import { openai } from '@/lib/openai';

// Test dispute details
const testDispute = {
  creditor_name: "Chase Bank",
  account_number: "XXXX-XXXX-1234",
  amount: 1500,
  dispute_type: "Late Payment",
  bureau: "Experian"
};

// Test the AI analysis
export async function testAIAnalysis() {
  try {
    // Get the user ID (in a real app, this would come from auth)
    const userId = "test-user";
    
    // 1. Analyze the dispute
    const analysis = await openai.analyzeDispute(userId, testDispute);
    console.log('AI Analysis:', analysis);
    
    // 2. Generate a dispute letter
    const letter = await openai.generateDisputeLetter(userId, testDispute);
    console.log('Generated Letter:', letter);
    
    // 3. Test response analysis
    const responseDetails = {
      bureau: "Experian",
      response_type: "Investigation Complete",
      content: "After investigating the information you disputed, we were unable to verify the late payment. This item has been removed from your credit report."
    };
    
    const responseAnalysis = await openai.analyzeResponse(userId, responseDetails);
    console.log('Response Analysis:', responseAnalysis);
    
    return {
      success: true,
      analysis,
      letter,
      responseAnalysis
    };
  } catch (error) {
    console.error('AI Test Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}