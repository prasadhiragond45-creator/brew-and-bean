from typing import List, Optional
from fastapi import APIRouter, Query, status
from app.models.menu import MenuItemCreate, MenuItemResponse
from app.services.menu_service import get_menu_items, create_menu_item

router = APIRouter(prefix="/menu", tags=["Menu"])


@router.get(
    "",
    response_model=List[MenuItemResponse],
    summary="Get menu items",
    description="Retrieve all café menu items, with optional category filtering (e.g. ?category=Espresso or ?category=Cold%20Brew)."
)
async def list_menu(
    category: Optional[str] = Query(None, description="Filter items by category (e.g. Espresso, Pour Over, Cold Brew, Tea & More)")
):
    return await get_menu_items(category=category)


@router.post(
    "",
    response_model=MenuItemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add a menu item",
    description="Create a new beverage or menu item."
)
async def add_menu_item(item: MenuItemCreate):
    return await create_menu_item(item)

