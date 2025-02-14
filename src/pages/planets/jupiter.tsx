import {Layout} from "@/components/shared/Layout";
import {ContactCard} from "@/components/shared/ContactCard";

export default function JupiterPage() {
    return (
        <Layout
            color="#C88B3A"
            title="Contact"
            description="Get in touch with me"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Want to Connect?</h2>
                    <div className="flex flex-col gap-4">
                        {/*<ContactCard*/}
                        {/*    icon={<Mail size={20} />}*/}
                        {/*    label="Email"*/}
                        {/*    value="your.email@example.com"*/}
                        {/*    href="mailto:your.email@example.com"*/}
                        {/*/>*/}
                        {/*<ContactCard*/}
                        {/*    icon={<Linkedin size={20} />}*/}
                        {/*    label="LinkedIn"*/}
                        {/*    value="LinkedIn Profile"*/}
                        {/*    href="https://linkedin.com/in/yourusername"*/}
                        {/*/>*/}
                        {/*<ContactCard*/}
                        {/*    icon={<Github size={20} />}*/}
                        {/*    label="GitHub"*/}
                        {/*    value="GitHub Profile"*/}
                        {/*    href="https://github.com/yourusername"*/}
                        {/*/>*/}
                    </div>
                </section>
            </div>
        </Layout>
    );
}