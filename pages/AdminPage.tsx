import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { Product, ProductCategory } from '../types';
import { useNavigate } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.DESIGNS);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [modelInfo, setModelInfo] = useState('');
  const [dimensions, setDimensions] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price || !description || !image) {
      alert("Please fill out name, price, description, and image.");
      return;
    }

    const newProduct: Product = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      category,
      price: parseFloat(price),
      description,
      details,
      images: [image],
      size: size || undefined,
      modelInfo: modelInfo || undefined,
      dimensions: dimensions || undefined,
      featured: false,
    };

    addProduct(newProduct);
    alert('Product added successfully!');
    
    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setDetails('');
    setImage('');
    setSize('');
    setModelInfo('');
    setDimensions('');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-16 max-w-md">
        <h1 className="font-poppins text-3xl font-bold text-center mb-8">Admin Login</h1>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <FormField id="username" label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-6">
            <FormField id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" variant="primary" className="w-full">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="font-poppins text-3xl font-bold text-center mb-8">Add New Product</h1>
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <FormField id="name" label="Product Name" value={name} onChange={e => setName(e.target.value)} required />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value as ProductCategory)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
          >
            {Object.values(ProductCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <FormField id="price" label="Price ($)" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
           <textarea 
             value={description}
             onChange={e => setDescription(e.target.value)}
             required
             className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
             rows={3}
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Details (Optional)</label>
           <textarea 
             value={details}
             onChange={e => setDetails(e.target.value)}
             className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
             rows={4}
           />
        </div>

        <FormField id="image" label="Image URL or Path (e.g., /alskar.jpeg)" value={image} onChange={e => setImage(e.target.value)} required />
        
        <FormField id="size" label="Size (Informational, optional)" value={size} onChange={e => setSize(e.target.value)} />
        
        <FormField id="modelInfo" label="Model Info (Optional)" value={modelInfo} onChange={e => setModelInfo(e.target.value)} />
        
        <FormField id="dimensions" label="Dimensions (Optional, for prints)" value={dimensions} onChange={e => setDimensions(e.target.value)} />
        
        <div className="pt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate('/shop')}>Go to Shop</Button>
          <Button type="submit" variant="primary">Add Product</Button>
        </div>
      </form>
    </div>
  );
};
