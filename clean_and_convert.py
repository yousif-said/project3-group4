import pandas as pd

# Load the data
csv_file = "troop_movements_1m.csv"
df = pd.read_csv(csv_file)

# Replace 'invalid_unit' with 'unknown'
df['unit_type'] = df['unit_type'].replace('invalid_unit', 'unknown')

# Forward-fill missing location_x and location_y
df[['location_x', 'location_y']] = df[['location_x', 'location_y']].ffill()

# Save as Parquet file
parquet_file = "troop_movements_1m.parquet"

# You can use either engine; pyarrow is preferred
df.to_parquet(parquet_file, engine='pyarrow', index=False)

print(f"Cleaned data saved to {parquet_file}")