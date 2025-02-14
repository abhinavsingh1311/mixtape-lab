import { motion } from "framer-motion";

interface ContactCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
                                                            icon,
                                                            label,
                                                            value,
                                                            href
                                                        }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 flex items-center gap-4 hover:bg-gray-800 transition-colors"
    >
        <div className="text-gray-400">{icon}</div>
        <div>
            <div className="text-sm text-gray-400">{label}</div>
            <div className="text-white">{value}</div>
        </div>
    </motion.a>
);