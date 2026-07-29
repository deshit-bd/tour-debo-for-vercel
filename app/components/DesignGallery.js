import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export const dynamic = 'force-static';

export default function DesignGallery() {
  const dir = path.join(process.cwd(), 'public', 'figma-design');

  const images = fs.readdirSync(dir)
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
    .sort()
    .map((file) => ({
      name: file,
      src: `/figma-design/${file}`,
    }));

  return (
    <div className="card-grid design-grid">
      {images.map((image) => (
        <article key={image.name} className="destination-card design-card">
          <Image src={image.src} alt={image.name} width={800} height={600} />
          <div className="card-body">
            <h3>{image.name.replace(/\.(jpg|jpeg|png)$/i, '')}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
