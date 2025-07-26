import React, { useEffect, useState, useMemo } from 'react';
import ProductForm from './components/ProductForm';
import ProductGrid from './components/ProductGrid';
import ConfirmModal from './components/ConfirmModal';
import Fetch from './components/Fetch';
import FetchDetail from './components/FetchDetail';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [abilities, setAbilities] = useState([]);
  const [abilityLoading, setAbilityLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebounceTimeout(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = (product) => {
    const existingProduct = products.find((p) => p.name.toLowerCase().trim() === product.name.toLowerCase().trim());

    if (isEditing) {
      setProducts((prevProduct => prevProduct.map((p) => (p.id === product.id ? product : p))));
    } else if (!existingProduct) {
      setProducts(prevProduct => [...prevProduct, product]);
    } else {
      alert("Product already exists");
    }

    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
  }

  const confirmDelete = () => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productToDelete));
    setShowConfirm(false);
    setProductToDelete(null);
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.includes(debounceTimeout)
    );

    if (sortOption === "PRICE-ASC")
      result.sort((a, b) => a.price - b.price);
    else if (sortOption === "PRICE-DESC")
      result.sort((a, b) => b.price - a.price);
    else if (sortOption === "STOCK-ASC")
      result.sort((a, b) => a.stock - b.stock);
    else if (sortOption === "STOCK-DESC")
      result.sort((a, b) => b.stock - a.stock);

    return result;
  }, [products, debounceTimeout, sortOption]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Product Management</h1>
      <ProductForm
        onSave={handleSave}
        isEditing={isEditing}
        initialData={editingProduct}
        products={products}
      />

      <div className="mt-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full sm:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded ml-2 mt-4 sm:mt-4"
          onChange={(e) => setSortOption(e.target.value)}
        >
        <option value="">Sort By</option>
        <option value="PRICE-ASC">Price: Low to High</option>
        <option value="PRICE-DESC">Price: High to Low</option>
        <option value="STOCK-ASC">Stock: Low to High</option>
        <option value="STOCK-DESC">Stock: High to Low</option>
        </select>
      </div>

      <ProductGrid
        products={filteredProducts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => {
          setProductToDelete(id);
          setShowConfirm(true);
        }}
      />

      <ConfirmModal
        show={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setProductToDelete(null);
        }}
      />

      <Fetch />

      <FetchDetail />
      
    </div>
  );
}

export default App;