
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Award, TrendingUp, Calendar, Gift } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import ApiService from "@/services/api";

export default function RewardsPage() {
  const [rewardsData, setRewardsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const fetchRewardsData = async () => {
    try {
      // TODO: Uncomment when backend is ready
      // const response = await ApiService.getUserRewards(1); // Mock user ID
      // setRewardsData(response);
      
      // Mock rewards data for now
      const mockData = {
        totalPoints: 1250,
        co2Saved: 45.6,
        purchaseHistory: [
          { id: 1, product: "Organic Apples", points: 50, co2Saved: 2.1, date: "2024-01-15" },
          { id: 2, product: "Eco Water Bottle", points: 100, co2Saved: 5.2, date: "2024-01-10" },
          { id: 3, product: "Bamboo Toothbrush", points: 25, co2Saved: 1.8, date: "2024-01-08" },
          { id: 4, product: "Solar Charger", points: 150, co2Saved: 8.5, date: "2024-01-05" },
          { id: 5, product: "Reusable Bag", points: 75, co2Saved: 3.2, date: "2024-01-03" }
        ]
      };
      
      setRewardsData(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rewards data:", error);
      setLoading(false);
    }
  };

  const getRewardLevel = (points) => {
    if (points >= 2000) return { level: "Eco Champion", color: "bg-purple-500", progress: 100 };
    if (points >= 1000) return { level: "Green Guardian", color: "bg-green-500", progress: (points - 1000) / 10 };
    if (points >= 500) return { level: "Earth Friend", color: "bg-blue-500", progress: (points - 500) / 5 };
    return { level: "Eco Starter", color: "bg-gray-500", progress: points / 5 };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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

  const rewardLevel = getRewardLevel(rewardsData.totalPoints);

  return (
    <>
      <Head>
        <title>Eco Rewards - EcoSmart Shop</title>
        <meta name="description" content="Track your eco-friendly purchases and carbon footprint savings" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Eco Rewards
            </h1>
            <p className="text-gray-600">
              Track your environmental impact and earn rewards for sustainable choices
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Points</p>
                    <p className="text-2xl font-bold text-gray-900">{rewardsData.totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Leaf className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                    <p className="text-2xl font-bold text-gray-900">{rewardsData.co2Saved} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Purchases</p>
                    <p className="text-2xl font-bold text-gray-900">{rewardsData.purchaseHistory.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reward Level Progress */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Reward Level
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge className={`${rewardLevel.color} text-white text-lg px-4 py-2`}>
                      {rewardLevel.level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to next level</span>
                      <span>{Math.round(rewardLevel.progress)}%</span>
                    </div>
                    <Progress value={rewardLevel.progress} className="h-2" />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Eco Starter</span>
                      <span>0-499 pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Earth Friend</span>
                      <span>500-999 pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Green Guardian</span>
                      <span>1000-1999 pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eco Champion</span>
                      <span>2000+ pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{rewardsData.co2Saved}</p>
                    <p className="text-sm text-gray-600">kg CO₂ saved</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Equivalent to:</span>
                      <span></span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Trees planted</span>
                      <span>{Math.round(rewardsData.co2Saved / 22)} trees</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Miles not driven</span>
                      <span>{Math.round(rewardsData.co2Saved * 2.3)} miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Plastic bottles saved</span>
                      <span>{Math.round(rewardsData.co2Saved * 15)} bottles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Purchase History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Purchase History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rewardsData.purchaseHistory.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{purchase.product}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(purchase.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              +{purchase.points} pts
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {purchase.co2Saved} kg CO₂ saved
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
