import { Layout } from '@/components/shared/Layout';
import { ContactCard } from '@/components/shared/ContactCard';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import Head from 'next/head';

export default function JupiterPage() {
    const contacts = [
        {
            icon: <Mail size={20} />,
            label: "Email",
            value: "singhabhinav1311@gmail.com",
            href: "mailto:singhabhinav1311@gmail.com"
        },
        {
            icon: <Phone size={20} />,
            label: "Phone",
            value: "(825) 889-1311",
            href: "tel:+18258891311"
        },
        {
            icon: <Github size={20} />,
            label: "GitHub",
            value: "github.com/abhinavsingh1311",
            href: "https://github.com/abhinavsingh1311"
        },
        {
            icon: <Linkedin size={20} />,
            label: "LinkedIn",
            value: "LinkedIn Profile",
            href: "https://linkedin.com/in/singhabhinav13112002"
        }
    ];

    return (
        <>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-5R3TT33HR4"></script>
                <script>
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-5R3TT33HR4');`}
                </script>
            </Head>
            <Layout
                color="#C88B3A"
                title="Contact"
                description="Get in touch with me"
            >
                <div className="grid gap-4">
                    {contacts.map((contact, index) => (
                        <ContactCard key={index} {...contact} />
                    ))}
                </div>
            </Layout>
        </>
    );
}