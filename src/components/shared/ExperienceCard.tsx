import { motion } from "framer-motion";

interface ExperienceProps {
    company: string;
    role: string;
    period: string;
    description: string[];
    technologies: string[];
}

export const ExperienceCard: React.FC<ExperienceProps> = ({
                                                              company,
                                                              role,
                                                              period,
                                                              description,
                                                              technologies
                                                          }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 mb-6"
    >
        <h3 className="text-xl font-bold">{company}</h3>
        <div className="text-gray-400 mb-2">{role} | {period}</div>
        <ul className="list-disc list-inside mb-4">
            {description.map((item, index) => (
                <li key={index} className="text-gray-300 mb-1">{item}</li>
            ))}
        </ul>
        <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                    {tech}
                </span>
            ))}
        </div>
    </motion.div>
);
