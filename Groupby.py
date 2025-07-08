import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
# Load the CSV file into a pandas DataFrame
df = pd.read_csv("troop_movements.csv")

# Display the first few rows of the DataFrame
print("DataFrame Head:")
print(df.head())

# Grouped data showing counts of empire vs resistance
empire_resistance_counts = df['empire_or_resistance'].value_counts()
print("\nCounts of Empire vs Resistance:")
print(empire_resistance_counts)

# Grouped data showing counts of characters by homeworld
homeworld_counts = df['homeworld'].value_counts()
print("\nCounts of Characters by Homeworld:")
print(homeworld_counts)

# Grouped data showing counts of characters by unit_type
unit_type_counts = df['unit_type'].value_counts()
print("\nCounts of Characters by Unit Type:")
print(unit_type_counts)

# Engineer a new feature called is_resistance with a True or False value
df['is_resistance'] = df['empire_or_resistance'] == 'resistance'

# Display the first few rows of the DataFrame with the new feature
print("\nDataFrame with 'is_resistance' Feature:")
print(df.head())
# Set the style of the plot
sns.set(style="whitegrid")

# Create a bar plot for empire vs resistance distribution
plt.figure(figsize=(8, 6))
sns.countplot(data=df, x='empire_or_resistance', palette='pastel')

# Add labels and title
plt.xlabel('Side')
plt.ylabel('Count')
plt.title('Distribution of Empire vs Resistance')

# Show the plot
plt.show()