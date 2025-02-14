import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectProps {
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    link?: string;
    image?: string;
}

export const ProjectCard: React.FC<ProjectProps> = ({
                                                        title,
                                                        description,
                                                        technologies,
                                                        github,
                                                        link,
                                                        image
                                                    }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 mb-6"
    >
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="flex gap-2">
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-white">
                        <Github size={20} />
                    </a>
                )}
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-white">
                        <ExternalLink size={20} />
                    </a>
                )}
            </div>
        </div>
        {image && (
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img src={image} alt={title} className="object-cover w-full h-full" />
            </div>
        )}
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                    {tech}
                </span>
            ))}
        </div>
    </motion.div>
);
