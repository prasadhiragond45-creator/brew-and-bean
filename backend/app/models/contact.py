from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field, EmailStr


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Customer full name")
    email: Optional[EmailStr] = Field(None, description="Customer email address")
    phone: Optional[str] = Field(None, description="Phone / WhatsApp number")
    message: str = Field(..., min_length=3, max_length=2000, description="Inquiry or reservation note")


class ContactResponse(BaseModel):
    id: str
    name: str
    message: str
    created_at: datetime
    status: str = "received"

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": "672e1a90f3b92c45e8a11b02",
                "name": "Priya Sharma",
                "message": "Interested in booking a coffee tasting session.",
                "created_at": "2026-11-08T18:30:00Z",
                "status": "received"
            }
        }
    }

