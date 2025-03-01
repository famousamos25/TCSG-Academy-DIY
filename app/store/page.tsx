'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Download, BookOpen, FileText, Bot, Building, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  icon: React.ElementType;
  productUrl?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'chatgpt',
    title: 'ChatGPT with Creditfixrr.com',
    description: 'AI-powered credit repair assistant to help with disputes and credit building strategies',
    price: 9.99,
    image: 'https://i.imgur.com/L5JyZR8.jpg',
    badge: 'Popular',
    icon: Bot,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=1'
  },
  {
    id: 'dispute-reasons',
    title: '100+ Dispute Reasons',
    description: 'Comprehensive guide with proven dispute reasons for credit repair success',
    price: 5.99,
    image: 'https://i.imgur.com/52Cbg8q.png',
    icon: FileText,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=2'
  },
  {
    id: 'business-guide',
    title: 'Business Structure & Funding',
    description: 'Complete guide to business credit building and funding opportunities',
    price: 19.99,
    image: 'https://i.imgur.com/8KZJZzF.jpg',
    badge: 'Best Value',
    icon: Building,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=3'
  },
  {
    id: 'student-loans',
    title: 'Student Loan Removal Guide',
    description: 'Step-by-step guide for managing and removing student loan debt',
    price: 9.99,
    image: 'https://i.imgur.com/vN3nK9x.jpg',
    icon: BookOpen,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=4'
  },
  {
    id: 'bundle',
    title: 'Creditfixrr.com E-Book Bundle',
    description: 'Get all our premium e-books at a discounted price',
    price: 39.99,
    image: 'https://i.imgur.com/M4XkVsd.jpg',
    badge: 'Save 40%',
    icon: Download,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=5'
  },
  {
    id: 'ebook',
    title: 'You Are The Creditfixrr Ebook',
    description: 'The ultimate guide to DIY credit repair and financial success',
    price: 14.99,
    image: 'https://i.imgur.com/RecPXag.jpg',
    icon: BookOpen,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=6'
  },
  {
    id: 'letters',
    title: 'Dispute Letter Library',
    description: 'Collection of proven dispute letter templates for various situations',
    price: 5.99,
    image: 'https://i.imgur.com/RKqeWHe.png',
    icon: FileText,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=7'
  },
  {
    id: 'business-credit',
    title: 'How to Build a Strong Bank Rating for Your Business',
    description: 'Expert strategies for establishing and improving your business credit',
    price: 5.99,
    image: 'https://i.imgur.com/c2VWHFM.png',
    icon: Building,
    productUrl: 'https://app.kartra.com/redirect_to/?$product_id=8'
  }
];

export default function StorePage() {
  const handleBuyNow = (productUrl?: string) => {
    if (productUrl) {
      window.open(productUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">E-Store</h1>
          <p className="text-gray-600">Premium credit repair tools and resources</p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {PRODUCTS.map((product) => (
          <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[4/3]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <Badge className="absolute top-4 right-4 bg-brand-yellow text-brand-navy">
                  {product.badge}
                </Badge>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <product.icon className="h-5 w-5 text-brand-yellow" />
                <h3 className="font-semibold text-brand-navy">{product.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-brand-navy">${product.price}</span>
                  {product.price <= 9.99 && (
                    <Badge variant="outline" className="text-green-600">
                      Best Deal
                    </Badge>
                  )}
                </div>
                <Button 
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  onClick={() => handleBuyNow(product.productUrl)}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <Card className="p-8 bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-brand-yellow" />
            <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
            <p className="text-gray-300">Download your resources immediately after purchase</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 mx-auto mb-4 text-brand-yellow" />
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-300">Expert-crafted content and proven strategies</p>
          </div>
          <div className="text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-4 text-brand-yellow" />
            <h3 className="text-lg font-semibold mb-2">Regular Updates</h3>
            <p className="text-gray-300">Access to the latest credit repair techniques</p>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-brand-navy mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I access my purchases?",
              a: "After purchase, you'll receive instant access to download your digital products from your account dashboard."
            },
            {
              q: "Are updates included?",
              a: "Yes! All our digital products include lifetime updates at no additional cost."
            },
            {
              q: "Can I get a refund?",
              a: "We offer a 30-day money-back guarantee if you're not satisfied with your purchase."
            }
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold text-brand-navy mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}