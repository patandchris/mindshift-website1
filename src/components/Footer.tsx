import { Link } from "react-router-dom";
import { Youtube, Mail } from "lucide-react";
import patChrisLogo from "@/assets/pat-chris-logo.png";

interface FooterProps {
  minimal?: boolean;
}

const Footer = ({ minimal = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    company: [{
      name: "Coaching",
      path: "/coaching-program"
    }, {
      name: "Real Results from Real Clients",
      path: "/#success-stories"
    }],
    resources: [{
      name: "Podcast",
      path: "/podcast"
    }, {
      name: "Free Week 1",
      path: "/week-one-offer"
    }]
  };
  const socialLinks = [{
    icon: Youtube,
    href: "https://www.youtube.com/@patandchris",
    label: "YouTube"
  }, {
    icon: Mail,
    href: "mailto:hello@patandchris.com",
    label: "Email"
  }];

  // Minimal footer for standalone pages
  if (minimal) {
    return (
      <footer className="bg-background border-t border-border">
        <div className="container-premium py-8">
          <div className="flex justify-center">
            <div className="cursor-default">
              <img src={patChrisLogo} alt="Pat & Chris Coaching" className="h-20 w-auto" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <footer className="bg-background border-t border-border">
      <div className="container-premium">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/#top" className="inline-block mb-1" onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })}>
              <img src={patChrisLogo} alt="Pat & Chris Coaching" className="h-20 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-1 max-w-md mt-1">Helping ambitious men break through their barriers and create the life they truly want through proven mindset transformation.</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-1">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>)}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-muted-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map(link => <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Pat & Chris Coaching. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Transforming minds. Building empires.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;