from typing import Optional
from pydantic import BaseModel, Field


class MenuItemBase(BaseModel):
    category: str = Field(..., description="Category: Espresso, Pour Over, Cold Brew, Tea & More")
    name: str = Field(..., min_length=2, max_length=100)
    desc: str = Field(..., description="Flavor notes or culinary description")
    price: str = Field(..., description="Display price e.g. ₹220")
    tag: Optional[str] = Field(None, description="Optional badge like Bestseller, Signature, New, Rare")
    img: str = Field(..., description="High-resolution image URL")


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemResponse(MenuItemBase):
    id: Optional[str] = Field(None, description="MongoDB document id")

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": "672e1a90f3b92c45e8a11b01",
                "category": "Espresso",
                "name": "Single Origin Espresso",
                "desc": "Ethiopian Yirgacheffe, citrus & floral notes",
                "price": "₹220",
                "tag": "Bestseller",
                "img": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80&fit=crop"
            }
        }
    }

