// src/pages/LandingPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("nature");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // When the URL search parameter changes, update the searchQuery state.
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    } else {
      setSearchQuery("nature"); // fallback to a default query
    }
  }, [searchParams]);

  // Debounce the search input to reduce API calls.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch images from Pixabay using the debounced query.
  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=48763036-d2bf3eb75b3aeda17f1ac63e6&q=${encodeURIComponent(
          debouncedQuery
        )}&image_type=photo&per_page=20`
      );
      setImages(data.hits || []);
    } catch (error) {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  // Trigger a new API call whenever the debounced query changes.
  useEffect(() => {
    fetchImages();
  }, [debouncedQuery]);

  // Render a set of skeletons while loading.
  const renderSkeletons = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <div key={index} className="mb-4">
        <div className="w-full h-48 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Masonry Grid for Images */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-6">
        {loading
          ? renderSkeletons()
          : images.map((image, index) => (
              <div key={index} className="relative mb-4">
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className="w-full rounded-lg hover:opacity-75 transition duration-300"
                  loading="lazy" // Lazy loading attribute
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default LandingPage;


// 48763036-d2bf3eb75b3aeda17f1ac63e6