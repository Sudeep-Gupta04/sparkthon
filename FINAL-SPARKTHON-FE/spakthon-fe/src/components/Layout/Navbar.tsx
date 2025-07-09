
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, ShoppingCart, User, Leaf, BarChart3 } from "lucide-react";

interface NavbarProps {
  user?: any;
  onVoiceClick?: () => void;
}

export default function Navbar({ user, onVoiceClick }: NavbarProps) {
  const [cartItems] = useState(3); // Mock cart items

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">EcoSmart Shop</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="hover:text-green-200 transition-colors">
              Products
            </Link>
            <Link href="/rewards" className="hover:text-green-200 transition-colors">
              Rewards
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="hover:text-green-200 transition-colors flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Voice Assistant Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onVoiceClick}
              className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice
            </Button>

            {/* Shopping Cart */}
            <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-green-600 relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Hi, {user.name}</span>
                <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-green-600">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-green-600">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-white text-green-600 hover:bg-green-50">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
