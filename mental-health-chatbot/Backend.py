from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests

# Load your fine-tuned LLM model
model = pipeline("text2text-generation", model="path/to/your/fine-tuned-model")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Generate response using the model
    response = model(user_message)
    bot_message = response[0]["generated_text"]
    
    return jsonify({"response": bot_message})

if __name__ == "__main__":
    app.run(debug=True)