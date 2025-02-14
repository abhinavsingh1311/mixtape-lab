import { motion } from "framer-motion";

interface ArticleProps {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    link: string;
}

export const ArticleCard: React.FC<ArticleProps> = ({
                                                        title,
                                                        excerpt,
                                                        date,
                                                        readTime,
                                                        link
                                                    }) => (
    <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 mb-6 cursor-pointer hover:bg-gray-800 transition-colors"
        onClick={() => window.open(link, '_blank')}
    >
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="text-gray-400 text-sm mb-3">
            {date} · {readTime} min read
        </div>
        <p className="text-gray-300">{excerpt}</p>
    </motion.article>
);