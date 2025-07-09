
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingDown, Zap } from "lucide-react";
import ApiService from "@/services/api";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    basePrice: number;
    dynamicPrice?: number;
    carbonScore?: number;
    isPerishable: boolean;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [dynamicPrice, setDynamicPrice] = useState(product.dynamicPrice || product.basePrice);
  const [carbonScore, setCarbonScore] = useState(product.carbonScore || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDynamicData();
  }, [product.id]);

  const fetchDynamicData = async () => {
    setLoading(true);
    try {
      // TODO: Uncomment when backend ML models are ready
      // const [priceResponse, carbonResponse] = await Promise.all([
      //   ApiService.getDynamicPrice(product.id, product.isPerishable),
      //   ApiService.getCarbonScore(product.id)
      // ]);
      // setDynamicPrice(parseFloat(priceResponse.dynamicPrice));
      // setCarbonScore(parseFloat(carbonResponse.carbonScore));

      // Mock ML model calls for now
      setTimeout(() => {
        const mockPrice = product.isPerishable 
          ? product.basePrice * (0.7 + Math.random() * 0.2)
          : product.basePrice * (0.9 + Math.random() * 0.1);
        const mockCarbon = Math.random() * 2;
        
        setDynamicPrice(parseFloat(mockPrice.toFixed(2)));
        setCarbonScore(parseFloat(mockCarbon.toFixed(1)));
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching dynamic data:", error);
      setLoading(false);
    }
  };

  const getCarbonBadgeColor = (score: number) => {
    if (score < 0.5) return "bg-green-500";
    if (score < 1.0) return "bg-yellow-500";
    return "bg-red-500";
  };

  const savings = product.basePrice - dynamicPrice;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isPerishable && (
          <Badge className="absolute top-2 right-2 bg-orange-500">
            Perishable
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
          </div>

          {/* Pricing Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Base Price:</span>
              <span className="line-through text-gray-400">${product.basePrice}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dynamic Price:</span>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                ) : (
                  <>
                    <span className="text-lg font-bold text-green-600">
                      ${dynamicPrice}
                    </span>
                    {savings > 0 && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        Save ${savings.toFixed(2)}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Carbon Score Section */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Carbon Impact:</span>
            <div className="flex items-center space-x-2">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
              ) : (
                <>
                  <Badge className={`${getCarbonBadgeColor(carbonScore)} text-white`}>
                    <Leaf className="h-3 w-3 mr-1" />
                    {carbonScore} kg CO₂
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* ML Model Indicators */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3" />
              <span>ML Pricing</span>
            </div>
            <div className="flex items-center space-x-1">
              <Leaf className="h-3 w-3" />
              <span>Carbon AI</span>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
