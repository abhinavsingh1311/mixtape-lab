import { motion } from "framer-motion";

interface Skill {
    category: string;
    items: string[];
}

interface SkillsSectionProps {
    skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((category, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg p-6"
            >
                <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                        <span key={skillIndex}
                              className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>
        ))}
    </div>
);