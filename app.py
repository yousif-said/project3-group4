from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load model
with open('trained_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])

    # Convert to dummies and align with training features
    df_encoded = pd.get_dummies(df)
    df_encoded = df_encoded.reindex(columns=model.feature_names_in_, fill_value=0)

    prediction = model.predict(df_encoded)[0]
    return jsonify({"prediction": prediction})

@app.route('/feature-importance', methods=['GET'])
def feature_importance():
    importances = model.feature_importances_
    features = model.feature_names_in_
    result = [
        {"feature": feature, "importance": float(importance)}
        for feature, importance in zip(features, importances)
    ]
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
