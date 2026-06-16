import unittest
from unittest.mock import patch

from app import app


class GenerateGuideTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_requires_equipment_and_usage(self):
        response = self.client.post("/generate-guide", json={})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json()["success"], False)

    @patch("app.generate_maintenance_guide")
    def test_returns_structured_guide(self, generate_guide):
        generate_guide.return_value = {
            "cleaning": ["Wipe surfaces after use."],
            "maintenance": ["Check fasteners monthly."],
            "safety": ["Stop using damaged equipment."],
            "service": ["Arrange service every six months."]
        }

        response = self.client.post(
            "/generate-guide",
            json={
                "customerName": "Alex",
                "equipmentName": "Treadmill",
                "usageFrequency": "Daily",
                "notes": "Commercial gym"
            }
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            {
                "success": True,
                "customerName": "Alex",
                "equipment": "Treadmill",
                "usageFrequency": "Daily",
                "notes": "Commercial gym",
                "cleaning": ["Wipe surfaces after use."],
                "maintenance": ["Check fasteners monthly."],
                "safety": ["Stop using damaged equipment."],
                "service": ["Arrange service every six months."]
            }
        )


if __name__ == "__main__":
    unittest.main()
