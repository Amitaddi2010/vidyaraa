// ============================================================================
// EXPERTS COMPONENT
// ============================================================================
// Displays national and international AI experts supporting Vidyaraa's mission
import React from 'react';
import { motion } from 'framer-motion';
import { User, Globe, GraduationCap, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// ============================================================================
// EXPERT DATA CONFIGURATION
// ============================================================================
// National AI experts from Indian universities and institutions
const nationalExperts = [
    {
        name: "Prof. Vinod Sharma",
        affiliation: "Department of Computer Science & IT, University of Jammu",
        expertise: ["Machine Learning", "Data Mining", "Educational Technology", "AI Education"],
        image: "/experts/Prof. Vinod Sharma.jpg",
        portfolio: "https://vinodsharma.netlify.app/"
    },
    {
        name: "Prof. Mansaf Alam",
        affiliation: "Department of Computer Science & IT, Jamia Millia Islamia",
        expertise: ["Artificial Intelligence", "Big Data Analytics", "Machine Learning and Deep Learning", "Cloud Computing", "Data Mining"],
        image: "/experts/Mansaf.png",
        portfolio: "https://www.jmi.ac.in/ACADEMICS/Departments/Department-Of-Computer-Science/Faculty-Members/1891/Mansaf_Alam"
    },
    {
        name: "Prof. Jaswinder Singh",
        affiliation: "Department of Computer Science & Engineering, Punjabi University, Patiala",
        expertise: ["Cyber Security", "Machine Learning", "Computer Vision", "Malware Analysis", "Computer Networks", "Mobile Ad-Hoc Networks", "Cloud Computing"],
        image: "/experts/Jaswinder.png",
        portfolio: "https://www.linkedin.com/in/dr-jaswinder-singh-b4280121a/"
    },
    {
        name: "Dr. Kuldip Raj",
        affiliation: "School of Mathematics, Shri Mata Vaishno Devi University",
        expertise: ["Sequence Spaces", "Summability Theory", "Matrix Transformations", "Statistical Convergence"],
        image: "/experts/Kuldip.png",
        portfolio: "https://smvdu.ac.in/employee/dr-kuldip-raj/"
    },
    {
        name: "Prof. Vikram Singh",
        affiliation: "Computer Science, Ch. Devi Lal University, Sirsa",
        expertise: ["Cybersecurity", "Data Mining", "Machine Learning", "Operating Systems", "System Simulation"],
        image: "/experts/Vikram.png",
        portfolio: "https://www.linkedin.com/in/vikram-singh-941a7a182/"
    },
    {
        name: "Dr. Ajay Abrol",
        affiliation: "Department of Electronics and Communication, GCET Jammu",
        expertise: ["Artificial Neural Networks", "Digital signal processing", "Embedded systems"],
        image: "/experts/AjayAbrol.png",
        portfolio: "https://www.linkedin.com/in/dr-ajay-abrol-35a33b139/"
    }
];

// International AI experts from global institutions
const internationalExperts = [
    {
        name: "Dr. Sameer Ranjan",
        affiliation: "PhD – Stanford University, USA | CTO & Director (Data Science) – Catenate",
        expertise: ["Generative AI", "Data Science", "AI Strategy", "Startup Mentorship", "Technology Leadership"],
        image: "/experts/sameer.jpg",
        portfolio: "https://www.linkedin.com/in/sameerranjan009/"
    },
    {
        name: "Dr. Ajay Sharma",
        affiliation: "Postdoctoral Fellow, Johns Hopkins University, USA",
        expertise: ["Computer Vision", "Medical Imaging", "MRI Analysis", "Deep Learning", "AI in Healthcare"],
        image: "/experts/ajay.jpg",
        portfolio: "https://ajaychem12.github.io/sharma-lab-website/team.html"
    },
    {
        name: "Dr. Inderpal Singh Bijral",
        affiliation: "Scientist, Canary Cure Therapeutics, Vancouver, British Columbia, Canada",
        expertise: [
            "Drug Discovery", 
            "Obesity Research", 
            "Rare Diseases", 
            "Drug Design", 
            "RNAi & mRNA Therapeutics", 
            "Pre-clinical Studies", 
            "Genomics", 
            "Cell Biology", 
            "Microbiology", 
            "Protein Modelling and Molecular Dynamics Simulations", 
            "Bioinformatics", 
            "Whole Genome Sequencing"
        ],
        image: "/experts/inderpal.jpg",
        portfolio: "https://www.linkedin.com/in/dr-inderpal-singh-bijral-635ba4184/"
    }
];

// ============================================================================
// EXPERT CARD COMPONENT
// ============================================================================
// Reusable component for displaying individual expert cards
const ExpertCard = ({ expert, index, isInternational = false }) => {
    const { theme } = useTheme();

    return (
        <motion.a
            href={expert.portfolio || "#"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: 0.6, 
                delay: index * (isInternational ? 0.1 : 0.2) 
            }}
            className="rounded-3xl p-8 transition-all group cursor-pointer"
            style={{ 
                backgroundColor: 'var(--card-bg)', 
                border: '1px solid var(--border-color)' 
            }}
        >
            {/* Expert Header with Avatar */}
            <div className="flex items-start gap-6 mb-8">
                <div className="relative group/avatar shrink-0">
                    {/* Hover Glow Effect */}
                    <div 
                        className="absolute -inset-2 rounded-2xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"
                        style={{ 
                            background: theme === 'light' 
                                ? 'linear-gradient(to top right, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.2))' 
                                : 'linear-gradient(to top right, rgba(109, 40, 217, 0.2), rgba(99, 102, 241, 0.2))' 
                        }}
                    />
                    
                    {/* Avatar Container */}
                    <div 
                        className="relative w-20 h-20 rounded-2xl border-2 flex items-center justify-center overflow-hidden transition-all duration-500 transform group-hover/avatar:scale-105 group-hover/avatar:rotate-3 shadow-2xl"
                        style={{ 
                            backgroundColor: 'var(--bg-secondary)', 
                            borderColor: 'var(--border-color)' 
                        }}
                    >
                        {/* Avatar Overlay */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20"
                            style={{ 
                                background: theme === 'light' 
                                    ? 'linear-gradient(to top right, rgba(249, 115, 22, 0.2), transparent)' 
                                    : 'linear-gradient(to top right, rgba(109, 40, 217, 0.2), transparent)' 
                            }}
                        />
                        
                        {/* Avatar Image or Fallback */}
                        {expert.image ? (
                            <img 
                                src={expert.image} 
                                alt={expert.name} 
                                className="w-full h-full object-cover relative z-10" 
                            />
                        ) : (
                            <User 
                                className="w-8 h-8 transition-colors relative z-10" 
                                style={{ color: 'var(--text-muted)' }} 
                            />
                        )}
                        
                        {/* Corner Accents */}
                        <div 
                            className="absolute top-0 left-0 w-3 h-3 border-t border-l rounded-tl-md z-30" 
                            style={{ borderColor: 'var(--border-color)' }}
                        />
                        <div 
                            className="absolute bottom-0 right-0 w-3 h-3 border-b border-r rounded-br-md z-30" 
                            style={{ borderColor: 'var(--border-color)' }}
                        />
                    </div>
                </div>

                {/* Expert Info */}
                <div>
                    <h4 
                        className="text-2xl font-bold mb-2" 
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {expert.name}
                    </h4>
                    <p 
                        className="text-sm leading-relaxed flex gap-2" 
                        style={{ 
                            color: theme === 'light' ? '#c2410c' : '#c084fc' 
                        }}
                    >
                        <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{expert.affiliation}</span>
                    </p>
                </div>
            </div>

            {/* Expertise Tags */}
            <div style={{ borderTop: '1px solid var(--border-color)' }}>
                <p 
                    className="text-xs font-bold uppercase tracking-widest mb-4" 
                    style={{ color: 'var(--text-muted)' }}
                >
                    Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((tag, tagIdx) => (
                        <span 
                            key={tagIdx} 
                            className="px-3 py-1 rounded-lg border text-xs font-medium"
                            style={{ 
                                borderColor: 'var(--border-color)', 
                                backgroundColor: 'var(--bg-tertiary)', 
                                color: 'var(--text-muted)' 
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.a>
    );
};

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================
// Reusable header for expert sections
const SectionHeader = ({ icon, title, description, delay = 0 }) => {
    const { theme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay }}
            className="flex flex-col items-center text-center mb-16"
        >
            <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-color)' 
                }}
            >
                {icon}
            </div>
            <h3 
                className="text-3xl font-bold mb-4" 
                style={{ color: 'var(--text-primary)' }}
            >
                {title}
            </h3>
            <p 
                className="max-w-2xl mx-auto" 
                style={{ color: 'var(--text-muted)' }}
            >
                {description}
            </p>
        </motion.div>
    );
};

