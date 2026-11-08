import logging
from typing import List, Optional
from app.core.database import get_database
from app.models.menu import MenuItemCreate, MenuItemResponse
from app.utils.serializers import serialize_doc

logger = logging.getLogger("uvicorn.error")

DEFAULT_MENU_ITEMS = [
    # Espresso
    {
        "category": "Espresso",
        "name": "Single Origin Espresso",
        "desc": "Ethiopian Yirgacheffe, citrus & floral notes",
        "price": "₹220",
        "tag": "Bestseller",
        "img": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80&fit=crop"
    },
    {
        "category": "Espresso",
        "name": "Flat White",
        "desc": "Double ristretto with velvety micro-foam",
        "price": "₹280",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=500&q=80&fit=crop"
    },
    {
        "category": "Espresso",
        "name": "Cortado",
        "desc": "Equal parts espresso and warm milk",
        "price": "₹260",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1542312594-641a1d9a4d63?w=500&q=80&fit=crop"
    },
    {
        "category": "Espresso",
        "name": "Piccolo Latte",
        "desc": "Single ristretto with steamed milk",
        "price": "₹250",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=500&q=80&fit=crop"
    },
    {
        "category": "Espresso",
        "name": "Macchiato",
        "desc": "Espresso marked with a touch of foam",
        "price": "₹230",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80&fit=crop"
    },
    {
        "category": "Espresso",
        "name": "Americano",
        "desc": "Double shot with filtered hot water",
        "price": "₹200",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1545665277-5937489579f2?w=500&q=80&fit=crop"
    },
    # Pour Over
    {
        "category": "Pour Over",
        "name": "V60 Pour Over",
        "desc": "Colombian Huila, red fruit & brown sugar",
        "price": "₹320",
        "tag": "Signature",
        "img": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80&fit=crop"
    },
    {
        "category": "Pour Over",
        "name": "Chemex",
        "desc": "Guatemalan Antigua, chocolate & citrus",
        "price": "₹340",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=500&q=80&fit=crop"
    },
    {
        "category": "Pour Over",
        "name": "Aeropress",
        "desc": "Customised recipe, bold & smooth",
        "price": "₹300",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=500&q=80&fit=crop"
    },
    {
        "category": "Pour Over",
        "name": "Siphon Brew",
        "desc": "Theatrical full-immersion method",
        "price": "₹380",
        "tag": "Rare",
        "img": "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&q=80&fit=crop"
    },
    # Cold Brew
    {
        "category": "Cold Brew",
        "name": "Classic Cold Brew",
        "desc": "20-hour steep, smooth and low-acid",
        "price": "₹290",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80&fit=crop"
    },
    {
        "category": "Cold Brew",
        "name": "Nitro Cold Brew",
        "desc": "Nitrogen-infused, creamy cascade",
        "price": "₹340",
        "tag": "New",
        "img": "https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=500&q=80&fit=crop"
    },
    {
        "category": "Cold Brew",
        "name": "Cold Brew Tonic",
        "desc": "Cold brew over Indian tonic water",
        "price": "₹320",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80&fit=crop"
    },
    {
        "category": "Cold Brew",
        "name": "Iced Honey Oat Latte",
        "desc": "Cold brew, oat milk, raw honey",
        "price": "₹350",
        "tag": "Bestseller",
        "img": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80&fit=crop"
    },
    {
        "category": "Cold Brew",
        "name": "Iced Brown Sugar Latte",
        "desc": "Espresso, brown sugar syrup, oat milk over ice",
        "price": "₹330",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=500&q=80&fit=crop"
    },
    {
        "category": "Cold Brew",
        "name": "Iced Vanilla Latte",
        "desc": "Cold espresso, vanilla bean, whole milk",
        "price": "₹310",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80&fit=crop"
    },
    # Tea & More
    {
        "category": "Tea & More",
        "name": "Ceremonial Matcha",
        "desc": "Grade-A Japanese matcha, oat or soy",
        "price": "₹310",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80&fit=crop"
    },
    {
        "category": "Tea & More",
        "name": "Kashmiri Kahwa",
        "desc": "Saffron, cardamom, almond & rose",
        "price": "₹280",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80&fit=crop"
    },
    {
        "category": "Tea & More",
        "name": "London Fog",
        "desc": "Earl Grey, lavender, steamed milk",
        "price": "₹270",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80&fit=crop"
    },
    {
        "category": "Tea & More",
        "name": "Golden Turmeric Latte",
        "desc": "Turmeric, ginger, oat milk, black pepper",
        "price": "₹290",
        "tag": None,
        "img": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80&fit=crop"
    }
]


async def seed_menu_if_empty():
    """Seeds default menu items into MongoDB if the collection is empty."""
    db = get_database()
    if db is None:
        return
    try:
        count = await db.menu_items.count_documents({})
        if count == 0:
            logger.info("Menu collection is empty. Seeding initial Brew & Bean menu items...")
            await db.menu_items.insert_many([dict(item) for item in DEFAULT_MENU_ITEMS])
            logger.info("Successfully seeded default menu items!")
    except Exception as e:
        logger.warning(f"Could not seed menu collection: {e}")


async def get_menu_items(category: Optional[str] = None) -> List[MenuItemResponse]:
    """Retrieves menu items with optional category filtering."""
    db = get_database()
    query = {}
    if category and category.lower() != "all":
        # Case-insensitive category match
        query["category"] = {"$regex": f"^{category}$", "$options": "i"}

    if db is not None:
        try:
            cursor = db.menu_items.find(query)
            docs = await cursor.to_list(length=100)
            if docs:
                return [MenuItemResponse(**serialize_doc(doc)) for doc in docs]
        except Exception as e:
            logger.warning(f"MongoDB query failed, falling back to static data: {e}")

    # Fallback in-memory data
    items = DEFAULT_MENU_ITEMS
    if category and category.lower() != "all":
        items = [i for i in items if i["category"].lower() == category.lower()]
    return [MenuItemResponse(id=f"static-{idx}", **item) for idx, item in enumerate(items, 1)]


async def create_menu_item(item: MenuItemCreate) -> MenuItemResponse:
    """Inserts a new menu item."""
    db = get_database()
    data = item.model_dump()
    if db is not None:
        result = await db.menu_items.insert_one(data)
        data["id"] = str(result.inserted_id)
    else:
        data["id"] = "local-new"
    return MenuItemResponse(**data)

