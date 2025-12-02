import DB from '../DB.json';

export const products = Object.entries(DB.items).map(([key, item]: any) => ({
  id: key,
  title: item.title,
  image_uri: item.image_uri,
  price: item.price,
  description: item.description,
  support_images: item.support_images || [],
}))

export const itemsMap: Record<string, any> = DB.items;