import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Brew & Bean Café API"
    API_PREFIX: str = "/api"
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "brew_and_bean"
    # Comma-separated allowed origins or "*"
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", "8000"))

    @property
    def cors_origins_list(self) -> List[str]:
        if self.CORS_ORIGINS.strip() == "*":
            return ["*"]
        origins = [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        return origins if origins else ["*"]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
