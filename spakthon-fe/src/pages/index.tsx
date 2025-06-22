
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Zap, 
  Award, 
  Mic, 
  ShoppingCart, 
  TrendingDown,
  Users,
  BarChart3
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import VoiceAssistant from "@/components/Voice/VoiceAssistant";

export default function HomePage() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "AI Dynamic Pricing",
      description: "ML-powered pricing for perishable and non-perishable products with real-time optimization"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: "Carbon Footprint Analysis",
      description: "Advanced AI calculates and displays the environmental impact of every product"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Eco Rewards System",
      description: "Earn points and track your CO₂ savings with every sustainable purchase"
    },
    {
      icon: <Mic className="h-8 w-8 text-purple-500" />,
      title: "Voice Assistant",
      description: "GenAI-powered voice recommendations for eco-friendly product discovery"
    }
  ];

  const mockStats = {
    totalUsers: 1250,
    co2Saved: 2840,
    productsAnalyzed: 450,
    avgSavings: 15
  };

  return (
    <>
      <Head>
        <title>EcoSmart Shop - AI-Powered Sustainable Shopping</title>
        <meta name="description" content="Shop sustainably with AI-powered dynamic pricing, carbon footprint analysis, and eco rewards" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar onVoiceClick={() => setIsVoiceOpen(true)} />
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Leaf className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              EcoSmart Shop
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of sustainable shopping with AI-powered dynamic pricing, 
              carbon footprint analysis, and intelligent product recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setIsVoiceOpen(true)}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Mic className="h-5 w-5 mr-2" />
                Try Voice Assistant
              </Button>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockStats.co2Saved} kg</p>
                <p className="text-sm text-gray-600">CO₂ Saved</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockStats.productsAnalyzed}</p>
                <p className="text-sm text-gray-600">Products Analyzed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockStats.avgSavings}%</p>
                <p className="text-sm text-gray-600">Avg. Savings</p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Powered by Advanced AI & ML
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {feature.icon}
                      <span className="ml-3">{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Explore our eco-friendly products with real-time AI pricing and carbon analysis
                </p>
                <Link href="/products">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Products
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Eco Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Track your environmental impact and earn rewards for sustainable choices
                </p>
                <Link href="/rewards">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Rewards
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Voice Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get personalized product recommendations using our AI voice assistant
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setIsVoiceOpen(true)}
                >
                  Try Voice Search
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Technology Showcase */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Built for Testing Backend & ML Services
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-blue-600 border-blue-600 px-4 py-2">
                Dynamic Pricing ML
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-600 px-4 py-2">
                Carbon Footprint AI
              </Badge>
              <Badge variant="outline" className="text-purple-600 border-purple-600 px-4 py-2">
                GenAI Voice Assistant
              </Badge>
              <Badge variant="outline" className="text-orange-600 border-orange-600 px-4 py-2">
                Rewards System
              </Badge>
            </div>
          </div>
        </div>

        {/* Voice Assistant Modal */}
        <VoiceAssistant 
          isOpen={isVoiceOpen} 
          onClose={() => setIsVoiceOpen(false)} 
        />
      </div>
    </>
  );
}
