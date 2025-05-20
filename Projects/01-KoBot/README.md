# 🤖 KoBot

<div align="center">
  <h3>A simple chatbot interface for the Gemma 3-1B model using LM studio Locally</h3>
</div>

## 📝 Description

KoBot is a conversational AI chatbot that connects to the Gemma 3-1B model running in LM Studio. It provides a clean, intuitive web interface for interacting with the model, with conversation history and mobile-responsive design.

## ✨ Features

- 🔄 Maintains conversation history throughout the session
- 🔄 Reset button to clear conversation
- 📱 Mobile-responsive design
- 🔧 Configurable model and API settings

## 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🧰 Prerequisites

- Python 3.8 or higher
- LM Studio installed and running with the Gemma-3-1b-it model
- LM Studio server running on http://127.0.0.1:1234 (configurable)

## 🚀 Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/anskp/100xAI.git
cd 100xAI/Projects/01-KoBot
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure the `.env` file:
```
MODEL_NAME=gemma-3-1b-it
API_URL=http://127.0.0.1:1234
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and navigate to http://localhost:5000

## 💻 Usage

1. Ensure LM Studio is running with the Gemma model loaded
2. Type a message in the input field and press Enter or click Send
3. The model will respond in the chat window
4. To reset the conversation, click the Reset Chat button

## 🧠 How It Works

The application consists of:
1. A Flask server handling the web interface and API endpoints
2. A client class communicating with the LM Studio API
3. A simple web interface built with HTML, CSS, and JavaScript

When you send a message:
1. It's sent to the Flask server
2. The server adds it to the conversation history
3. The server sends the conversation to the LM Studio API
4. The API returns the model's response
5. The response is displayed in the chat interface

## 📸 Screenshots

![Screenshot 2025-05-21 010642](https://github.com/user-attachments/assets/1c9cc96f-8ab7-46bd-a49e-2b92f01995c1)

![image](https://github.com/user-attachments/assets/31a365a8-a24a-49a7-b662-cceb2ce6f624)


## 🤝 Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>⭐ If you find this project helpful, please consider giving it a star! ⭐</p>
  <p>Check out my other projects in the <a href="https://github.com/anskp/100xAI">100xAI</a> repository.</p>
</div>
