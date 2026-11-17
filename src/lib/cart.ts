"use client";

import { useSyncExternalStore } from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  icon: string;
  color: string;
  quantity: number;
};

const storageKey = "the-everyday-edit-cart";
const emptyCart = "[]";
const subscribers = new Set<() => void>();

function getSnapshot() {
  try {
    return window.localStorage.getItem(storageKey) ?? emptyCart;
  } catch (error) {
    console.error("Unable to read the shopping cart from local storage.", error);
    return emptyCart;
  }
}

function getServerSnapshot() {
  return emptyCart;
}

function subscribe(onStoreChange: () => void) {
  subscribers.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    subscribers.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function parseCart(snapshot: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (
      !Array.isArray(parsed) ||
      parsed.some(
        (item) =>
          typeof item !== "object" ||
          item === null ||
          typeof item.id !== "number" ||
          typeof item.name !== "string" ||
          typeof item.category !== "string" ||
          typeof item.price !== "number" ||
          typeof item.rating !== "number" ||
          typeof item.description !== "string" ||
          typeof item.icon !== "string" ||
          typeof item.color !== "string" ||
          typeof item.quantity !== "number",
      )
    ) {
      throw new TypeError("The saved shopping cart has an invalid format.");
    }

    return parsed as CartItem[];
  } catch (error) {
    console.error("Unable to parse the saved shopping cart.", error);
    return [];
  }
}

export function useCartItems() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return parseCart(snapshot);
}

export function updateCartItems(
  update: (items: CartItem[]) => CartItem[],
) {
  const nextItems = update(parseCart(getSnapshot()));
  window.localStorage.setItem(storageKey, JSON.stringify(nextItems));
  subscribers.forEach((onStoreChange) => onStoreChange());
}