// ============================================================================
// MAIN EXPERTS COMPONENT
// ============================================================================
const Experts = () => {
    const { theme } = useTheme();

    return (
        <section 
            id="experts" 
            className="py-16 md:py-24 lg:py-32 border-t relative overflow-hidden" 
            style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--border-color)' 
            }}
        >
            {/* Background Gradients */}
            <div 
                className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
                style={{ 
                    backgroundColor: theme === 'light' 
                        ? 'rgba(249, 115, 22, 0.05)' 
                        : 'rgba(109, 40, 217, 0.05)' 
                }}
            />
            <div 
                className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
                style={{ 
                    backgroundColor: theme === 'light' 
                        ? 'rgba(251, 146, 60, 0.05)' 
                        : 'rgba(67, 56, 202, 0.05)' 
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Main Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h3 
                        className="text-2xl md:text-3xl font-bold mb-6 tracking-tight" 
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Advisors
                    </h3>
                    <motion.h2
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Experts On Board
                    </motion.h2>
                    <p 
                        className="text-lg max-w-2xl mx-auto leading-relaxed" 
                        style={{ color: 'var(--text-muted)' }}
                    >
                        World-renowned AI researchers and industry leaders supporting Vidyaraa's mission.
                    </p>
                </motion.div>

                {/* National Experts Section */}
                <div className="mb-16 md:mb-24 lg:mb-32">
                    <SectionHeader
                        icon={
                            <GraduationCap 
                                style={{ 
                                    color: theme === 'light' ? 'var(--text-primary)' : '#6d28d9', 
                                    width: '2rem', 
                                    height: '2rem' 
                                }} 
                            />
                        }
                        title="National Experts"
                        description="Leading AI professionals from University of Jammu supporting Vidyaraa's educational mission and research initiatives."
                        delay={0}
                    />

                    {/* National Experts Grid - 3 columns */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {nationalExperts.map((expert, idx) => (
                                <ExpertCard 
                                    key={idx} 
                                    expert={expert} 
                                    index={idx}
                                    isInternational={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* International Experts Section */}
                <div>
                    <SectionHeader
                        icon={
                            <Globe 
                                style={{ 
                                    color: theme === 'light' ? '#f97316' : '#a78bfa', 
                                    width: '2rem', 
                                    height: '2rem' 
                                }} 
                            />
                        }
                        title="International Experts"
                        description="World-renowned AI experts collaborating with Vidyaraa to bring cutting-edge knowledge and global perspectives."
                        delay={0.2}
                    />

                    {/* International Experts Grid - 3 columns */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {internationalExperts.map((expert, idx) => (
                            <ExpertCard 
                                key={idx} 
                                expert={expert} 
                                index={idx}
                                isInternational={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experts;
