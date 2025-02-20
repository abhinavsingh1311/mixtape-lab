import { Layout } from '@/components/shared/Layout';
import { FileText, Download } from 'lucide-react';

export default function MercuryPage() {
    return (
        <Layout
            color="#A5A5A5"
            title="My Journey"
            description="The beginning of my tech adventure"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <div className="flex gap-4 mb-8">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <FileText size={20} />
                            View Resume
                        </a>
                        <a
                            href="/resume.pdf"
                            download="AbhinavSingh_Resume.pdf"
                            className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <Download size={20} />
                            Download Resume
                        </a>
                    </div>

                    <h2 className="text-2xl font-bold mb-6">Education</h2>
                    <div className="bg-gray-900 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-bold">DMIT: Computer Software Dev. Diploma</h3>
                        <div className="text-gray-400 mb-2">Northern Alberta Institute of Technology (NAIT) | 2023-2024</div>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Graduated with 4.0 CGPA</li>
                            <li>Dean's honor roll</li>
                            <li>Specialized in full-stack development</li>
                        </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-xl font-bold">High School Diploma CBSE</h3>
                        <div className="text-gray-400 mb-2">Shemrock Sen. Sec. School | 2021</div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}