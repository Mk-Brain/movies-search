# CinéExplorer 🎬

CinéExplorer est une application web moderne de recherche et d'exploration de films exploitant l'API **The Movie Database (TMDB)**. L'application propose un carrousel immersif avec effet Ken Burns, une recherche intelligente avec *debouncing*, et des fiches détaillées sous forme de modales élégantes (*glassmorphism*).

---

## 🚀 Fonctionnalités

* **Carrousel Hero Immersif :** Affichage plein écran des films populaires avec animation Ken Burns.
* **Recherche en Temps Réel :** Recherche intelligente de films avec gestion de *debouncing* pour optimiser les appels API.
* **Fiche Détaillée (Modal) :**
  * Informations complètes : titre original, langue originale, pays de production, synopsis, note moyenne et durée.
  * Affichage du casting principal avec avatars dynamiques et rôle des acteurs.
  * Réalisateur et genres.
  * Bouton d'accès direct à la **bande-annonce YouTube**.
*

---

## 🛠️ Stack Technique

### **Frontend**
* **Framework :** React 18 (TypeScript) + Vite
* **State Management :** Redux Toolkit
* **Styles :** Tailwind CSS
* **Icons :** Material UI Icons 
* **Client HTTP :** Axios

### **Backend**
* **Framework :** FastAPI (Python 3.12)
* **ORM & Base de données :** SQLAlchemy + SQLite (avec `uvicorn`)
* **Client HTTP Asynchrone :** `httpx` (pour la consommation de l'API TMDB)
* **API Externe :** TMDB API (v3)

---

## 📁 Arborescence du Projet

```text
cinéexplorer/
├── backend/
│   ├── main.py              # Application FastAPI & endpoints
│   ├── database        # Configuration SQLAlchemy & SQLite
│   ├── model           # Modèles de base de données
|   ├── fonctions            # fonctions de traitement en arrière plan
│   ├── requirements.txt     # Dépendances Python
│   └── .env                 # Variables d'environnement Backend
│
└── frontend/
    ├── src/
    │   ├── assets/          
    │   ├── pages/           # insterfaces de l'app
    │   ├── hooks/           # hooks personalisé
    │   ├── components/      # Hero, MovieCard, MovieModal, MovieGrid, etc.
    │   ├── models/          # Types & Interfaces TypeScript (Movie, etc.)
    │   ├── store/           # Store Redux Toolkit
    │   ├── slice/           # Slices Redux Toolkit
    │   └── utils.tsx        
    │   └── App.tsx          # Composant racine
    ├── package.json
    └── .env                 # Variables d'environnement Frontend
```

---

## ⚙️ Installation et Configuration

### **Prérequis**

* **Node.js** (v18 ou supérieur)
* **Python** (v3.10 ou supérieur)
* Une clé d'API gratuite **TMDB** ([Obtenir une clé TMDB](https://developer.themoviedb.org/docs/getting-started))

---

### **1. Configuration du Backend (FastAPI)**

1. Naviguez dans le dossier du backend :

```bash
cd backend
```

2. Créez et activez un environnement virtuel Python :

```bash
python -m venv .venv
source .venv/bin/activate  # Sur Linux/macOS
# .venv\Scripts\activate   # Sur Windows
```

3. Installez les dépendances :

```bash
pip install -r requirements.txt
```

4. Créez un fichier `.env` à la racine du dossier `backend` :

```env
TMDB_API_KEY=votre_cle_api_tmdb_ici
DATABASE_URL="sqlite:///./movie.db"
```

5. Lancez le serveur de développement :

```bash
uvicorn main:app --reload
```

*Le serveur démarrera sur `http://localhost:8000` (Documentation Swagger accessible sur `http://localhost:8000/docs`).*

---

### **2. Configuration du Frontend (React + Vite)**

1. Naviguez dans le dossier du frontend :

```bash
cd frontend
```

2. Installez les dépendances npm :

```bash
npm install
```

3. Créez un fichier `.env` à la racine du dossier `frontend` :

```env
VITE_API_URL=http://localhost:8000
```

4. Lancez le serveur de développement React :

```bash
npm run dev
```

*L'application sera accessible sur `http://localhost:5173`.*

---

## 📡 Endpoints de l'API Backend

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/movies/popular` | Récupère la liste des films populaires stockés/rafraîchis. |
| `POST` | `/movies/refresh-now` | Force la mise à jour des films populaires depuis TMDB. |
| `GET` | `/movies/search?query={texte}` | Effectue une recherche de films via TMDB. |
| `GET` | `/movies/{id}/trailer` | Récupère le lien de la bande-annonce YouTube du film. |

---