import { Button } from "./ui/button";
import Link from 'next/link';
import metadata from '@/data/metadata.json' with { type: "json" };

export function Hero() {
    return (
        <section className='flex min-h-[7vh] flex-col items-center justify-center px-6 py-48 text-center'>
            <div className='max-w-3xl'>
                <h1 className='text-4xl font-bold mb-4 tracking-tight sm:text-6xl antialiased'>
                    Hi I&apos;m {metadata.profile.name}
                </h1>
                <p className='mt-6 text-lg leading-9 text-muted-foreground'>
                    {metadata.profile.description}
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <Button variant='outline'>
                        <Link href='/projects' className='text-sm font-semibold leading-6'>
                            View Projects
                        </Link>
                    </Button>
                    <a href ='/about' className='text-sm font-semibold leading-6'>
                        Learn More <span aria-hidden='true'>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}