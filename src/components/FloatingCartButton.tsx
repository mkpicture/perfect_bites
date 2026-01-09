import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/menuData';

interface FloatingCartButtonProps {
  onClick: () => void;
}

const FloatingCartButton = ({ onClick }: FloatingCartButtonProps) => {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 gradient-primary text-primary-foreground px-6 py-4 rounded-full shadow-elevated flex items-center gap-4"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      </div>
      <div className="text-left">
        <p className="text-sm opacity-90">Voir le panier</p>
        <p className="font-bold">{formatPrice(totalPrice)}</p>
      </div>
    </motion.button>
  );
};

export default FloatingCartButton;
