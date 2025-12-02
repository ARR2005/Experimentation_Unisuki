import DB from '../DB.json';

export const carouselItems = Object.values(DB.items).slice(0,3);