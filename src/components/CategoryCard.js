'use client';

import { useState, useEffect, useRef } from 'react';

export default function CategoryCard({ category, onEdit, onDelete, searchQuery }) {
    console.log('Category object:', category); 
    console.log('Category _id:', category._id);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const descRef = useRef(null);

    useEffect(() => {
        if (descRef.current) {
            const isOverflowing = descRef.current.scrollHeight > descRef.current.clientHeight + 1;
            setShowReadMore(isOverflowing);
        }
    }, [category.description]);

    const highlightText = (text) => {
        if (!searchQuery.trim()) return text;

        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === searchQuery.toLowerCase()
                ? <span key={i} className="highlight">{part}</span>
                : part
        );
    };

    const handleEdit = () => {
        setShowDropdown(false);
        onEdit(category);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this category?')) {
            onDelete(category._id);
        }
        setShowDropdown(false);
    };

    return (
        <article className="card">
            <div className="card-header">
                <h3>{highlightText(category.name)}</h3>

                <div className="actions">
                    <span
                        className="material-symbols-outlined action-btn"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        more_vert
                    </span>

                    <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
                        <button onClick={handleEdit}>Edit</button>
                        <button className="danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>

            <p
                ref={descRef}
                className={`description ${isExpanded ? 'expanded' : ''}`}
            >
                {highlightText(category.description)}
            </p>

            {showReadMore && (
                <button
                    className="read-more-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            )}

            <div className="meta">
                <span className="material-symbols-outlined meta-post-icon">article</span>
                POSTS <span>{category.posts}</span>
            </div>
        </article>
    );
}