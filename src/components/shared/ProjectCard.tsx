import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

export default function ProjectCard({ title, description, imageUrl, link }: ProjectCardProps) {
    return (
        <motion.div
            className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-300">{description}</p>
                <a
                    href={link}
                    className="mt-4 inline-block text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn More →
                </a>
            </div>
        </motion.div>
    );
}