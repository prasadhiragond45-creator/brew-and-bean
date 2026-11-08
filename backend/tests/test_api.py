import pytest
from httpx import ASGITransport, AsyncClient
from main import app


@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "Brew & Bean" in data["app"]


@pytest.mark.asyncio
async def test_get_menu_all():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/menu")
        assert response.status_code == 200
        items = response.json()
        assert isinstance(items, list)
        assert len(items) > 0
        # Check first item structure
        assert "name" in items[0]
        assert "price" in items[0]
        assert "category" in items[0]


@pytest.mark.asyncio
async def test_get_menu_category_filter():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/menu?category=Espresso")
        assert response.status_code == 200
        items = response.json()
        assert isinstance(items, list)
        assert len(items) > 0
        for item in items:
            assert item["category"].lower() == "espresso"


@pytest.mark.asyncio
async def test_post_contact():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        payload = {
            "name": "Alex Carter",
            "email": "alex@example.com",
            "phone": "+91 98765 11111",
            "message": "Testing automated contact submission"
        }
        response = await client.post("/api/contact", json=payload)
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Alex Carter"
        assert data["status"] == "received"
        assert "id" in data


@pytest.mark.asyncio
async def test_cors_headers():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        headers = {
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET"
        }
        response = await client.options("/api/health", headers=headers)
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"

