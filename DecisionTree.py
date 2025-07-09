import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, roc_curve, auc, precision_recall_curve
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

# Save the model
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

# Calculate probabilities for ROC and Precision-Recall curves
y_prob = clf.predict_proba(X_test)[:, 1]

# ROC Curve
fpr, tpr, _ = roc_curve(y_test, y_prob, pos_label=clf.classes_[1])
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (area = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend(loc="lower right")
plt.show()

# Precision-Recall Curve
precision, recall, _ = precision_recall_curve(y_test, y_prob, pos_label=clf.classes_[1])

plt.figure(figsize=(8, 6))
plt.plot(recall, precision, color='blue', lw=2)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.show()
