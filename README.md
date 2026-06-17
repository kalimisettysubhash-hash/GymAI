# GymAI - AI Gym Equipment Maintenance Generator

GymAI is a full-stack AI web application that generates structured maintenance guides for gym equipment. Users enter customer details, equipment name, usage frequency, and notes. The Flask backend uses Google Gemini through the `google-genai` SDK to return validated JSON, and ReportLab generates downloadable PDF guides.

## Tech Stack

- Frontend: React, Vite, React Router DOM
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: React Icons
- Backend: Python Flask
- AI: Google Gemini API with `google-genai`
- PDF: ReportLab
- Storage: Browser `localStorage` for guide history

## Project Structure

```text
gym-maintenance-ai/
  Backend/
    app.py
    gemini_service.py
    pdf_service.py
    requirements.txt
    .env.example
  public/
  src/
    components/
      Footer.jsx
      GeneratorForm.jsx
      Hero.jsx
      Navbar.jsx
      OutputCard.jsx
      PageWrapper.jsx
      ScrollToHash.jsx
      StatsSection.jsx
      Features.jsx
    pages/
      About.jsx
      Generator.jsx
      History.jsx
      Home.jsx
      NotFound.jsx
    App.jsx
    index.css
    main.jsx
  .env.example
  package.json
  tailwind.config.js
  vite.config.js
  requirements.txt
```

## Backend API

`GET /`

```json
{
  "success": true,
  "message": "Gym Maintenance AI backend is running"
}
```

`POST /generate-guide`

Request:

```json
{
  "customerName": "FitZone",
  "equipmentName": "Commercial Treadmill",
  "usageFrequency": "Heavy",
  "notes": "Used during peak evening hours"
}
```

Response:

```json
{
  "success": true,
  "result": {
    "cleaning": [],
    "maintenance": [],
    "safety": [],
    "service": []
  }
}
```

`POST /generate-pdf`

Accepts a generated guide object and returns a downloadable PDF file.

## Local Installation

1. Install frontend dependencies.

```bash
npm install
```

2. Create frontend environment file.

```bash
cp .env.example .env
```

3. Create and activate a Python virtual environment.

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

4. Create backend environment file.

```bash
copy .env.example .env
```

Set `GEMINI_API_KEY` in `Backend/.env`.

5. Start the backend.

```bash
python app.py
```

6. Start the frontend in another terminal.

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:5000`.

## Deployment

### Render Backend

1. Create a new Render Web Service.
2. Set the root directory to `Backend`.
3. Build command:

```bash
pip install -r requirements.txt
```

4. Start command:

```bash
gunicorn app:app
```

5. Add environment variable:

```text
GEMINI_API_KEY=your_google_gemini_api_key_here
```

6. Copy the deployed Render URL.

### Vercel Frontend

1. Import the repository into Vercel.
2. Use the project root as the frontend root.
3. Build command:

```bash
npm run build
```

4. Output directory:

```text
dist
```

5. Add environment variable:

```text
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

6. Redeploy after setting the environment variable.

## Pages

- Home: premium hero, animated sample guide, features, stats, footer
- AI Guide Generator: form, loading state, success animation, AI output, PDF download
- Guide History: locally saved guide cards with equipment, usage frequency, and generated date
- About Project: overview, objectives, and technology stack
