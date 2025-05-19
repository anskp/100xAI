from flask import Flask, render_template, request, jsonify
from chatbot import get_response

app = Flask(__name__)
app.static_folder = 'static'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json.get('message', '')
    if not message:
        return jsonify({"error": "Empty message"}), 400
    
    response = get_response(message)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)