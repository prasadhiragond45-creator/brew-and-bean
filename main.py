import sys
import os

# Ensure backend directory is in sys.path so backend/app modules resolve cleanly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

from backend.main import app

if __name__ == "__main__":
    import uvicorn
    from backend.app.core.config import settings
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)

