import unittest
from unittest.mock import patch

from app import app


class GenerateGuideTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_requires_required_fields(self):
        response = self.client.post("/generate-guide", json={})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json()["success"], False)

    def test_rejects_invalid_usage_frequency(self):
        response = self.client.post(
            "/generate-guide",
            json={
                "customerName": "Alex",
                "equipmentName": "Treadmill",
                "usageFrequency": "Hourly",
                "notes": "Commercial gym",
            },
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json()["success"], False)

    @patch("app.generate_maintenance_guide")
    def test_returns_structured_guide(self, generate_guide):
        generate_guide.return_value = {
            "cleaning": ["Wipe surfaces after use."],
            "maintenance": ["Check fasteners monthly."],
            "safety": ["Stop using damaged equipment."],
            "service": ["Arrange service every six months."],
            "schedule": [{"task": "Clean Surface", "frequency": "Daily"}],
        }

        response = self.client.post(
            "/generate-guide",
            json={
                "customerName": "Alex",
                "equipmentName": "Treadmill",
                "usageFrequency": "Heavy",
                "notes": "Commercial gym",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            {
                "success": True,
                "result": {
                    "cleaning": ["Wipe surfaces after use."],
                    "maintenance": ["Check fasteners monthly."],
                    "safety": ["Stop using damaged equipment."],
                    "service": ["Arrange service every six months."],
                    "schedule": [{"task": "Clean Surface", "frequency": "Daily"}],
                },
            },
        )

        generate_guide.assert_called_once_with(
            "Alex",
            "Treadmill",
            "Heavy",
            "Commercial gym",
        )


if __name__ == "__main__":
    unittest.main()
