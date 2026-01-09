import { Phone, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                The Perfect Bites
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Des saveurs authentiques, préparées avec passion et des ingrédients frais.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/24106732615"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+241 06 73 26 15</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Horaires</h4>
            <div className="flex items-start gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 mt-0.5" />
              <div>
                <p>Ouvert le week-end</p>
                <p className="text-primary font-medium">Samedi & Dimanche</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Perfect Bites. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
