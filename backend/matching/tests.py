from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


class MatchAPITest(APITestCase):

    # Checks if a user is created correctly.
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@gmail.com",
            password="test123"
        )

        self.client.force_authenticate(user=self.user)

    def test_user_created(self):
        self.assertEqual(self.user.email, "test@gmail.com")

    # Checks if the Match API creates a match successfully
    def test_create_match(self):

        data = {
            "person1": {
                "name": "Rahul",
                "date_of_birth": "2000-01-01",
                "birth_time": "10:30:00",
                "place_of_birth": "Delhi",
                "latitude": 28.6139,
                "longitude": 77.2090,
            },
            "person2": {
                "name": "Anjali",
                "date_of_birth": "2001-02-01",
                "birth_time": "11:30:00",
                "place_of_birth": "Mumbai",
                "latitude": 19.0760,
                "longitude": 72.8777,
            },
        }

        response = self.client.post(
            reverse("match"),
            data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("match_id", response.data)

    # Checks that only authenticated users can access the Match API
    def test_match_requires_authentication(self):
        self.client.force_authenticate(user=None)

        data = {
            "person1": {
                "name": "Rahul",
                "date_of_birth": "2000-01-01",
                "birth_time": "10:30:00",
                "place_of_birth": "Delhi",
                "latitude": 28.6139,
                "longitude": 77.2090,
            },
            "person2": {
                "name": "Anjali",
                "date_of_birth": "2001-02-01",
                "birth_time": "11:30:00",
                "place_of_birth": "Mumbai",
                "latitude": 19.0760,
                "longitude": 72.8777,
            },
        }

        response = self.client.post(
            reverse("match"),
            data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)