from datetime import datetime, timezone
from fastapi import APIRouter, status, HTTPException
from app.core.database import get_database
from app.models.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post(
    "",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit contact inquiry",
    description="Submit customer inquiry, table query, or feedback."
)
async def submit_contact(contact: ContactCreate):
    db = get_database()
    now = datetime.now(timezone.utc)
    doc = {
        "name": contact.name,
        "email": contact.email,
        "phone": contact.phone,
        "message": contact.message,
        "created_at": now,
        "status": "received"
    }

    if db is not None:
        try:
            result = await db.contacts.insert_one(doc)
            return ContactResponse(
                id=str(result.inserted_id),
                name=contact.name,
                message=contact.message,
                created_at=now,
                status="received"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to store contact submission: {str(e)}"
            )

    # Fallback response if database is in offline mode
    return ContactResponse(
        id="offline-mock-id",
        name=contact.name,
        message=contact.message,
        created_at=now,
        status="received"
    )

