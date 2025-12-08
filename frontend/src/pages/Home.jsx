import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faCheck,
  faTruck,
  faLeaf,
  faShieldAlt,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

// Add icons to library
library.add(
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faCheck,
  faTruck,
  faLeaf,
  faShieldAlt,
  faChevronRight,
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp
);

// Sample product data
const products = [
  {
    id: 1,
    name: 'Premium Rice',
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    description: 'High-quality rice grains carefully selected for the best taste and texture.'
  },
  {
    id: 2,
    name: 'Spices Collection',
    category: 'Spices',
    image: 'https://images.unsplash.com/photo-1603906878281-5a2d5a4e4f3a?auto=format&fit=crop&w=500&q=80',
    description: 'Aromatic spices to enhance the flavor of your dishes.'
  },
  {
    id: 3,
    name: 'Organic Pulses',
    category: 'Pulses',
    image: 'https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?auto=format&fit=crop&w=500&q=80',
    description: 'Nutritious and protein-rich pulses for a healthy diet.'
  },
  {
    id: 4,
    name: 'Coconut Products',
    category: 'Coconut',
    image: 'https://images.unsplash.com/photo-1588434703712-9b2229dfed67?auto=format&fit=crop&w=500&q=80',
    description: 'Fresh and natural coconut products for cooking and health.'
  },
];

const features = [
  {
    id: 1,
    icon: faCheck,
    title: 'Premium Quality',
    description: 'Carefully selected products that meet our high standards'
  },
  {
    id: 2,
    icon: faLeaf,
    title: 'Organic & Natural',
    description: '100% natural ingredients with no artificial additives'
  },
  {
    id: 3,
    icon: faTruck,
    title: 'Fast Delivery',
    description: 'Reliable shipping to your doorstep'
  },
  {
    id: 4,
    icon: faShieldAlt,
    title: 'Secure Payment',
    description: 'Safe and secure payment options'
  }
];

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className={`bg-primary-800 text-white text-sm py-2 transition-all duration-300 ${scrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-center md:justify-start space-x-6 mb-2 md:mb-0">
              <a href="tel:+1234567890" className="flex items-center hover:text-primary-200 transition-colors">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <span>+1 (234) 567-890</span>
              </a>
              <a href="mailto:info@jspdistributor.com" className="hidden md:flex items-center hover:text-primary-200 transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <span>info@jspdistributor.com</span>
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-end space-x-4">
              <span className="hidden md:inline">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" aria-label="Facebook" className="hover:text-primary-200 transition-colors">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-primary-200 transition-colors">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-primary-200 transition-colors">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" aria-label="WhatsApp" className="hover:text-primary-200 transition-colors">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`bg-white shadow-sm transition-all duration-300 ${scrolled ? 'pt-16' : 'pt-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold text-primary-800">
              JSP Distributor
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8">
                <li><Link to="/" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">Home</Link></li>
                <li><Link to="/products" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">Products</Link></li>
                <li><Link to="/about" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="font-medium text-gray-700 hover:text-primary-600 transition-colors">Contact</Link></li>
                <li>
                  <Link 
                    to="/login" 
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Login / Register
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faBars} size="lg" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <ul className="space-y-3">
                <li><Link to="/" className="block py-2 px-4 hover:bg-gray-100 rounded">Home</Link></li>
                <li><Link to="/products" className="block py-2 px-4 hover:bg-gray-100 rounded">Products</Link></li>
                <li><Link to="/about" className="block py-2 px-4 hover:bg-gray-100 rounded">About Us</Link></li>
                <li><Link to="/contact" className="block py-2 px-4 hover:bg-gray-100 rounded">Contact</Link></li>
                <li className="mt-4">
                  <Link 
                    to="/login" 
                    className="block text-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Login / Register
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Premium Quality Food Products</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Distributing the finest selection of rice, spices, and more to meet all your culinary needs</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/products" 
                className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={feature.icon} className="text-primary-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Discover our wide range of high-quality food products</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <Link 
                      to={`/products/${product.id}`} 
                      className="text-primary-600 font-medium hover:text-primary-800 transition-colors flex items-center"
                    >
                      View Details
                      <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/products" 
                className="inline-block bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who trust us for their food distribution needs</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">JSP Distributor</h3>
              <p className="text-gray-400 mb-6">Providing premium quality food products with a commitment to excellence and customer satisfaction.</p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                </a>
                <a href="#" aria-label="WhatsApp" className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Products</h4>
              <ul className="space-y-3">
                <li><Link to="/products?category=rice" className="text-gray-400 hover:text-white transition-colors">Rice</Link></li>
                <li><Link to="/products?category=spices" className="text-gray-400 hover:text-white transition-colors">Spices</Link></li>
                <li><Link to="/products?category=pulses" className="text-gray-400 hover:text-white transition-colors">Pulses</Link></li>
                <li><Link to="/products?category=coconut" className="text-gray-400 hover:text-white transition-colors">Coconut Products</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">View All</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-primary-400" />
                  <span className="text-gray-400">123 Business Street, Colombo, Sri Lanka</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="mr-3 text-primary-400" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">+1 (234) 567-890</a>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-primary-400" />
                  <a href="mailto:info@jspdistributor.com" className="text-gray-400 hover:text-white transition-colors">info@jspdistributor.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} JSP Distributor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
