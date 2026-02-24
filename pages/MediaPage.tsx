import React from 'react';

export const MediaPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:py-20 max-w-5xl">
      <h1 className="font-poppins text-4xl md:text-5xl font-bold text-center text-primary-text mb-4">
        Media & Press
      </h1>
      <p className="font-raleway text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Check out our latest features, videos, and news surrounding Private Lives Matter.
      </p>

      {/* Videos Section */}
      <section className="mb-16">
        <h2 className="font-poppins text-3xl font-bold text-primary-text mb-8 border-b-2 border-accent pb-2 inline-block">
          Featured Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example YouTube Embed Placeholder 1 */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
               <svg className="w-16 h-16 mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
               </svg>
               <span className="font-raleway font-semibold">YouTube Video Placeholder</span>
               <span className="text-sm mt-2">Replace with iframe</span>
            </div>
          </div>
          {/* Example YouTube Embed Placeholder 2 */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
             <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
               <svg className="w-16 h-16 mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
               </svg>
               <span className="font-raleway font-semibold">YouTube Video Placeholder</span>
               <span className="text-sm mt-2">Replace with iframe</span>
            </div>
          </div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section>
        <h2 className="font-poppins text-3xl font-bold text-primary-text mb-8 border-b-2 border-accent pb-2 inline-block">
          In The Press
        </h2>
        <div className="space-y-6">
          {/* Example Article 1 */}
          <article className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <a href="#" className="block">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-2 block">Rave Culture Magazine</span>
              <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-3 hover:text-accent transition-colors">
                How Private Lives Matter is Changing Festival Fashion
              </h3>
              <p className="font-raleway text-gray-600 mb-4 line-clamp-2">
                An exclusive look into the brand that prioritized comfort and security on the dancefloor without sacrificing style...
              </p>
              <span className="text-sm text-gray-500 font-medium">Read Article &rarr;</span>
            </a>
          </article>

          {/* Example Article 2 */}
          <article className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <a href="#" className="block">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-2 block">Tech & Style Blog</span>
              <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-3 hover:text-accent transition-colors">
                The Rise of Functional Rave Wear: The Hidden Pocket Revolution
              </h3>
              <p className="font-raleway text-gray-600 mb-4 line-clamp-2">
                Discussing the intersection of practical design and expressive clothing with the founders of Private Lives Matter...
              </p>
              <span className="text-sm text-gray-500 font-medium">Read Article &rarr;</span>
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};
