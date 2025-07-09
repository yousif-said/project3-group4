import pytest
from app import app 
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client: #test version of app to simulate requests
        yield client #yields it to the test functions, and ensures proper cleanup afterward

def test_predict_endpoint(client):
    sample_input = {
        "homeworld": "Tatooine",
        "unitType": "stormtrooper"
    }

    response = client.post('/predict', data=json.dumps(sample_input),
                           content_type='application/json')

    assert response.status_code == 200

    data = response.get_json()
    assert "input" in data
    assert "prediction" in data
    assert "outcome" in data["prediction"]
    assert data["input"]["homeworld"] == "Tatooine"
    assert data["input"]["unitType"] == "stormtrooper"

def test_feature_importance_endpoint(client):
    response = client.get('/feature-importance')

    assert response.status_code == 200

    data = response.get_json()
    assert isinstance(data, list) #ensure response is a list of dictionaries
    assert all("name" in f and "importance" in f for f in data) #check that each dictionary contains name and importance keys
