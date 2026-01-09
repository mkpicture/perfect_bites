import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { MenuItem, formatPrice } from '@/lib/menuData';
import { useCart } from '@/contexts/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

const MenuItemCard = ({ item, index }: MenuItemCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group bg-card rounded-xl p-4 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-primary/20"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h4>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
          <p className="text-primary font-bold mt-2">{formatPrice(item.price)}</p>
        </div>

        <div className="flex items-center gap-2">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="w-6 text-center font-semibold text-foreground">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => addItem(item)}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addItem(item)}
              className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground shadow-soft"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
