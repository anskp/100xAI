import re
import random

# Define patterns and responses
patterns = [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey! How can I help you today?']),
    (r'how are you', ['I\'m doing well, thanks for asking!', 'I\'m good! How about you?', 'Great! What can I do for you?']),
    (r'your name', ['I\'m Simple Chatbot!', 'You can call me Bot.', 'I\'m a simple rule-based chatbot.']),
    (r'bye|goodbye', ['Goodbye!', 'See you later!', 'Have a great day!']),
    (r'thanks|thank you', ['You\'re welcome!', 'No problem!', 'Glad I could help!']),
    (r'help|can you help', ['I can help answer simple questions. What do you need?', 'I\'m here to assist you!', 'Sure, what do you need help with?']),
    (r'what (can|do) you do', ['I can chat with you and answer simple questions.', 'I\'m a simple chatbot that can respond to basic queries.', 'I can provide information and have simple conversations.']),
    (r'weather', ['I can\'t check the weather, but I hope it\'s nice outside!', 'Sorry, I don\'t have access to weather data.', 'I wish I could tell you about the weather, but I don\'t have that capability.']),
    (r'time', ['I don\'t know the current time, sorry!', 'I don\'t have access to the current time.', 'Sorry, I can\'t tell you the time.']),
    (r'joke', ['Why don\'t scientists trust atoms? Because they make up everything!', 
               'Why did the scarecrow win an award? Because he was outstanding in his field!',
               'What do you call a fake noodle? An impasta!']),
    (r'who (created|made) you', ['I was created as a simple project for learning purposes.', 'I\'m a basic chatbot created for a programming exercise.', 'I was built as a demonstration of pattern matching in Python.']),
]

# Fallback responses
fallbacks = [
    "I'm not sure what you mean.",
    "Could you rephrase that?",
    "I don't understand that yet.",
    "I'm still learning and don't know how to respond to that.",
    "Interesting, but I'm not sure how to respond."
]

def get_response(user_input):
    """
    Generate a response based on the user's input
    """
    user_input = user_input.lower()
    
    # Check for pattern matches
    for pattern, responses in patterns:
        if re.search(pattern, user_input):
            return random.choice(responses)
    
    # If no match, return a fallback response
    return random.choice(fallbacks)