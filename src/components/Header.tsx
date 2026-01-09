import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl">👨‍🍳</span>
          </div>
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-bold text-foreground">
              The Perfect Bites
            </h1>
            <p className="text-xs text-muted-foreground">Food & Pastries</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCartClick}
          className="relative p-3 rounded-full bg-primary text-primary-foreground shadow-soft hover:shadow-card transition-shadow"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
