import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings

logger = logging.getLogger("uvicorn.error")

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

db_instance = Database()

async def connect_to_mongo():
    logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
    db_instance.client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        serverSelectionTimeoutMS=3000
    )
    db_instance.db = db_instance.client[settings.DATABASE_NAME]
    try:
        # Ping the server to verify connection
        await db_instance.client.admin.command('ping')
        logger.info(f"Connected to MongoDB successfully! Database: {settings.DATABASE_NAME}")
    except Exception as e:
        logger.warning(f"Could not connect to MongoDB: {e}. Fallbacks will be utilized.")

async def close_mongo_connection():
    if db_instance.client is not None:
        logger.info("Closing MongoDB connection...")
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_database() -> Optional[AsyncIOMotorDatabase]:
    return db_instance.db

