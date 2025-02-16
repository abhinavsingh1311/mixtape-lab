// src/pages/planets/jupiter.tsx
import { Layout } from '@/components/shared/Layout';
import { ContactCard } from '@/components/shared/ContactCard';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function JupiterPage() {
    return (
        <Layout
            color="#C88B3A"
            title="Contact"
            description="Get in touch with me"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Connect</h2>
                    <div className="flex flex-col gap-4">
                        <ContactCard
                            icon={<Mail size={20} />}
                            label="Email"
                            value="singhabhinav1311@gmail.com"
                            href="mailto:singhabhinav1311@gmail.com"
                        />
                        <ContactCard
                            icon={<Linkedin size={20} />}
                            label="LinkedIn"
                            value="LinkedIn Profile"
                            href="https://linkedin.com/in/singhabhinav13112002"
                        />
                        <ContactCard
                            icon={<Github size={20} />}
                            label="GitHub"
                            value="GitHub Profile"
                            href="https://github.com/abhinavsingh1311"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    );
}