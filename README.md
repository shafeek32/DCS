# Decision Companion System

A production-quality MERN stack application designed to help users make objective, mathematically-backed decisions using the **Weighted Scoring Model (WSM)**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)

## 🚀 Key Features

*   **Weighted Scoring Model**: Assign importance to different criteria (e.g., Cost vs. Quality) to calculate a weighted score.
*   **Transparent Explanation Engine**: The system doesn't just give you a "winner"; it generates a human-readable paragraph explaining *why* an option won (e.g., "X won because it scored highest in Cost, which you rated as most important").
*   **Dynamic Decision Wizard**: A multi-step form to guide you through structuring your decision.
*   **Real-time Workspace**: Add options, adjust scores, and see rankings update instantly.
*   **Clean Architecture**: Separation of concerns with a dedicated Service Layer for business logic.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, React Hook Form.
*   **Backend**: Node.js, Express, MongoDB (Mongoose).
*   **Architecture**: Logic separated into `controllers`, `services`, and `models`.

## 📂 Project Structure

```
root
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views (Home, Create, Workspace)
│   │   ├── services/    # API integration
│   │   └── hooks/       # Logic encapsulation
├── server/          # Node Backend
│   ├── src/
│   │   ├── config/      # Database setup
│   │   ├── controllers/ # HTTP Request Handlers
│   │   ├── models/      # Mongoose Schemas (Decision, Option)
│   │   ├── routes/      # API Endpoints
│   │   ├── services/    # Business Logic (WSM Algorithm)
│   │   └── utils/       # Validation (Joi)
```

## 🔧 Installation & Setup

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas URI)

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file
echo "MONGO_URI=mongodb://localhost:27017/decision-companion" > .env
echo "PORT=5000" >> .env
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🧠 Algorithmic Transparency

The core of this system is the **Weighted Scoring Model (WSM)**.

`Score = Σ (Criterion Weight × Option Rating)`

The **Explanation Service** (`server/src/services/evaluation.service.js`) analyzes the data to produce insights:
1.  Identifies the winner based on total weighted score.
2.  Finds the criterion that contributed most to the winner's score.
3.  Compares the winner to the runner-up to highlight the decisive factor.

## 📝 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/decisions` | Create a new decision basics |
| `GET` | `/api/decisions/:id` | Get full decision details |
| `PUT` | `/api/decisions/:id` | Update options or scores |
| `POST` | `/api/decisions/:id/evaluate` | Run WSM and get explanation |

---
*Built with ❤️ for rational decision making.*
