from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import google.auth.transport.requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import pathlib
import os
import google.generativeai as genai
import joblib
import numpy as np
import pandas as pd
import pickle
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv('SECRET_KEY', 'fallback_secret_key')
# Load the machine learning model
model = joblib.load('model/disease_predictor.pkl')
symptoms = joblib.load('model/symptoms.pkl')


# Load chatbot data
try:
    with open("model/chatbot_data.pkl", "rb") as f:
        chatbot_data = pickle.load(f)
except Exception as e:
    print(f"[ERROR] Failed to load chatbot data: {e}")
    chatbot_data = {}

genai.configure(api_key="AIzaSyAoAJChoHZSz2nC4rwdlwPDM92hyV_dZTk")  
models = genai.list_models()
for model in models:
    print(model.name)
    
def is_health_related(query):
    """Check if the query contains health-related keywords."""
    query = query.lower()
    health_keywords = [
        "cancer", "diabetes", "hypertension", "asthma", "arthritis", "tuberculosis", "influenza",
        "pneumonia", "migraine", "epilepsy", "depression", "anxiety", "heart disease", "stroke",
        "covid-19", "allergy", "malaria", "dengue", "cholera", "hepatitis", "kidney disease",
        "fever", "cough", "headache", "nausea", "vomiting", "diarrhea", "treatment", "medicine",
        "doctor", "infection", "therapy", "diagnosis", "vaccination", "surgery", "prescription",
        "Emergency Medicine","Preventive Healthcare"," Holistic Health"," Health Education",
        "Medical News","Pharmaceuticals","Medical Devices",
        "Medical Supplies","Health Insurance","Medical Billing","Rehabilitation","Palliative Care",
        "Substance Abuse","Public Health","Global Health",
        "Research","Clinical Trials","Evidence-Based Medicine","Continuing Medical Education",
        "Medical Professionals","Doctors","Nurses","Physicians","Therapists","Healthcare Providers", 
        "Clinics","Hospitals","Labs","Pharmacies","Rehabilitation Centers","Skilled Nursing Facilities", 
        "Home Healthcare","Long-Term Care","End-of-Life Care","Disability","Chronic Diseases",
        "Infectious Diseases","Mental Health Disorders","Substance Abuse Disorders","Genetic Diseases",
        "Rare Diseases","Cancer","Diabetes","Heart Disease","Stroke", "Alzheimers Disease", "Parkinson's Disease","Multiple Sclerosis",
        "Arthritis","Asthma","Allergies","Obesity","Smoking","Alcohol Abuse","Drug Abuse","Nutrition",
        "Exercise","Sleep","Stress Management","Well-being","Healthy Lifestyle","Healthy Eating","Physical Activity",
        "Stress Reduction","Mindfulness","Meditation","Yoga","Chiropractic","Acupuncture","Alternative Medicine","Complementary Medicine",
        "Integrative Medicine","Wellness Programs","Health Coaching","Fitness","Nutrition","Weight Management","Mental Health",
        "Well-being","Healthy Lifestyle","Healthy Eating","cold" 
    ]
    return any(keyword in query for keyword in health_keywords)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message', "").strip().lower()
    print(f"[DEBUG] User input received: {user_input}")

    if not is_health_related(user_input):
        bot_response = "This chatbot is for health-related queries only."
        return jsonify({"response": bot_response})

    try:
        response = chatbot_data.get(user_input)
        if not response:
            model = genai.GenerativeModel("gemini-1.5-pro")
            response = model.generate_content(f"Provide a short medical response: {user_input}").text
        return jsonify({"response": response})
    except Exception as e:
        print(f"[ERROR] Chatbot error: {e}")
        return jsonify({"response": "Sorry, I couldn't process that. Please try again."})



# Dummy user credentials (replace with database authentication)
USER_CREDENTIALS = {"user@example.com": "password123"}


