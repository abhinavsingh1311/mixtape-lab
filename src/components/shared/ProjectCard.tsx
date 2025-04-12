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
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative h-40 md:h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 33vw"
                    priority={false}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{description}</p>
                <a
                    href={link}
                    className="mt-4 inline-block px-3 py-1 bg-blue-500 rounded text-white text-sm md:text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Project
                </a>
            </div>
        </motion.div>
    );
}
