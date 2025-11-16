# Talent Directory App

A full-stack app to manage talent profiles.

---

## Setup & Run

1. **Clone Repo**  
```bash
git clone https://github.com/dakshg393/talentDirectory.git
```

2.Backend
Backend (.env):``` PORT=5000 MONGO_URI=your_mongodb_uri_here```

```
cd backend
npm install
npm run dev
```

3.Frontend

Frontend (.env):
 ```VITE_SERVER_URL=http://localhost:5000/api```
```
cd frontend
npm install
npm run dev
```