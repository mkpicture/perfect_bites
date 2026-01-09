import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import food1 from '@/assets/food-1.jpg';
import food2 from '@/assets/food-2.jpg';
import food4 from '@/assets/food-4.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Des saveurs{' '}
              <span className="text-gradient font-script">authentiques</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Découvrez notre sélection de plats faits maison, préparés avec passion 
              et des ingrédients frais. Commandez directement via WhatsApp !
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Samedi & Dimanche</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Kigali, Rwanda</span>
              </div>
            </div>

            <motion.a
              href="#menu"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-elevated hover:shadow-card transition-all"
            >
              Voir le Menu
              <span className="text-xl">🍽️</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative grid grid-cols-2 gap-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="col-span-2"
              >
                <img
                  src={food1}
                  alt="Délicieuse viande grillée"
                  className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-elevated"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <img
                  src={food2}
                  alt="Poulet braisé"
                  className="w-full h-32 md:h-40 object-cover rounded-2xl shadow-card"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <img
                  src={food4}
                  alt="Salade fraîche"
                  className="w-full h-32 md:h-40 object-cover rounded-2xl shadow-card"
                />
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
