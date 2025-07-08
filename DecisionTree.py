import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt
import pickle

# Load the CSV file into a pandas DataFrame
df = pd.read_csv("troop_movements.csv")

# Convert categorical features to numeric using pd.get_dummies
df_encoded = pd.get_dummies(df, columns=['homeworld', 'unit_type'])

# Define features and target variable
X = df_encoded.drop(columns=['empire_or_resistance', 'timestamp', 'unit_id', 'location_x', 'location_y', 'destination_x', 'destination_y'])
y = df['empire_or_resistance']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Decision Tree Classifier
clf = DecisionTreeClassifier(random_state=42)
clf.fit(X_train, y_train)
#Save the damn model
with open('trained_model.pkl', 'wb') as file:
    pickle.dump(clf, file)

print("Model saved as 'trained_model.pkl'.")

# Predict on the test set
y_pred = clf.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Plot feature importance
feature_importance = clf.feature_importances_
features = X.columns

plt.figure(figsize=(10, 8))
sns.barplot(x=feature_importance, y=features, palette='viridis')
plt.title('Feature Importance')
plt.xlabel('Importance')
plt.ylabel('Feature')
plt.show()

# Create a pandas DataFrame for feature importance
feature_importance_df = pd.DataFrame({
    'Feature': features,
    'Importance': feature_importance
})
# Sort the DataFrame by importance in descending order
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)

# Display the DataFrame
print(feature_importance_df)
