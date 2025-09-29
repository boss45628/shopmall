

'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import Link from "next/link";

// 模擬商品數據
const sampleProducts = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro",
    price: 36900,
    originalPrice: 39900,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    description: "全新 iPhone 15 Pro，搭載 A17 Pro 晶片，鈦金屬設計，專業級相機系統。",
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 42900,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    description: "Galaxy S24 Ultra 配備 S Pen，200MP 相機，AI 驅動的攝影功能。",
    rating: 4.7,
    reviews: 892,
  },
  {
    id: 3,
    name: "MacBook Pro 14吋",
    price: 69900,
    originalPrice: 74900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    description: "MacBook Pro 搭載 M3 Pro 晶片，Liquid Retina XDR 顯示器，專業級效能。",
    rating: 4.9,
    reviews: 634,
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 耳機",
    price: 12900,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description: "業界領先的主動降噪技術，30小時電池續航，高解析度音質。",
    rating: 4.6,
    reviews: 2156,
  },
  {
    id: 5,
    name: "Nintendo Switch OLED",
    price: 10980,
    originalPrice: 12980,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    description: "Nintendo Switch OLED 版本，7吋 OLED 螢幕，64GB 儲存空間。",
    rating: 4.8,
    reviews: 3456,
  },
  {
    id: 6,
    name: "iPad Air 第5代",
    price: 18900,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop",
    description: "iPad Air 搭載 M1 晶片，10.9吋 Liquid Retina 顯示器，支援 Apple Pencil。",
    rating: 4.7,
    reviews: 1789,
  }
];

export default function Home() {
  const { state } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 頁面標題 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">精選商品</h1>
            <p className="text-gray-600">發現最新最熱門的科技產品</p>
          </div>

          {/* 購物車狀態 */}
          {state.totalItems > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">購物車</h2>
                  <p className="text-gray-600">目前有 {state.totalItems} 件商品</p>
                </div>
                <Link
                  href="/cart"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  查看購物車
                </Link>
              </div>
            </div>
          )}

          {/* 商品網格 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* 載入更多按鈕 */}
          <div className="text-center mt-12">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors">
              載入更多商品
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
