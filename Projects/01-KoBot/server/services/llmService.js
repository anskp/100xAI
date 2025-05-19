import axios from 'axios';

export async function callLLM(message) {
  try {
    // For now, let's return a mock response for testing
    return `This is a mock response to "${message}". In production, this would connect to a local LM Studio instance running Gemma-3-1b-it.`;
    
    // In a real implementation with LM Studio, we would do something like this:
    /*
    const response = await axios.post('http://localhost:1234/v1/chat/completions', {
      model: 'gemma-3-1b-it',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.choices[0].message.content;
    */
  } catch (error) {
    console.error('Error calling LLM:', error);
    throw new Error('Failed to generate response from LLM');
  }
}