'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import CategoryCard from '@/components/CategoryCard';
import CategoryModal from '@/components/CategoryModal';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
        setFilteredCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter(cat =>
      cat.name.toLowerCase().includes(query.toLowerCase()) ||
      cat.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (editingCategory) {
        // Update existing
        const response = await fetch(`/api/categories/${editingCategory._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryData),
        });
        
        if (response.ok) {
          await fetchCategories();
        }
      } else {
        // Create new
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryData),
        });
        
        if (response.ok) {
          await fetchCategories();
        }
      }
      
      setIsModalOpen(false);
      setEditingCategory(null);
      handleSearch(searchQuery);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCategories();
        handleSearch(searchQuery);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Sidebar />
        <main className="main">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <Sidebar />
      
      <main className="main">
        <div className="header">
          <h1>Community Category Board</h1>
          <button 
            className="btn" 
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="btn-text">New Category</span>
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="category-list">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchQuery={searchQuery}
            />
          ))}
          
          {filteredCategories.length === 0 && (
            <p className="no-results">No categories found</p>
          )}
        </div>
      </main>

      {isModalOpen && (
        <CategoryModal
          category={editingCategory}
          onSave={handleSaveCategory}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}