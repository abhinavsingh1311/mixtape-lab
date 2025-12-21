import { Layout } from '@/components/shared/Layout';
import { ArticleCard } from '@/components/shared/ArticleCard';
import Image from 'next/image';
import { useState } from 'react';
import Head from 'next/head';

// Define types for artwork items
interface Artwork {
    src: string;
    title: string;
    description: string;
    medium: string;
}

// Custom Arts Gallery Component
const ArtsGallery: React.FC<{ artworks: Artwork[] }> = ({ artworks }) => {
    const [activeImage, setActiveImage] = useState<Artwork | null>(null);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {artworks.map((artwork, index) => (
                    <div
                        key={index}
                        className="relative aspect-square cursor-pointer rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                        onClick={() => setActiveImage(artwork)}
                    >
                        <Image
                            src={artwork.src}
                            alt={artwork.title}
                            fill
                            style={{
                                objectFit: 'cover',
                                objectPosition: '50% 30%'
                            }}
                            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox for viewing full-size art */}
            {activeImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setActiveImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[80vh] w-full">
                        <Image
                            src={activeImage.src}
                            alt={activeImage.title}
                            width={1200}
                            height={800}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                maxHeight: '80vh'
                            }}
                        />
                        <div className="bg-black/60 p-4 absolute bottom-0 left-0 right-0">
                            <h3 className="text-xl font-bold">{activeImage.title}</h3>
                            <p className="text-gray-300">{activeImage.medium}</p>
                            <p className="text-gray-400 mt-2">{activeImage.description}</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default function SaturnPage() {
    const articles = [
        {
            title: "Poetry and Creative Writing",
            excerpt: "Explore my collection of poems and creative writings on my personal blog.",
            date: "2024-02-14",
            readTime: "5",
            link: "https://envisagedmemoirs.blogspot.com/"
        },
        // {
        //     title: "The Digital Frontier",
        //     excerpt: "Thoughts on emerging technologies and how they're reshaping our world.",
        //     date: "2024-03-20",
        //     readTime: "7",
        //     link: "#"
        // }
    ];

    const artworks: Artwork[] = [
        {
            src: "/images/sketch1.jpg",
            title: "Portrait Study",
            description: "Pencil sketch exploring human expression and emotion.",
            medium: "Graphite on Paper / 2023"
        },
        {
            src: "/images/sketch2.jpg",
            title: "Urban Landscape",
            description: "Cityscape sketch capturing architectural details and perspective.",
            medium: "Pen and Ink / 2023"
        },
        {
            src: "/images/sketch3.jpg",
            title: "Nature Study",
            description: "Detailed observation of natural forms and textures.",
            medium: "Charcoal on Paper / 2022"
        },
        {
            src: "/images/sketch4.jpg",
            title: "Figure Drawing",
            description: "Study of human form and movement.",
            medium: "Graphite and Charcoal / 2023"
        },
        {
            src: "/images/sketch5.jpg",
            title: "Abstract Composition",
            description: "Exploration of line, form, and negative space.",
            medium: "Mixed Media / 2024"
        },
        {
            src: "/images/sketch6.jpg",
            title: "Still Life",
            description: "Careful study of light, shadow, and composition.",
            medium: "Pencil on Paper / 2023"
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
                color="#E6B800"
                title="Blog, Thoughts & Arts"
                description="My insights, articles, and creative expressions"
            >
                <div className="prose prose-invert max-w-none">
                    {/* Written Content Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {articles.map((article, index) => (
                                <ArticleCard key={index} {...article} />
                            ))}
                        </div>
                    </section>

                    {/* Poetry Highlight */}
                    <section className="mb-12">
                        <div className="bg-gray-900/50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Featured Poem</h2>
                            <div className="italic text-gray-300 pl-4 border-l-4 border-yellow-600">
                                <p className="mb-2">
                                    Heart ponders<br />
                                    Eyes remember<br />
                                    Potraying thy smiling countenance
                                </p>
                                <p>
                                    Dilutes my wordly afflictions<br />
                                    Remembering all your sayings<br />
                                    You shall continue thrive in my beliefs<br />
                                    For all that matters is love<br />
                                    Residing in my heart&apos;s archives
                                </p>
                            </div>
                            <div className="text-right mt-2 text-gray-400">
                                — From &#39;Farewell&#39;
                            </div>
                        </div>
                    </section>

                    {/* Visual Arts Section */}
                    <section className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Photography</h2>
                        </div>

                        <p className="mb-6">
                            Beyond coding and writing, I find balance and creative expression through different Photography forms.
                            It allows me to slow down, observe closely, and translate my perspective into a photo.
                            Each picture represents a moment of focus and contemplation.
                            <br />
                            <br />
                            <a href="https://vsco.co/cokenotcoke/gallery" style={{ textDecoration: 'underline', color: '#E6B800' }} target='_blank'>Checkout my collection here!</a>
                        </p>

                        {/* <ArtsGallery artworks={artworks} /> */}
                    </section>

                    {/* Artistic Process */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">My Artistic Process</h2>

                        <div className="flex flex-col md:flex-column gap-6">
                            {/* <div className="md:w-1/2"> */}
                            <p className="mb-4">
                                My approach to both writing and sketching is centered on observation and reflection.
                                Drawing helps me process my thoughts and see the world differently. I often carry a
                                sketchbook to capture interesting scenes, architectural details, or fleeting moments.
                            </p>
                            <p>
                                Sketching provides a balancing counterpoint to the digital precision of programming.
                                Where code requires exacting logic, drawing embraces imperfection and intuition.
                                This creative duality keeps my thinking flexible and helps me approach technical
                                problems with fresh perspectives.
                            </p>
                            {/* </div> */}

                            {/* <div className="md:w-1/2 bg-gray-900 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-3">Materials & Techniques</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    <li>Graphite pencils (HB through 6B) for tonal studies</li>
                                    <li>Fine-line pens for architectural and detail work</li>
                                    <li>Charcoal for expressive, atmospheric effects</li>
                                    <li>Conte crayon on toned paper for figure studies</li>
                                    <li>Watercolor washes combined with ink linework</li>
                                    <li>Mixed media explorations in visual journals</li>
                                </ul>
                            </div> */}
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}