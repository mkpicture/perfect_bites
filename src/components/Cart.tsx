import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, MessageCircle, User, Clock, MapPin, Loader2, Package } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/menuData';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '250791693947';

type OrderType = 'delivery' | 'pickup';

interface Location {
  latitude: number;
  longitude: number;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [clientName, setClientName] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newLocation);
        setIsGettingLocation(false);
      },
      (error) => {
        setIsGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Autorisation de géolocalisation refusée');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Position indisponible');
            break;
          case error.TIMEOUT:
            setLocationError('Délai d\'attente dépassé');
            break;
          default:
            setLocationError('Erreur lors de la récupération de la position');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const generateGoogleMapsLink = (lat: number, lng: number): string => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';

    const isDelivery = orderType === 'delivery';
    
    let message = '🍽️ *Nouvelle Commande - The Perfect Bites*\n\n';
    
    // Type de commande
    message += isDelivery ? '📍 *Type:* Livraison\n' : '🛍 *Type:* Retrait sur place\n';
    
    // Informations du client
    if (clientName.trim()) {
      message += `👤 *Nom:* ${clientName.trim()}\n`;
    }
    if (deliveryTime.trim()) {
      if (isDelivery) {
        message += `🕐 *Heure de livraison souhaitée:* ${deliveryTime.trim()}\n`;
      } else {
        message += `🕐 *Heure de retrait souhaitée:* ${deliveryTime.trim()}\n`;
      }
    }
    
    // Localisation uniquement pour la livraison
    if (isDelivery && location) {
      const mapsLink = generateGoogleMapsLink(location.latitude, location.longitude);
      message += `📍 *Ma localisation:* ${mapsLink}\n`;
    }
    
    if (clientName.trim() || deliveryTime.trim() || (isDelivery && location)) {
      message += '\n';
    }
    
    message += '📝 *Détails de la commande:*\n\n';

    items.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
    });

    message += `\n💰 *Total: ${formatPrice(totalPrice)}*\n\n`;
    
    // Message final selon le type
    if (isDelivery) {
      if (location) {
        message += '📍 Voir ma localisation ci-dessus.';
      } else {
        message += '📍 Merci de préciser votre adresse de livraison.';
      }
    } else {
      message += '🛍 Je viendrai récupérer ma commande sur place.';
    }

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    // Optionnel: vider le formulaire après l'envoi
    setClientName('');
    setDeliveryTime('');
    setLocation(null);
    setLocationError(null);
  };

  // Réinitialiser la localisation si on passe en retrait sur place
  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType(type);
    if (type === 'pickup') {
      setLocation(null);
      setLocationError(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-elevated z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-serif text-xl font-bold text-foreground">
                Votre Panier
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-6xl mb-4">🛒</span>
                  <p className="text-muted-foreground">Votre panier est vide</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ajoutez des articles depuis le menu
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-secondary/50 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-primary font-medium">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-card rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-4">
                {/* Type de commande */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">Type de commande</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOrderTypeChange('delivery')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
                        orderType === 'delivery'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border bg-secondary text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Livraison</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOrderTypeChange('pickup')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
                        orderType === 'pickup'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border bg-secondary text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <Package className="w-4 h-4" />
                      <span className="text-sm">Retrait</span>
                    </motion.button>
                  </div>
                </div>

                {/* Client Information Form */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">
                    {orderType === 'delivery' ? 'Informations de livraison' : 'Informations de retrait'}
                  </h4>
                  
                  {/* Nom du client */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Heure de livraison/retrait */}
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={
                        orderType === 'delivery'
                          ? 'Heure de livraison souhaitée (ex: 14h30, 18h00)'
                          : 'Heure de retrait souhaitée (ex: 14h30, 18h00)'
                      }
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Bouton Partager ma localisation - uniquement pour livraison */}
                  {orderType === 'delivery' && (
                    <div>
                      {location ? (
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium flex-1">
                          Localisation partagée ✓
                        </span>
                        <button
                          onClick={() => setLocation(null)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Retirer
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={getLocation}
                        disabled={isGettingLocation}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary border border-border rounded-lg text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGettingLocation ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span className="text-sm font-medium">Récupération...</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Partager ma localisation</span>
                          </>
                        )}
                      </motion.button>
                    )}
                      {locationError && (
                        <p className="text-xs text-destructive mt-1">{locationError}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-soft hover:shadow-card transition-shadow"
                >
                  <MessageCircle className="w-5 h-5" />
                  Commander via WhatsApp
                </motion.button>

                <button
                  onClick={() => {
                    clearCart();
                    setClientName('');
                    setDeliveryTime('');
                    setLocation(null);
                    setLocationError(null);
                    setOrderType('delivery');
                  }}
                  className="w-full py-3 text-muted-foreground hover:text-destructive transition-colors text-sm"
                >
                  Vider le panier
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
