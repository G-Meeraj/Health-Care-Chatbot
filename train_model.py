import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
data = pd.read_csv('symbipredict_2022 (1).csv')

# Prepare data
X = data.iloc[:, :-1]
y = data['diseases']

# Save symptoms list
symptoms = X.columns.tolist()
joblib.dump(symptoms, 'model/symptoms.pkl')

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# Save model
joblib.dump(model, 'model/disease_predictor.pkl')