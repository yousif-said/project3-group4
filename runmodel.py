import pandas as pd
import pickle

# Load the model from the pickle file
with open('trained_model.pkl', 'rb') as file:
    clf = pickle.load(file)

# Load the data from the Parquet file into a DataFrame
df = pd.read_parquet('troop_movements_1m.parquet')

# Assuming 'homeworld' and 'unit_type' are the features used for prediction
df_encoded = pd.get_dummies(df, columns=['homeworld', 'unit_type'])


expected_features = clf.feature_names_in_  # Use the feature names from the model

# Add missing columns with zeros
for col in expected_features:
    if col not in df_encoded.columns:
        df_encoded[col] = 0

# Remove extra columns not used during training
df_encoded = df_encoded[expected_features]

# Ensure all column names are strings
df_encoded.columns = df_encoded.columns.astype(str)

# Run predictions using the loaded model
predictions = clf.predict(df_encoded)

# Add the predicted values to the DataFrame
df['predicted_empire_or_resistance'] = predictions

# Display the updated DataFrame
print(df.head())
