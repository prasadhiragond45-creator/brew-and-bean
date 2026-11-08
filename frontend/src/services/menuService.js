import { request } from './api';
import { menuItems as localMenuItems } from '../data/menuData';

/**
 * Fetch menu items, optionally filtered by category.
 * Falls back to static menu data if the backend is unreachable.
 */
export async function getMenu(category = null) {
  try {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const data = await request(`/menu${query}`);
    return data;
  } catch (error) {
    console.warn('Backend menu API unavailable, using local menu data:', error.message);
    if (category && category !== 'All') {
      return localMenuItems.filter((item) => item.category === category);
    }
    return localMenuItems;
  }
}

