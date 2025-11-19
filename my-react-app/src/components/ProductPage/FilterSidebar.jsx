import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    category: false,
    colors: false,
    priceRange: false,
    collections: false,
    tags: false,
    ratings: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-[#e6dcc4] pb-2 mb-2">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-[0.75rem] font-semibold tracking-wide text-[#5b3a1a] uppercase">
          {title}
        </h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-3.5 w-3.5 text-[#a27c48]" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-[#a27c48]" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-2 space-y-1.5">{children}</div>
      )}
    </div>
  );

  return (
    <aside
      className="
        fixed top-[170px] left-0 
        w-[250px] h-[calc(100vh-120px)]
        bg-gradient-to-b from-[#F0EBE1] to-[#f7f1e8]
        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        border-r border-[#e5dcc5]
        overflow-y-auto z-[100]
        p-4
        flex flex-col
        rounded-none
      "
    >
      <h2 className="mb-4 text-sm font-semibold tracking-widest text-[#5b3a1a] uppercase border-b border-[#e2d5bc] pb-2">
        Filters
      </h2>

      {/* Quantity */}
      <div className="mb-4">
        <h3 className="text-[0.75rem] font-semibold tracking-wide text-[#5b3a1a] uppercase mb-2">
          Quantity
        </h3>
        <div className="flex gap-1.5">
          {[50, 250, 500].map((qty) => (
            <button
              key={qty}
              onClick={() => onFilterChange('quantity', qty)}
              className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
                filters.quantity === qty
                  ? 'border-[#b1560e] bg-[#f5e8d2] text-[#b1560e]'
                  : 'border-gray-300 text-gray-600 hover:border-[#c09d6f]'
              }`}
            >
              {qty}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="availability"
            checked={filters.availability}
            onCheckedChange={(checked) => onFilterChange('availability', checked)}
          />
          <Label
            htmlFor="availability"
            className="cursor-pointer text-xs text-[#4b3a2a]"
          >
            Availability <span className="text-gray-400">(450)</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="outOfStock"
            checked={filters.outOfStock}
            onCheckedChange={(checked) => onFilterChange('outOfStock', checked)}
          />
          <Label
            htmlFor="outOfStock"
            className="cursor-pointer text-xs text-[#4b3a2a]"
          >
            Out Of Stock <span className="text-gray-400">(18)</span>
          </Label>
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category" sectionKey="category">
        {['Masala Powder', 'Masala', 'Powder', 'Health Mix', 'Pickle'].map(
          (cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={cat}
                checked={filters.categories?.includes(cat)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...(filters.categories || []), cat]
                    : (filters.categories || []).filter((c) => c !== cat);
                  onFilterChange('categories', newCategories);
                }}
              />
              <Label
                htmlFor={cat}
                className="cursor-pointer text-xs text-[#4b3a2a]"
              >
                {cat}
              </Label>
            </div>
          )
        )}
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors" sectionKey="colors">
        {['Red', 'Yellow', 'Blue', 'Brown', 'Green'].map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={color}
              checked={filters.colors?.includes(color)}
              onCheckedChange={(checked) => {
                const newColors = checked
                  ? [...(filters.colors || []), color]
                  : (filters.colors || []).filter((c) => c !== color);
                onFilterChange('colors', newColors);
              }}
            />
            <Label
              htmlFor={color}
              className="cursor-pointer text-xs text-[#4b3a2a]"
            >
              {color}
            </Label>
          </div>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="priceRange">
        {['0-100', '100-200', '200-300'].map((range) => (
          <div key={range} className="flex items-center space-x-2">
            <Checkbox
              id={range}
              checked={filters.priceRanges?.includes(range)}
              onCheckedChange={(checked) => {
                const newRanges = checked
                  ? [...(filters.priceRanges || []), range]
                  : (filters.priceRanges || []).filter((r) => r !== range);
                onFilterChange('priceRanges', newRanges);
              }}
            />
            <Label
              htmlFor={range}
              className="cursor-pointer text-xs text-[#4b3a2a]"
            >
              ₹{range}
            </Label>
          </div>
        ))}
      </FilterSection>

      {/* Collections */}
      <FilterSection title="Collections" sectionKey="collections">
        {[
          'Spices',
          'Masala Mix',
          'Rice Mixes',
          'Powders',
          'Pickles',
          'Health Products',
        ].map((collection) => (
          <div key={collection} className="flex items-center space-x-2">
            <Checkbox
              id={collection}
              checked={filters.collections?.includes(collection)}
              onCheckedChange={(checked) => {
                const newCollections = checked
                  ? [...(filters.collections || []), collection]
                  : (filters.collections || []).filter((c) => c !== collection);
                onFilterChange('collections', newCollections);
              }}
            />
            <Label
              htmlFor={collection}
              className="cursor-pointer text-xs text-[#4b3a2a]"
            >
              {collection}
            </Label>
          </div>
        ))}
      </FilterSection>

      {/* Tags */}
      <FilterSection title="Tags" sectionKey="tags">
        {['spicy', 'masala', 'chicken', 'biryani', 'rice'].map((tag) => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox
              id={tag}
              checked={filters.tags?.includes(tag)}
              onCheckedChange={(checked) => {
                const newTags = checked
                  ? [...(filters.tags || []), tag]
                  : (filters.tags || []).filter((t) => t !== tag);
                onFilterChange('tags', newTags);
              }}
            />
            <Label
              htmlFor={tag}
              className="cursor-pointer text-xs text-[#4b3a2a]"
            >
              {tag}
            </Label>
          </div>
        ))}
      </FilterSection>

      {/* Ratings */}
      <FilterSection title="Ratings" sectionKey="ratings">
        {[5, 4, 3].map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={filters.minRating === rating}
              onCheckedChange={(checked) => {
                onFilterChange('minRating', checked ? rating : null);
              }}
            />
            <Label
              htmlFor={`rating-${rating}`}
              className="cursor-pointer text-xs text-[#4b3a2a]"
            >
              {rating}★ & above
            </Label>
          </div>
        ))}
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;