@app.route('/')
def home():
    if 'user' in session:
        return render_template('index.html', symptoms=symptoms, logged_in=True, user=session['user'])
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if email in USER_CREDENTIALS and USER_CREDENTIALS[email] == password:
            session['user'] = email
            return redirect(url_for('home'))  # Redirect to index.html after login
        else:
            return render_template('login.html', error="Invalid credentials")

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        # Check if email already exists
        if email in USER_CREDENTIALS:
            return render_template('signup.html', error="Email already registered!")

        # Save the user (in-memory for now, replace with a database in production)
        USER_CREDENTIALS[email] = password

        session['user'] = email  # Auto-login after signup
        return redirect(url_for('home'))

    return render_template('signup.html')




# Add these dictionaries to app.py
symptom_descriptions = {
    'itching': 'An uncomfortable sensation that provokes the desire to scratch.',
    'skin_rash': 'A change in the skin which affects its color, appearance, or texture.',
    # Add descriptions for all symptoms...
}

diet_recommendations = {
    'Fungal Infection': {
        'description': 'Fungal infections are common and can affect various parts of the body.',
        'diet': [
            'Consume probiotic-rich foods like yogurt',
            'Increase garlic intake (natural antifungal)',
            'Eat foods rich in vitamin C',
            'Avoid sugar and refined carbohydrates'
        ]
    },
    'Allergy': {
        'description': 'Allergies occur when your immune system reacts to a foreign substance.',
        'diet': [
            'Include anti-inflammatory foods like turmeric and ginger',
            'Eat foods rich in omega-3 fatty acids',
            'Consume local honey (may help with seasonal allergies)',
            'Avoid known allergens and processed foods'
        ]
    },
    # Add recommendations for all diseases...
}
# Example symptom descriptions
symptom_descriptions = {
    'itching': 'An uncomfortable sensation that provokes the desire to scratch.',
    'skin_rash': 'A change in the skin which affects its color, appearance, or texture.',
    'nodal_skin_eruptions': 'Swollen lymph nodes with skin eruptions.',
    'continuous_sneezing': 'Repeated sneezing without apparent cause.',
    'shivering': 'Body shaking due to cold or fever.',
    # Add all other symptoms...
}

# Example diet recommendations
diet_recommendations = {
    'Fungal Infection': {
        'description': 'Fungal infections are common and can affect various parts of the body.',
        'diet': [
            'Consume probiotic-rich foods like yogurt',
            'Increase garlic intake (natural antifungal)',
            'Eat foods rich in vitamin C',
            'Avoid sugar and refined carbohydrates'
        ]
    },
    'Allergy': {
        'description': 'Allergies occur when your immune system reacts to a foreign substance.',
        'diet': [
            'Include anti-inflammatory foods like turmeric and ginger',
            'Eat foods rich in omega-3 fatty acids',
            'Consume local honey (may help with seasonal allergies)',
            'Avoid known allergens and processed foods'
        ]
    },
    'GERD': {
        'description': 'Gastroesophageal reflux disease (GERD) occurs when stomach acid flows back into the esophagus.',
        'diet': [
            'Eat smaller, more frequent meals',
            'Avoid spicy, fatty, or acidic foods',
            'Include high-fiber foods',
            'Stay upright after eating',
            'Avoid caffeine and alcohol'
        ]
    },
    # Add all other diseases...
}
# Modify the predict route

import traceback  # Add this at the top

@app.route('/predict', methods=['POST'])
def predict():
    selected = request.form.getlist('symptoms')
    input_data = np.zeros(len(symptoms))
    
    # Get selected symptom descriptions
    selected_symptoms_desc = {s: symptom_descriptions.get(s, 'No description available') 
                            for s in selected}
    
    for symptom in selected:
        if symptom in symptoms:
            index = symptoms.index(symptom)
            input_data[index] = 1
            
    prediction = model.predict([input_data])[0]
    
    # Get diet recommendations
    diet_info = diet_recommendations.get(prediction, {
        'description': 'No specific information available',
        'diet': ['Maintain a balanced diet', 'Stay hydrated']
    })
        
    return render_template('index.html',
                       prediction=prediction,
                       symptoms=selected_symptoms_desc or {},
                       diet_info=diet_info)    
if __name__ == '__main__':
    app.run(debug=True)