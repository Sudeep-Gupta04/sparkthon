
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Package, 
  Zap, 
  Leaf, 
  TrendingUp, 
  Activity,
  RefreshCw
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import ApiService from "@/services/api";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [modelLogs, setModelLogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Uncomment when backend is ready
      // const [analyticsResponse, logsResponse] = await Promise.all([
      //   ApiService.getAnalytics(),
      //   ApiService.getModelLogs()
      // ]);
      // setAnalytics(analyticsResponse);
      // setModelLogs(logsResponse);
      
      // Mock admin data for now
      const mockAnalytics = {
        totalUsers: 1250,
        totalProducts: 450,
        avgCarbonScore: 0.6,
        topUsers: [
          { id: 1, name: "Alice Johnson", points: 2500, co2Saved: 89.2 },
          { id: 2, name: "Bob Smith", points: 1800, co2Saved: 67.4 },
          { id: 3, name: "Carol Davis", points: 1650, co2Saved: 58.9 },
          { id: 4, name: "David Wilson", points: 1420, co2Saved: 52.1 },
          { id: 5, name: "Eva Brown", points: 1380, co2Saved: 48.7 }
        ],
        priceAccuracy: 0.87,
        carbonAccuracy: 0.92
      };

      const mockModelLogs = {
        pricingModel: {
          accuracy: 0.87,
          lastUpdated: "2024-01-20T10:30:00Z",
          predictions: 1250
        },
        carbonModel: {
          accuracy: 0.92,
          lastUpdated: "2024-01-20T09:15:00Z",
          predictions: 980
        }
      };
      
      setAnalytics(mockAnalytics);
      setModelLogs(mockModelLogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const refreshData = () => {
    setLoading(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - EcoSmart Shop</title>
        <meta name="description" content="Admin dashboard for EcoSmart Shop analytics and ML model monitoring" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar user={{ role: "admin", name: "Admin" }} />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor platform analytics and ML model performance
              </p>
            </div>
            <Button onClick={refreshData} disabled={loading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalProducts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Leaf className="h-8 w-8 text-emerald-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Carbon Score</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.avgCarbonScore} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Price Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">{Math.round(analytics.priceAccuracy * 100)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ML Model Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  ML Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing Model */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Dynamic Pricing Model</h4>
                    <Badge className="bg-blue-100 text-blue-800">
                      {Math.round(modelLogs.pricingModel.accuracy * 100)}% Accuracy
                    </Badge>
                  </div>
                  <Progress value={modelLogs.pricingModel.accuracy * 100} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Predictions: {modelLogs.pricingModel.predictions}</span>
                    <span>Updated: {new Date(modelLogs.pricingModel.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Carbon Model */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Carbon Footprint Model</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {Math.round(modelLogs.carbonModel.accuracy * 100)}% Accuracy
                    </Badge>
                  </div>
                  <Progress value={modelLogs.carbonModel.accuracy * 100} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Predictions: {modelLogs.carbonModel.predictions}</span>
                    <span>Updated: {new Date(modelLogs.carbonModel.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Model Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Model Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Users by Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Top Users by Eco Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">
                            {user.co2Saved} kg CO₂ saved
                          </p>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {user.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Analytics */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Real-time Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(analytics.priceAccuracy * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Pricing Model Accuracy</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(analytics.carbonAccuracy * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Carbon Model Accuracy</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {analytics.totalUsers + analytics.totalProducts}
                  </p>
                  <p className="text-sm text-gray-600">Total Platform Entities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
