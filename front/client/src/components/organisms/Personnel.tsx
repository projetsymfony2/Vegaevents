import { useState, useRef, useEffect } from "react";
import { UserCircle2, Mic2, Palette, Users, GraduationCap, LucideIcon } from 'lucide-react';

interface StaffCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const StaffCard = ({ icon: Icon, title, description }: StaffCardProps) => (
  <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
        <Icon className="w-8 h-8 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold text-purple-700">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Personnel = () => {
  const [staffVisible, setStaffVisible] = useState<boolean>(false);
  const staffRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = staffRef.current; // Stocke la référence actuelle
  
    if (!currentRef) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentRef && entry.isIntersecting) {
            setStaffVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    observer.observe(currentRef);
  
    return () => {
      observer.unobserve(currentRef); // Utilise la variable locale
    };
  }, []);
  

  const staffItems: StaffCardProps[] = [
    {
      icon: UserCircle2,
      title: "Hôtesses",
      description: "Accueil professionnel et représentation élégante de votre marque"
    },
    {
      icon: Mic2,
      title: "Animateur / Animatrice",
      description: "Animation dynamique et conseil de vente personnalisé"
    },
    {
      icon: Palette,
      title: "Maquilleur(euse)",
      description: "Mise en beauté et démonstration de produits cosmétiques"
    },
    {
      icon: Users,
      title: "Podiomeur(euse)",
      description: "Présentation professionnelle de vos collections"
    },
    {
      icon: GraduationCap,
      title: "Formateur / Formatrice",
      description: "Formation et développement des compétences"
    }
  ];

  return (
    <div className="mt-24">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div 
          ref={staffRef}
          className={`space-y-12 ${
            staffVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-montserrat font-bold bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-800 bg-clip-text text-transparent z-10 leading-tight tracking-wider">Notre Personnel Qualifié</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une équipe de professionnels passionnés au service de votre réussite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffItems.map((item, index) => (
              <div
                key={index}
                className={`transform ${
                  staffVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } transition-all duration-1000 ease-out`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <StaffCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personnel;