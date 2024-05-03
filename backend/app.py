from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


OLLAMA_MISTRAL_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.json
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({'error': 'Missing prompt'}), 400

        payload = {
            'model': MODEL_NAME,
            'prompt': prompt
        }

        response = requests.post(OLLAMA_MISTRAL_API_URL, json=payload, stream=True)

        if response.status_code != 200:
            return jsonify({'error': f'API request failed with status code {response.status_code}'}), 500

        # Combine all responses into a single string
        combined_response = ''
        for line in response.iter_lines():
            if line:
                response_data = json.loads(line)
                combined_response += response_data['response'] + ' '

        return jsonify({'response': combined_response.strip()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)




