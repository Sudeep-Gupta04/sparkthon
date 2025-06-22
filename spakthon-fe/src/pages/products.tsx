
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Leaf, Zap } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import ProductCard from "@/components/Products/ProductCard";
import ApiService from "@/services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [carbonRange, setCarbonRange] = useState([0, 2]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, priceRange, carbonRange, categoryFilter, sortBy]);

  const fetchProducts = async () => {
    try {
      // TODO: Uncomment when backend is ready
      // const response = await ApiService.getProducts();
      // setProducts(response.products);
      
      // Mock products for now
      const mockProducts = [
        {
          id: 1,
          name: "Organic Apples",
          category: "Fruits",
          basePrice: 4.99,
          dynamicPrice: 4.49,
          carbonScore: 0.2,
          isPerishable: true,
          image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300"
        },
        {
          id: 2,
          name: "Eco-Friendly Water Bottle",
          category: "Accessories",
          basePrice: 19.99,
          dynamicPrice: 18.99,
          carbonScore: 0.8,
          isPerishable: false,
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300"
        },
        {
          id: 3,
          name: "Organic Bananas",
          category: "Fruits",
          basePrice: 3.49,
          dynamicPrice: 2.99,
          carbonScore: 0.3,
          isPerishable: true,
          image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300"
        },
        {
          id: 4,
          name: "Bamboo Toothbrush",
          category: "Personal Care",
          basePrice: 8.99,
          dynamicPrice: 8.99,
          carbonScore: 0.1,
          isPerishable: false,
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300"
        },
        {
          id: 5,
          name: "Reusable Shopping Bag",
          category: "Accessories",
          basePrice: 12.99,
          dynamicPrice: 11.99,
          carbonScore: 0.4,
          isPerishable: false,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"
        },
        {
          id: 6,
          name: "Solar Phone Charger",
          category: "Electronics",
          basePrice: 49.99,
          dynamicPrice: 45.99,
          carbonScore: 1.2,
          isPerishable: false,
          image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=300"
        }
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.dynamicPrice || product.basePrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Carbon range filter
    filtered = filtered.filter(product => {
      const carbon = product.carbonScore || 0;
      return carbon >= carbonRange[0] && carbon <= carbonRange[1];
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.dynamicPrice || a.basePrice) - (b.dynamicPrice || b.basePrice);
        case "price-high":
          return (b.dynamicPrice || b.basePrice) - (a.dynamicPrice || a.basePrice);
        case "carbon-low":
          return (a.carbonScore || 0) - (b.carbonScore || 0);
        case "carbon-high":
          return (b.carbonScore || 0) - (a.carbonScore || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
      <Head>
        <title>Products - EcoSmart Shop</title>
        <meta name="description" content="Browse eco-friendly products with AI-powered pricing and carbon footprint analysis" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Eco-Smart Products
            </h1>
            <p className="text-gray-600">
              Discover sustainable products with AI-powered dynamic pricing and carbon footprint analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  {/* Carbon Score Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Carbon Impact: {carbonRange[0]} - {carbonRange[1]} kg CO₂
                    </label>
                    <Slider
                      value={carbonRange}
                      onValueChange={setCarbonRange}
                      max={2}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="carbon-low">Carbon: Low to High</SelectItem>
                        <SelectItem value="carbon-high">Carbon: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* ML Features Info */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">AI Dynamic Pricing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Carbon Footprint AI</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Prices and carbon scores are calculated in real-time using our ML models
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <CardContent className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      Showing {filteredProducts.length} of {products.length} products
                    </p>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Zap className="h-3 w-3 mr-1" />
                      ML Powered
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No products found matching your filters.</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("");
                          setCategoryFilter("all");
                          setPriceRange([0, 100]);
                          setCarbonRange([0, 2]);
                        }}
                        className="mt-4"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
