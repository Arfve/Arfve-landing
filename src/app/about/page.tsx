import React from 'react';
import { getPageData } from '@/lib/getPageData';
import AboutHero3 from '@/components/aboutHero3';
const Page = async () => {
  const pageData = await getPageData();
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a simple React component written in TypeScript.</p>
      <AboutHero3 {...pageData.about3}/>
    </div>
  );
};

export default Page;