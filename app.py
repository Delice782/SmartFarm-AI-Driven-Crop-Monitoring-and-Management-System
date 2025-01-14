 from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load pre-trained model
with open('model/crop_health_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return "SmartFarm API is running."

@app.route('/predict', methods=['POST'])
def predict_crop_health():
    data = request.get_json()
    soil_moisture = data['soil_moisture']
    temperature = data['temperature']
    crop_image = data['crop_image']  # placeholder for image processing input
    # Make prediction (based on soil moisture, temperature, etc.)
    features = np.array([[soil_moisture, temperature]])  # example
    health_status = model.predict(features)
    return jsonify({'health_status': health_status[0]})

if __name__ == '__main__':
    app.run(debug=True)
