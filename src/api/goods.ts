import { Good } from '../types/Good';

// eslint-disable-next-line
const API_URL = `https://mate-academy.github.io/react_dynamic-list-of-goods/goods.json`;

// універсальний хелпер: кидає помилку при неуспішному HTTP-статусі
async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    let details = '';

    try {
      details = await res.text();
    } catch {
      // ignore
    }

    throw new Error(
      `Request failed: ${res.status} ${res.statusText}${details ? ` — ${details}` : ''}`,
    );
  }

  return res.json();
}

export async function getAll(): Promise<Good[]> {
  return request<Good[]>(API_URL);
}

export const get5First = async () => {
  const goods = await getAll();

  return goods
    .slice() // щоб не мутувати оригінальний масив
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 5); // sort and get the first 5
};

export const getRedGoods = async () => {
  const goods = await getAll();

  return goods.filter(good => good.color === 'red'); // get only red
};
