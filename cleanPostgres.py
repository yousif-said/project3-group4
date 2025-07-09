import pandas as pd
from sqlalchemy import create_engine

# Load the data
csv_file = "troop_movements_1m.csv"
df = pd.read_csv(csv_file)


# Replace 'invalid_unit' with 'unknown'
df['unit_type'] = df['unit_type'].replace('invalid_unit', 'unknown')

# Forward-fill missing location_x and location_y
df[['location_x', 'location_y']] = df[['location_x', 'location_y']].ffill()

# Define your connection parameters
url = "18.191.130.184"
user = "project"
password = "wasadmin"
database = "team_D"

# Create a connection string
connection_string = f"postgresql+psycopg2://{user}:{password}@{url}/{database}"

# Create a SQLAlchemy engine
engine = create_engine(connection_string)

# Upload the DataFrame to PostgreSQL
table_name = "troop_movements_1m"
try:
    df.to_sql(table_name, engine, if_exists='replace', index=False)
    print(f"Data uploaded to PostgreSQL table '{table_name}' successfully")
except Exception as e:
    print(f"Error uploading data to PostgreSQL: {e}")
