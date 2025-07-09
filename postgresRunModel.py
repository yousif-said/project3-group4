import pandas as pd
import pickle
from sqlalchemy import create_engine

# Load the model from the pickle file
with open('trained_model.pkl', 'rb') as file:
    clf = pickle.load(file)

# Define your connection parameters
username = "project"
password = "wasadmin"
host = "18.191.130.184"  # This could be an IP address
port = "5432"  # Default PostgreSQL port
database_name = "team_D"

# Create a connection string
connection_string = f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database_name}"

# Create a SQLAlchemy engine
engine = create_engine(connection_string)

# Load the data from the PostgreSQL table into a DataFrame
query = "SELECT * FROM troop_movements_1m"
df = pd.read_sql(query, engine)

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
